# AI-Powered Resume & Job Matcher

An intelligent full-stack web application that analyzes resumes against job descriptions using NLP techniques and provides a match score with detailed skill gap analysis.

Built using **React, Flask, JWT Authentication, Tailwind CSS, and NLP (TF-IDF + spaCy).**

---

## Features

- Secure JWT Authentication (Login & Register)
- Resume Builder (Skills, Projects, Education, Experience)
- NLP-Based Resume ↔ Job Description Matching
- Match Score Calculation (TF-IDF + Cosine Similarity)
- Skill Gap Analysis
- Matched & Missing Skill Detection
- Modern UI with Tailwind CSS
- Protected Routes (Authenticated Access)
- Database Integration (SQLite)

---

## How It Works

1. User registers or logs in.
2. Creates a resume by entering skills and experience.
3. Pastes a Job Description.
4. The system:
   - Cleans and preprocesses text
   - Extracts meaningful skill phrases using NLP
   - Calculates similarity using TF-IDF & Cosine Similarity
   - Identifies matched and missing skills
5. Displays:
   - Match Score (%)
   - Matched Skills
   - Missing Skills
   - Performance Explanation

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Flask
- Flask-JWT-Extended
- SQLAlchemy
- spaCy (NLP)
- scikit-learn (TF-IDF & Cosine Similarity)

### Database
- SQLite (Development)
---

## Project Structure

```
resume-matcher/
│
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── extensions.py
│   ├── routes/
│   │     ├── auth.py
│   │     ├── resume.py
│   │     └── matcher.py
│   ├── services/
│   │     └── nlp_engine.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── ResumeForm.js
│   │   │   └── MatchPage.js
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   └── App.js
│
└── README.md
```

## 🔐 Authentication Flow

- User registers
- Password is securely hashed (bcrypt)
- Login returns JWT token
- Token stored in localStorage
- Protected routes require Authorization header
- Logout clears token securely

---

## Matching Algorithm

### Text Preprocessing
- Remove punctuation
- Convert to lowercase
- Remove stopwords

### Similarity Scoring
- TF-IDF Vectorization
- Cosine Similarity
- Score returned as percentage

### Skill Extraction
- spaCy noun phrase extraction
- Dynamic detection of technical phrases
- Comparison between resume & job description

---

## 🎯 Example Output

```
Match Score: 68.45%

Matched Skills:
- Python
- Flask
- SQL

Missing Skills:
- React JS
- Machine Learning

Explanation:
Good match. Some important skills are missing.
```
