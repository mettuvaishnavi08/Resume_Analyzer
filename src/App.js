import React, { useState } from 'react';
import './App.css';

// Upload Component
const Upload = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5MB');
      return;
    }

    onFileUpload(file);
  };

  return (
    <div className="upload-page">
      <div className="background-animation">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>
      
      <div className="upload-container">
        <div className="header">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1>ResumeAI Pro</h1>
          </div>
          <p className="tagline">Transform your resume with AI-powered insights and professional recommendations</p>
          
          <div className="features-preview">
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <span>Instant Analysis</span>
            </div>
            <div className="feature">
              <div className="feature-icon">🎯</div>
              <span>ATS Optimization</span>
            </div>
            <div className="feature">
              <div className="feature-icon">📊</div>
              <span>Detailed Insights</span>
            </div>
          </div>
        </div>
        
        <div className="upload-card">
          <div 
            className={`upload-area ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="upload-content">
              <div className="upload-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              <h3>Upload Your Resume</h3>
              <p className="upload-description">
                Drag and drop your resume here, or click to select a file
              </p>
              
              <input
                type="file"
                id="file-input"
                onChange={handleFileInput}
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
              />
              <label htmlFor="file-input" className="upload-btn">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Choose File
              </label>
              
              <div className="supported-formats">
                <span className="format-label">Supported formats:</span>
                <div className="formats">
                  <span className="format">PDF</span>
                  <span className="format">DOC</span>
                  <span className="format">DOCX</span>
                  <span className="format">TXT</span>
                </div>
                <span className="size-limit">Maximum file size: 5MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Analysis Component
const Analysis = ({ file, onBack }) => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Simulate analysis
    setTimeout(() => {
      setAnalysis({
        overallScore: 85,
        atsScore: 78,
        sections: {
          content: 82,
          formatting: 90,
          keywords: 75,
          experience: 88
        },
        strengths: [
          "Strong technical skills showcase with relevant technologies",
          "Clear and concise work experience descriptions",
          "Excellent use of action verbs and quantifiable achievements",
          "Professional formatting and clean layout structure",
          "Well-organized sections with appropriate hierarchy"
        ],
        improvements: [
          "Include more industry-specific keywords for better ATS compatibility",
          "Add quantifiable metrics to demonstrate impact (e.g., percentages, dollar amounts)",
          "Consider adding a professional summary or objective statement",
          "Optimize bullet points with more specific accomplishments",
          "Include relevant certifications or professional development"
        ],
        keywords: {
          found: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "AWS"],
          missing: ["TypeScript", "Docker", "Kubernetes", "Agile", "Scrum"]
        },
        recommendations: [
          "Tailor your resume for specific job applications",
          "Use more industry buzzwords naturally within context",
          "Consider adding a skills section with proficiency levels",
          "Include links to portfolio projects or GitHub profile"
        ]
      });
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return (
      <div className="analysis-page">
        <div className="loading-container">
          <div className="loading-animation">
            <div className="brain-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 2C8.11929 2 7 3.11929 7 4.5C7 5.88071 8.11929 7 9.5 7C10.8807 7 12 5.88071 12 4.5C12 3.11929 10.8807 2 9.5 2Z" fill="currentColor"/>
                <path d="M14.5 2C13.1193 2 12 3.11929 12 4.5C12 5.88071 13.1193 7 14.5 7C15.8807 7 17 5.88071 17 4.5C17 3.11929 15.8807 2 14.5 2Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="loading-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
          <h3>Analyzing Your Resume</h3>
          <p>Our AI is examining your resume for optimization opportunities...</p>
          <div className="loading-steps">
            <div className="step active">
              <div className="step-icon">✓</div>
              <span>Parsing document structure</span>
            </div>
            <div className="step active">
              <div className="step-icon">✓</div>
              <span>Analyzing content quality</span>
            </div>
            <div className="step">
              <div className="step-icon">⏳</div>
              <span>Generating recommendations</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analysis-page">
      <div className="analysis-container">
        <div className="analysis-header">
          <button onClick={onBack} className="back-btn">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back to Upload
          </button>
          <div className="header-content">
            <h1>Resume Analysis Complete</h1>
            <p className="file-info">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {file.name}
            </p>
          </div>
        </div>

        <div className="scores-grid">
          <div className="score-card primary">
            <div className="score-header">
              <h3>Overall Score</h3>
              <div className="score-badge excellent">Excellent</div>
            </div>
            <div className="score-display">
              <div className="score-number">{analysis.overallScore}</div>
              <div className="score-total">/100</div>
            </div>
            <div className="score-bar">
              <div className="score-fill" style={{width: `${analysis.overallScore}%`}}></div>
            </div>
          </div>

          <div className="score-card">
            <div className="score-header">
              <h3>ATS Compatibility</h3>
              <div className="score-badge good">Good</div>
            </div>
            <div className="score-display">
              <div className="score-number">{analysis.atsScore}</div>
              <div className="score-total">/100</div>
            </div>
            <div className="score-bar">
              <div className="score-fill ats" style={{width: `${analysis.atsScore}%`}}></div>
            </div>
          </div>
        </div>

        <div className="detailed-scores">
          <h3>Detailed Breakdown</h3>
          <div className="breakdown-grid">
            {Object.entries(analysis.sections).map(([key, value]) => (
              <div key={key} className="breakdown-item">
                <div className="breakdown-header">
                  <span className="breakdown-label">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="breakdown-score">{value}%</span>
                </div>
                <div className="breakdown-bar">
                  <div className="breakdown-fill" style={{width: `${value}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="analysis-sections">
          <div className="section strengths">
            <div className="section-header">
              <div className="section-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Key Strengths</h3>
            </div>
            <div className="items-list">
              {analysis.strengths.map((strength, index) => (
                <div key={index} className="list-item">
                  <div className="item-icon">✓</div>
                  <span>{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section improvements">
            <div className="section-header">
              <div className="section-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Improvement Opportunities</h3>
            </div>
            <div className="items-list">
              {analysis.improvements.map((improvement, index) => (
                <div key={index} className="list-item">
                  <div className="item-icon">⚡</div>
                  <span>{improvement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="section keywords">
            <div className="section-header">
              <div className="section-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10H7.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11 10H11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 10H15.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Keywords Analysis</h3>
            </div>
            <div className="keywords-content">
              <div className="keywords-found">
                <h4>Found Keywords</h4>
                <div className="keywords-grid">
                  {analysis.keywords.found.map((keyword, index) => (
                    <span key={index} className="keyword found">{keyword}</span>
                  ))}
                </div>
              </div>
              <div className="keywords-missing">
                <h4>Suggested Keywords</h4>
                <div className="keywords-grid">
                  {analysis.keywords.missing.map((keyword, index) => (
                    <span key={index} className="keyword missing">{keyword}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn primary">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Download Report
          </button>
          <button className="btn secondary" onClick={onBack}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 14L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Analyze Another Resume
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [currentPage, setCurrentPage] = useState('upload');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (file) => {
    setSelectedFile(file);
    setCurrentPage('analysis');
  };

  const handleBack = () => {
    setCurrentPage('upload');
    setSelectedFile(null);
  };

  return (
    <div className="App">
      {currentPage === 'upload' && (
        <Upload onFileUpload={handleFileUpload} />
      )}
      {currentPage === 'analysis' && selectedFile && (
        <Analysis file={selectedFile} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;