from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


class PortfolioInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    email: EmailStr
    phone: str
    location: str
    github: Optional[str] = None
    linkedin: Optional[str] = None
    github_username: Optional[str] = "vijayanuganti"
    years_experience: Optional[int] = 0


class Project(BaseModel):
    id: int
    title: str
    tagline: Optional[str] = None
    category: str
    filter_category: str  # All | Frontend | Backend | Full Stack
    description: str
    features: List[str]
    technologies: List[str]
    tech_icons: Optional[List[str]] = []
    duration: str
    featured: bool = False
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    render_type: Optional[str] = None  # iframe_mobile | iframe_desktop | None
    image: Optional[str] = None


class Education(BaseModel):
    degree: str
    institution: str
    cgpa: str


class EducationEntry(BaseModel):
    institution: str
    degree: str
    score: str
    period: str


class About(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    summary: str
    passion: Optional[str] = ""
    motto: Optional[str] = ""
    education: Education
    education_history: Optional[List[EducationEntry]] = []
    strengths: List[str]


class SkillItem(BaseModel):
    name: str
    proficiency: int = Field(ge=0, le=100)
    icon: Optional[str] = None


class SkillCategory(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str
    skills: List[SkillItem]


class Experience(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: str
    company: str
    company_logo: Optional[str] = None
    location: str
    duration: str
    start_date: str
    end_date: Optional[str] = None
    responsibilities: List[str]
    technologies: List[str]
    achievements: List[str]
    order: int = 0


class Certification(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    issuer: str
    date: str
    credential_url: Optional[str] = None
    badge_icon: Optional[str] = "award"


class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    company: str
    content: str
    avatar_initials: Optional[str] = None
    rating: int = Field(default=5, ge=1, le=5)


class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    date: str
    read_time: str
    tags: List[str]
    url: Optional[str] = None


class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class PageVisit(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    path: str = "/"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None


class AnalyticsVisitCreate(BaseModel):
    path: str = "/"
