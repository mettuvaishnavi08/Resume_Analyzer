const express = require('express');
const multer = require('multer');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const natural = require('natural');
const nlp = require('compromise');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and DOCX files are allowed'));
    }
  }
});

// Skill keywords for matching
const skillKeywords = [
  'javascript', 'python', 'java', 'react', 'node.js', 'html', 'css',
  'sql', 'mongodb', 'express', 'angular', 'vue', 'typescript', 'php',
  'c++', 'c#', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'flutter',
  'machine learning', 'ai', 'data science', 'aws', 'azure', 'docker',
  'kubernetes', 'git', 'agile', 'scrum', 'devops', 'ci/cd'
];

// Function to extract text from PDF
async function extractTextFromPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    throw new Error('Error extracting text from PDF');
  }
}

// Function to extract text from DOCX
async function extractTextFromDOCX(filePath) {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } catch (error) {
    throw new Error('Error extracting text from DOCX');
  }
}

// Function to analyze resume text
function analyzeResumeText(text) {
  const lowerText = text.toLowerCase();
  
  // Extract skills
  const foundSkills = skillKeywords.filter(skill => 
    lowerText.includes(skill.toLowerCase())
  );
  
  // Experience estimation (basic)
  const experiencePatterns = [
    /(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi,
    /(\d+)\+?\s*yrs?\s*(of\s*)?(experience|exp)/gi
  ];
  
  let experience = 'Not specified';
  for (const pattern of experiencePatterns) {
    const match = text.match(pattern);
    if (match) {
      experience = match[0];
      break;
    }
  }
  
  // Education detection (basic)
  const educationKeywords = [
    'bachelor', 'master', 'phd', 'degree', 'university', 'college',
    'b.s.', 'b.a.', 'm.s.', 'm.a.', 'b.tech', 'm.tech'
  ];
  
  const foundEducation = educationKeywords.some(edu => 
    lowerText.includes(edu)
  );
  
  // Calculate score based on various factors
  let score = 60; // Base score
  
  // Skills bonus
  score += Math.min(foundSkills.length * 2, 20);
  
  // Experience bonus
  if (experience !== 'Not specified') score += 10;
  
  // Education bonus
  if (foundEducation) score += 10;
  
  // Length bonus (reasonable resume length)
  const wordCount = text.split(/\s+/).length;
  if (wordCount > 200 && wordCount < 1000) score += 5;
  
  // Generate suggestions
  const suggestions = [];
  if (foundSkills.length < 5) {
    suggestions.push('Add more relevant technical skills');
  }
  if (experience === 'Not specified') {
    suggestions.push('Clearly mention your years of experience');
  }
  if (!foundEducation) {
    suggestions.push('Include your educational background');
  }
  if (wordCount < 200) {
    suggestions.push('Expand your resume with more details');
  }
  if (wordCount > 1000) {
    suggestions.push('Consider making your resume more concise');
  }
  
  return {
    skills: foundSkills,
    experience,
    education: foundEducation ? 'Education mentioned' : 'No education found',
    score: Math.min(score, 100),
    wordCount,
    suggestions
  };
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Resume Analyzer API is running!' });
});

app.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const filePath = req.file.path;
    let extractedText = '';
    
    // Extract text based on file type
    if (req.file.mimetype === 'application/pdf') {
      extractedText = await extractTextFromPDF(filePath);
    } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      extractedText = await extractTextFromDOCX(filePath);
    }
    
    // Analyze the extracted text
    const analysis = analyzeResumeText(extractedText);
    
    // Clean up uploaded file
    fs.unlinkSync(filePath);
    
    res.json({
      filename: req.file.originalname,
      analysis: analysis,
      extractedText: extractedText.substring(0, 500) + '...' // First 500 chars for preview
    });
    
  } catch (error) {
    console.error('Error analyzing resume:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    res.status(500).json({ 
      error: 'Error analyzing resume', 
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
  }
  
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Resume Analyzer API server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to test the API`);
});