"""
Portfolio seed data — single source of truth for MongoDB content.

Run after edits:
  python seed_database.py --force
"""

# ---------------------------------------------------------------------------
# 1. Personal info & profile summary
# ---------------------------------------------------------------------------

portfolio_info_data = {
    "name": "Anuganti Vijay Kumar",
    "title": "Python Developer & Aspiring Full-Stack Web Developer",
    "tagline": "Building scalable, data-driven healthcare and web applications with Python, Dash, and React.js",
    "email": "vijayanuganti504@gmail.com",
    "phone": "+91 8341121870",
    "location": "Hyderabad, Telangana",
    "github": "https://github.com/vijayanuganti",
    "linkedin": "https://www.linkedin.com/in/vijju1403",
    "github_username": "vijayanuganti",
    "years_experience": 0,
}

# ---------------------------------------------------------------------------
# 2. About (summary, education history, strengths)
# ---------------------------------------------------------------------------

about_data = {
    "summary": (
        "Results-driven Python Developer with hands-on experience in building scalable, "
        "data-driven web applications using Dash, React.js, and modern frontend technologies. "
        "Specialized in developing interactive dashboards, API integrations, and dynamic user "
        "interfaces for healthcare and pharmaceutical domains as well as responsive web layouts. "
        "Proficient in version control with GitHub, full-stack frameworks, and database management "
        "with MySQL and Oracle SQL. Eager to contribute to innovative projects while continuously "
        "improving full-stack development skills in a growth-oriented team environment."
    ),
    "passion": (
        "I combine healthcare domain expertise with modern web development — from Dash dashboards "
        "and Plotly visualizations to React.js interfaces and REST API integrations."
    ),
    "motto": "Web Development · Data-Driven Applications · Continuous Learning",
    "education": {
        "degree": "Bachelor of Technology in Computer Science and Engineering",
        "institution": "CMR Institute of Technology",
        "cgpa": "7.19/10",
    },
    "education_history": [
        {
            "institution": "CMR Institute of Technology",
            "degree": "Bachelor of Technology in Computer Science and Engineering",
            "score": "CGPA: 7.19/10",
            "period": "2020 – 2024",
        },
        {
            "institution": "Narayana Junior College",
            "degree": "Intermediate (MPC)",
            "score": "Marks: 927/1000",
            "period": "2018 – 2020",
        },
        {
            "institution": "Gowtham Model School",
            "degree": "Secondary School (SSC)",
            "score": "CGPA: 9.3/10",
            "period": "2017 – 2018",
        },
    ],
    "strengths": [
        "Web Development",
        "Data-Driven Applications",
        "Chess",
        "Puzzle Solving",
        "Strong Analytical Skills",
    ],
}

# ---------------------------------------------------------------------------
# 3. Categorized technical skills (with proficiency for UI bars/rings)
# ---------------------------------------------------------------------------

def _skills(items):
    """Build skill objects from (name, proficiency, icon) tuples."""
    return [{"name": n, "proficiency": p, "icon": i} for n, p, i in items]


skills_data = [
    {
        "category": "Programming & Frameworks",
        "skills": _skills([
            ("Python", 92, "python"),
            ("Dash", 90, "dash"),
            ("Flask", 85, "flask"),
            ("TypeScript", 72, "typescript"),
            ("Java", 78, "java"),
            ("JavaScript", 82, "javascript"),
        ]),
    },
    {
        "category": "Data & Visualization",
        "skills": _skills([
            ("Pandas", 90, "pandas"),
            ("NumPy", 88, "pandas"),
            ("Plotly", 90, "plotly"),
            ("Dash Tables", 85, "dash"),
        ]),
    },
    {
        "category": "Web Technologies",
        "skills": _skills([
            ("HTML5", 88, "html"),
            ("CSS3", 85, "css"),
            ("React.js", 80, "react"),
            ("Bootstrap", 85, "bootstrap"),
            ("React-Bootstrap", 82, "bootstrap"),
            ("Responsive Design", 88, "css"),
        ]),
    },
    {
        "category": "API & Integration",
        "skills": _skills([
            ("REST APIs", 90, "api"),
            ("Requests", 88, "api"),
            ("Payloads", 85, "api"),
            ("Data Extraction", 87, "api"),
            ("Integration", 85, "api"),
        ]),
    },
    {
        "category": "Advanced Concepts",
        "skills": _skills([
            ("Dash Callbacks", 90, "dash"),
            ("Dynamic IDs", 85, "dash"),
            ("Dynamic Layouts", 88, "dash"),
            ("Routing", 82, "react"),
            ("Reusable Components", 87, "react"),
            ("Localization", 80, "api"),
        ]),
    },
    {
        "category": "Tools & Version Control",
        "skills": _skills([
            ("Git", 90, "git"),
            ("GitHub", 92, "git"),
            ("VS Code", 95, "vscode"),
            ("Microsoft Excel", 85, "default"),
            ("PowerPoint", 80, "default"),
            ("Word", 80, "default"),
        ]),
    },
    {
        "category": "Interests & Strengths",
        "skills": _skills([
            ("Web Development", 90, "react"),
            ("Data-Driven Applications", 92, "python"),
            ("Chess", 85, "default"),
            ("Puzzle Solving", 88, "default"),
            ("Strong Analytical Skills", 90, "default"),
        ]),
    },
]

# ---------------------------------------------------------------------------
# 4. Professional work experience
# ---------------------------------------------------------------------------

experience_data = [
    {
        "role": "Python Developer",
        "company": "Makro Care",
        "company_logo": "💊",
        "location": "Hyderabad",
        "duration": "Jan 2026 - Present",
        "start_date": "2026-01",
        "end_date": None,
        "order": 1,
        "responsibilities": [
            "Developed and maintained healthcare web applications for managing medical certificate workflows.",
            "Built highly interactive dashboards using Dash and Plotly for real-time data visualization.",
            "Integrated multiple REST APIs to extract, process, and display medical data using structured payloads.",
            "Designed dynamic layouts and reusable components to improve scalability and reduce development time.",
            "Implemented advanced Dash callbacks for real-time updates and seamless user interaction.",
            "Ensured responsive design across mobile, tablet, and desktop devices while implementing multi-language localization features.",
        ],
        "technologies": ["Python", "Dash", "Plotly", "Flask", "Pandas", "REST APIs", "Bootstrap"],
        "achievements": [
            "Contributed to multiple production-level healthcare applications, significantly improving performance and UI responsiveness through optimized Dash architecture.",
        ],
    },
    {
        "role": "Web Development Intern",
        "company": "Unified Mentor",
        "company_logo": "🌤️",
        "location": "Hyderabad, Telangana",
        "duration": "April 2025 – June 2025",
        "start_date": "2025-04",
        "end_date": "2025-06",
        "order": 2,
        "responsibilities": [
            "Developed a web-based weather application enabling users to retrieve current weather conditions by location.",
            "Implemented features displaying temperature, weather description, and representative weather icons.",
            "Built responsive front-end interface using HTML, CSS, and JavaScript with focus on user experience.",
            "Integrated with weather API to fetch real-time data and ensure accurate weather information display.",
        ],
        "technologies": ["HTML5", "CSS3", "JavaScript", "REST APIs"],
        "achievements": [],
    },
]

# ---------------------------------------------------------------------------
# 5. Featured projects showcase
# ---------------------------------------------------------------------------

CHATFLOW_PROJECT_TITLE = "ChatFlow — Secure Real-Time Hybrid Android Chat App"
SARAT_ELECTRONICS_TITLE = "Sarat Electronics — Full-Stack E-Commerce Marketplace"

FLAGSHIP_PROJECT_TITLES = [
    CHATFLOW_PROJECT_TITLE,
    SARAT_ELECTRONICS_TITLE,
]

chatflow_project = {
    "id": 1,
    "title": CHATFLOW_PROJECT_TITLE,
    "tagline": "Role-Gated Enterprise Messaging Platform with Native Android Shell Optimization",
    "category": "Enterprise Messaging Platform",
    "filter_category": "Full Stack",
    "description": (
        "A highly secure, real-time communications mobile and web marketplace engineered with "
        "strict Admin / Employee / Client role-based access control, zero public registration "
        "vectors, automated audit trails, and a deeply integrated native Android hybrid shell "
        "via Capacitor 8."
    ),
    "features": [
        (
            "Zero-Trust Access Control & Governance: Complete admin-only account provisioning, "
            "phone-number-based authentication, single-session token enforcement (logging in elsewhere "
            "terminates old device sessions and clears active tokens), and strict RBAC middleware "
            "(require_admin / require_account_creator)."
        ),
        (
            "Native Android Integration Shell: Built custom Java bindings via a 'ChatFlowNative' plugin "
            "to manage active thread lifecycles, notification tones, and @capacitor/haptics physical "
            "feedback for mobile long-press actions."
        ),
        (
            "Contextual Messaging UX: Implemented WhatsApp-style mobile long-press rows that morph the "
            "search sub-header into an emerald action bar (Pin, Mute, Archive). Supports list scroll "
            "position preservation and hardware double-back button navigation traps to clear selections "
            "or close threads safely before history exits."
        ),
        (
            "Asynchronous Multimedia Architecture: Supports WebSockets for real-time streams, AWS S3 "
            "file routing, and a video poster pipeline suppressing duplicate native OS video controls "
            "via background API server-generated JPEG thumbnails with client-side frame capture fallback."
        ),
        (
            "Device File System Indexing: Routes chat document attachments directly into local device "
            "directories under scoped target paths (Download/ChatFlow/) utilizing "
            "@capacitor-community/file-opener."
        ),
        (
            "Smart Notifications & i18n: Configured background PWA web service workers alongside a native "
            "Android 'ChatFlowMessagingService' grouping tray updates by sender with inline quick-replies. "
            "Skips push notifications dynamically if a chat is muted. Full English, Hindi, and Telugu "
            "localization using react-i18next."
        ),
        (
            "Domain-Specific Verticals: Includes fully integrated client medical profiles (role-gated), "
            "administrative complaint triage panels (open/solved states), and a structural multi-day "
            "client diet management tracking platform."
        ),
    ],
    "technologies": [
        "React 19",
        "FastAPI",
        "MongoDB Atlas",
        "Capacitor 8",
        "Android Java",
        "AWS S3",
        "WebSockets",
        "FCM Stack",
        "Tailwind CSS",
        "Nginx Proxying",
        "PM2 Runtime",
        "OCI VPS Cluster",
    ],
    "tech_icons": [
        "react",
        "fastapi",
        "mongodb",
        "default",
        "java",
        "aws",
        "api",
        "default",
        "tailwind",
        "server",
        "default",
        "cloud",
    ],
    "duration": "2025 - Present",
    "featured": True,
    "github_url": None,
    "live_url": "https://140-245-209-196.sslip.io/chat",
    "render_type": "iframe_mobile",
}

sarat_electronics_project = {
    "id": 2,
    "title": SARAT_ELECTRONICS_TITLE,
    "tagline": "Production-Ready Indian Retail Marketplace with Live Payment & Storage Pipeline",
    "category": "E-Commerce Marketplace",
    "filter_category": "Full Stack",
    "description": (
        "A high-performance, full-stack e-commerce solution engineered for the Indian hardware and "
        "domestic appliance consumer market. Features a clean multi-tiered state tree, completely "
        "responsive layouts, a comprehensive secure back-office admin system, and third-party vendor "
        "integrations."
    ),
    "features": [
        (
            "Robust Monorepo Architecture: Unified repository workspace managing a fast React 19 + Vite "
            "frontend and a highly scalable backend API instance run on Node.js/Express 5."
        ),
        (
            "Stateful Cart & Catalog Management: Dynamic data extraction layer retrieving indexed consumer "
            "products (Fans, Kitchen Appliances, Cookware, Mixers, Solar Solutions) by slugs, category "
            "filters, and real-time text query arrays, synced instantly using Redux Toolkit."
        ),
        (
            "Gateway Payment Operations: Integrated live Razorpay API order intents handling secure "
            "transaction token callbacks, web checkout layers, and automated success state mapping."
        ),
        (
            "Back-Office Administrative Suite: Secure admin panel accessible via automated credential "
            "checks at '/admin/login', allowing complete inventory seeding, order state auditing, "
            "real-time shipment updates, and consumer profile tracking."
        ),
        (
            "Cloud Asset Optimization: Automated multi-part file pipeline routing dynamic product images "
            "directly to Cloudinary storage buckets, returning compressed asset URLs for sub-second "
            "loading states."
        ),
        (
            "Zero-Flicker Security Routing: Strict JSON Web Token (JWT) authorization guards securing cart "
            "modifiers, past order lookups, and admin-gated routes."
        ),
    ],
    "technologies": [
        "React 19",
        "Vite",
        "Tailwind CSS",
        "Redux Toolkit",
        "Node.js",
        "Express 5",
        "MongoDB Atlas",
        "Mongoose",
        "JWT",
        "Razorpay",
        "Cloudinary",
        "Vercel",
        "Render",
    ],
    "tech_icons": [
        "react",
        "default",
        "tailwind",
        "redux",
        "nodejs",
        "server",
        "mongodb",
        "mongodb",
        "api",
        "default",
        "cloud",
        "default",
        "cloud",
    ],
    "duration": "2025 - Present",
    "featured": True,
    "github_url": None,
    "live_url": "https://sarat-electronics.vercel.app/",
    "render_type": "iframe_desktop",
}

REMOVED_PROJECT_TITLES = [
    "Cab Fare Calculator",
    "Weather Application",
]

projects_data = [
    chatflow_project,
    sarat_electronics_project,
    {
        "id": 3,
        "title": "River Point Medical (RP Med)",
        "category": "Healthcare Web App",
        "filter_category": "Full Stack",
        "description": "Comprehensive document management system for medical certificate processing with dynamic dashboards for SSCP & IFU documents.",
        "features": [
            "Document management for medical certificate processing",
            "Dynamic dashboards for paper copy requests",
            "Real-time API integration with Pandas data processing",
            "Responsive UI using Dash Bootstrap components",
            "Plotly visualizations for data insights",
        ],
        "technologies": ["Python", "Dash", "Pandas", "NumPy", "Plotly", "Bootstrap", "REST APIs"],
        "tech_icons": ["python", "dash", "pandas", "plotly", "bootstrap", "api"],
        "duration": "2023 - 2024",
        "featured": True,
        "github_url": None,
        "live_url": None,
    },
    {
        "id": 4,
        "title": "SynergySpine Portal",
        "category": "Healthcare Portal",
        "filter_category": "Full Stack",
        "description": "Comprehensive HCP and patient portal for accessing medical records with multi-page navigation and real-time document retrieval.",
        "features": [
            "HCP and patient portal for medical records access",
            "Dynamic layouts with multi-page routing",
            "Real-time document retrieval via API integration",
            "Scalable backend using Flask",
            "Performance optimization for large datasets",
        ],
        "technologies": ["Python", "Dash", "Flask", "Pandas", "NumPy", "Plotly", "Bootstrap", "REST APIs"],
        "tech_icons": ["python", "dash", "flask", "pandas", "plotly", "bootstrap", "api"],
        "duration": "2024 - Present",
        "featured": True,
        "github_url": None,
        "live_url": None,
    },
    {
        "id": 5,
        "title": "Visu Portal",
        "category": "Data Visualization",
        "filter_category": "Backend",
        "description": "Advanced data visualization portal for healthcare insights with interactive dashboards and dynamic filtering capabilities.",
        "features": [
            "Interactive dashboards for healthcare insights",
            "Dynamic filtering with real-time updates",
            "Reusable UI components for faster development",
            "Advanced Plotly visualizations",
            "Responsive design across all devices",
        ],
        "technologies": ["Python", "Dash", "Plotly", "Pandas", "REST APIs"],
        "tech_icons": ["python", "dash", "plotly", "pandas", "api"],
        "duration": "2024 - Present",
        "featured": False,
        "github_url": None,
        "live_url": None,
    },
    {
        "id": 6,
        "title": "Personal Portfolio Website",
        "category": "Portfolio",
        "filter_category": "Full Stack",
        "description": "Fully responsive personal portfolio website showcasing complete tech stack profile, academic background, and project tracks.",
        "features": [
            "Cross-browser compatibility and mobile-first responsive design principles",
            "Integrated Git for version control and deployed the site for public accessibility",
        ],
        "technologies": ["HTML5", "CSS3", "JavaScript", "Git", "React", "FastAPI", "MongoDB"],
        "tech_icons": ["html", "css", "javascript", "git", "react", "fastapi", "mongodb"],
        "duration": "2025 - Present",
        "featured": False,
        "github_url": None,
        "live_url": "http://localhost:3000",
    },
]

# ---------------------------------------------------------------------------
# 6. Awards, leadership & activities (stored in certifications collection)
# ---------------------------------------------------------------------------

certifications_data = [
    {
        "name": "Smart India Hackathon",
        "issuer": "Participated — collaborative technical solutions",
        "date": "College",
        "credential_url": None,
        "badge_icon": "award",
    },
    {
        "name": "Technical vs. Non-Technical Debate",
        "issuer": "Represented college at CMRIT",
        "date": "College",
        "credential_url": None,
        "badge_icon": "award",
    },
]

# Optional sections — empty until you add content
testimonials_data = []
blog_posts_data = []

# All MongoDB content collections managed by the seed system
CONTENT_COLLECTIONS = [
    "portfolio_info",
    "projects",
    "about",
    "skills",
    "experience",
    "certifications",
    "testimonials",
    "blog_posts",
]

# Analytics / user-generated data (preserved unless --purge-all)
ANALYTICS_COLLECTIONS = [
    "contact_messages",
    "page_visits",
]
