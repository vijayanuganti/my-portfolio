# Portfolio Backend Integration Contracts

## Overview
This document defines the API contracts, data flow, and integration strategy for the portfolio website.

## Current Mock Data Location
- `/app/frontend/src/utils/mock.js` - Contains all mock data for projects, about, skills, and experience

## Backend API Endpoints to Implement

### 1. GET /api/portfolio/info
**Purpose**: Get basic portfolio information
**Response**:
```json
{
  "name": "Anuganti Vijay Kumar",
  "title": "Python Developer",
  "tagline": "Building data-driven applications that scale",
  "email": "vijayanuganti504@gmail.com",
  "phone": "+91 8341121870",
  "location": "Hyderabad, Telangana",
  "github": "https://github.com/...",
  "linkedin": "https://linkedin.com/in/..."
}
```

### 2. GET /api/projects
**Purpose**: Get all projects
**Response**:
```json
[
  {
    "id": 1,
    "title": "River Point Medical (RP Med)",
    "category": "Healthcare Web App",
    "description": "...",
    "features": [...],
    "technologies": [...],
    "duration": "Q2 2023 - Q4 2023"
  }
]
```

### 3. GET /api/about
**Purpose**: Get about information
**Response**:
```json
{
  "summary": "...",
  "passion": "...",
  "motto": "...",
  "education": {...},
  "strengths": [...]
}
```

### 4. GET /api/skills
**Purpose**: Get technical skills categorized
**Response**:
```json
[
  {
    "category": "Programming & Frameworks",
    "skills": [...]
  }
]
```

### 5. GET /api/experience
**Purpose**: Get work experience
**Response**:
```json
{
  "role": "Python Developer",
  "company": "Pharma Company",
  "location": "Hyderabad",
  "duration": "2023 - Present",
  "responsibilities": [...],
  "technologies": [...],
  "achievements": [...]
}
```

### 6. POST /api/contact
**Purpose**: Handle contact form submissions
**Request**:
```json
{
  "name": "string",
  "email": "string",
  "message": "string"
}
```
**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

## MongoDB Collections

### 1. portfolio_info
- Stores basic portfolio information
- Single document

### 2. projects
- Stores all projects
- Multiple documents

### 3. about
- Stores about information
- Single document

### 4. skills
- Stores skills by category
- Multiple documents

### 5. experience
- Stores work experience
- Single document

### 6. contact_messages
- Stores contact form submissions
- Multiple documents with timestamps

## Frontend Integration Plan

### Files to Update:
1. `/app/frontend/src/pages/Home.jsx` - Add API calls
2. `/app/frontend/src/components/Projects.jsx` - Fetch from API
3. `/app/frontend/src/components/About.jsx` - Fetch from API
4. `/app/frontend/src/components/Experience.jsx` - Fetch from API
5. `/app/frontend/src/components/Contact.jsx` - POST to API
6. `/app/frontend/src/utils/api.js` - Create API utility functions

### Mock Data Removal:
- Remove `/app/frontend/src/utils/mock.js` after integration
- Replace all mock data imports with API calls

## Enhanced Transitions & Animations to Add:
1. Scroll-triggered animations for sections
2. Smooth hover effects on cards
3. Page transition animations
4. Loading states with skeletons
5. Parallax effects on hero section
6. Staggered animations for lists
7. Smooth fade-in effects
8. Interactive cursor effects
