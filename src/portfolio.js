import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true,
  animation: splashAnimation,
  duration: 2000
};

// Summary And Greeting Section

const illustration = {
  animated: true
};

const greeting = {
  username: "Jugal Sheth",
  title: "Hi, I'm Jugal 👋",
  subTitle: "Full-stack data engineer building production systems used by 200+ users. From real-time pipelines to NextJS apps, I ship what scales.",
  resumeLink: true,
  githubProfile: "https://github.com/jugalsheth",
  displayGreeting: true,
  // Instagram Reels Grid - Three vertical columns of videos as full-screen background
  personalGallery: {
    display: false, // Set to false to hide the video background
    // Video Reels - Add your video files here (will be distributed across 3 columns)
    // Videos will autoplay, loop, and be muted as transparent background
    reels: [
      {
        type: "video",
        url: require("./assets/videos/video1_compressed.mp4"),
        caption: "Building something awesome! 🚀"
      },
      {
        type: "video",
        url: require("./assets/videos/video2_compressed.mp4"),
        caption: "Behind the scenes! 🎬"
      },
      {
        type: "video",
        url: require("./assets/videos/video3_compressed.mp4"),
        caption: "Check out my latest project! ⚡"
      },
    ],
    // Configuration options
    autoPlay: true // Auto-rotate through videos in each column (every 4 seconds)
  }
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/jugalsheth",
  linkedin: "https://www.linkedin.com/in/jugal-sheth/",
  gmail: "jugal.sheth63@gmail.com",
  instagram: "https://www.instagram.com/jugalsheth/",
  displayGreeting: true // 👈🏽 ADD THIS LINE
};

// Skills Section

const skillsSection = {
  title: "Skills & Expertise",
  subTitle: "Mastering the tools and technologies that power modern data systems",
  skills: [
    "⚡ Building reliable real-time data pipelines using Kafka + Spark",
    "⚡ Creating dashboards with Streamlit and custom visuals",
    "⚡ GenAI-based workflow automation with OpenAI and Python"
  ],
  softwareSkills: [
    {
      skillName: "Python",
      fontAwesomeClassname: "logos:python"
    },
    {
      skillName: "Kafka",
      fontAwesomeClassname: "simple-icons:apachekafka"
    },
    {
      skillName: "Spark",
      fontAwesomeClassname: "logos:apachespark"
    },
    {
      skillName: "Snowflake",
      fontAwesomeClassname: "simple-icons:snowflake"
    },
    {
      skillName: "Streamlit",
      fontAwesomeClassname: "simple-icons:streamlit"
    }
  ],
  display: true // 👈🏽 ADD THIS LINE
};

// Education Section

const educationInfo = {
  display: true,
  schools: [
    {
      schoolName: "Northeastern University",
      logo: require("./assets/images/northeasternLogo.png"),
      subHeader: "Master of Science in Engineering Management",
      duration: "Boston, MA",
      desc: "Coursework in Data Mining, Database Design, Algorithmic Marketing, Statistics"
    },
    {
      schoolName: "University of Mumbai",
      logo: require("./assets/images/mumbaiUniversityLogo.png"),
      subHeader: "Bachelor of Engineering in Mechanical Engineering",
      duration: "Mumbai, India",
      desc: "Solid engineering foundation and analytical mindset"
    }
  ]
};

const techStack = {
  viewSkillBars: true,
  experience: [
    {
      Stack: "Data Engineering",
      progressPercentage: "90%"
    },
    {
      Stack: "GenAI / Automation",
      progressPercentage: "80%"
    },
    {
      Stack: "Visualization / BI",
      progressPercentage: "75%"
    }
  ],
  displayCodersrank: false
};

const workExperiences = {
  display: true,
  experience: [
    {
      role: "Senior Data Engineer",
      company: "VaynerX",
      companylogo: require("./assets/images/vaynerxLogo.png"),
      date: "Dec 2023 – Present",
      desc: "Primary contributor to analytics data layer for emerging CRM SaaS; designed and maintained scalable datasets and reporting to surface critical business signals.",
      descBullets: [
        "Architected and modeled the core analytics data layer for emerging CRM SaaS, designing and maintaining 50+ scalable datasets surfacing critical business signals from 5+ data sources",
        "Designed and implemented Medallion architecture (Bronze/Silver/Gold layers) for data lake, ensuring data quality and governance at scale",
        "Engineered and optimized ETL/ELT pipelines (Airflow/dbt), reducing cycle time by 40% via query optimization and schema redesign",
        "Established and governed data governance framework for critical financial KPIs, standardizing definitions, which fed into 15 executive Power BI dashboards used by the Finance team to reduce quarterly forecasting variance by 12%",
        "Enabled product, data science, and business teams to perform agile, repeatable analysis—resulting in 3 new product features and improved customer acquisition performance by 25%",
        "Led reporting framework deployment, improving marketing campaign measurement accuracy by 30%",
        "Mentored 2 junior analysts on data engineering best practices and CI/CD, elevating team code quality and reliability"
      ]
    },
    {
      role: "Analytics Engineer",
      company: "VaynerMedia",
      companylogo: require("./assets/images/vaynermediaLogo.png"),
      date: "Oct 2021 – Dec 2023",
      desc: "Partnered with Growth, Marketing, and Product teams to design and evaluate A/B tests and other experiments, providing actionable insights.",
      descBullets: [
        "Partnered with Growth, Marketing, and Product teams to design and evaluate A/B tests and other experiments, providing actionable insights that supported over $2M in budget decisions",
        "Developed and maintained Marketing Performance dashboards in Tableau for 10+ key marketing campaigns, providing granular metrics (ROAS, CPA) that optimized media spend efficiency by 18%",
        "Designed standardized metric layer and reporting workflows for business strategy org—improved discoverability across projects",
        "Championed code review and testing culture, enhancing documentation and performance optimization for analytics pipelines"
      ]
    },
    {
      role: "Claims Data Analyst",
      company: "Optima Global (Client: The Hanover Insurance Group)",
      companylogo: require("./assets/images/hanoverLogo.png"),
      date: "Jun 2021 – Oct 2021",
      desc: "Streamlined fraud detection analytics and designed project management reports.",
      descBullets: [
        "Streamlined fraud detection analytics: implemented deep-dive SQL solutions and query tuning, resulting in 60% reduction in reporting latency",
        "Designed Project Management reports (Power BI) utilizing PostgreSQL data to track claims processing pipeline efficiency, resource utilization, and SLA adherence, allowing managers to reduce the average claim cycle time by 5 days",
        "Delivered reliable, actionable insights impacting loss minimization and claim processing efficiency for insurance analytics"
      ]
    }
  ]
};

const openSource = {
  showGithubProfile: "true",
  display: true
};

const bigProjects = {
  title: "Projects",
  subtitle: "Showcasing real-time data platforms and GenAI tools",
  projects: [
    {
      image: require("./assets/images/etlgenie.png"),
      projectName: "Real-Time Analytics Dashboard",
      projectDesc: "Live monitoring dashboard for data pipelines with real-time metrics, throughput visualization, and system resource tracking. Built with Streamlit and Plotly.",
      embedUrl: "https://real-time-dashboard-vjf78bbxheqjjwefbgutyw.streamlit.app",
      footerLink: [
        { name: "Live Demo", url: "https://real-time-dashboard-vjf78bbxheqjjwefbgutyw.streamlit.app" },
        { name: "GitHub", url: "https://github.com/jugalsheth/real-time-dashboard" }
      ]
    },
    {
      image: require("./assets/images/etlgenie.png"),
      projectName: "ETLGenie",
      projectDesc: "GenAI-powered dbt pipeline generator - transforms natural language to production-ready SQL. Built with OpenAI API and Streamlit.",
      footerLink: [{ name: "GitHub", url: "https://github.com/jugalsheth/etlgenie/tree/main" }]
    },
    {
      image: require("./assets/images/querygenie.png"),
      projectName: "QueryGenie",
      projectDesc: "AI SQL assistant turning plain English into optimized queries. Speeds up analysis 10x for non-technical stakeholders.",
      footerLink: [{ name: "GitHub", url: "https://github.com/jugalsheth/querygenie" }]
    },
    {
      image: require("./assets/images/scriptwriter.png"),
      projectName: "Creative Script Writer",
      projectDesc: "Streamlit app that generates screenplays with OpenAI",
      footerLink: [{ name: "GitHub", url: "https://github.com/jugalsheth/creative-script-writer" }]
    }
  ],
  display: true
};

const achievementSection = {
  title: emoji("Achievements and Certifications 🏆"),
  subtitle: "Selected key accomplishments and recognition",
  achievementsCards: [],
  display: false
};

const blogSection = {
  title: "Blogs",
  subtitle: "Writing about tools, projects, and data engineering best practices",
  displayMediumBlogs: "false",
  blogs: [],
  display: false
};

const talkSection = {
  title: "Talks",
  subtitle: emoji("Workshops & Talks"),
  talks: [],
  display: false
};

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  subtitle: "Interviews and stories (coming soon)",
  podcast: [],
  display: false
};

// Visual Resume Section - Comprehensive Data
const visualResume = {
  display: true,
  objective: "Highly experienced Senior Data/Analytics Engineer (5+ years) specializing in designing, scaling, and governing modern ETL/ELT data platforms (Snowflake, Airflow, dbt). Track record of architecting metric layers, championing best practices, and driving business impact—40% pipeline optimization, 12% forecasting accuracy. Seeking to empower strategic decision-making across content, finance, and marketing domains.",
  
  impactMetrics: [
    {
      value: 40,
      suffix: "%",
      label: "Pipeline Optimization",
      description: "Reduced ETL/ELT cycle time through query optimization",
      color: "green"
    },
    {
      value: 12,
      suffix: "%",
      label: "Forecasting Accuracy",
      description: "Improved quarterly forecasting variance",
      color: "blue"
    },
    {
      value: 25,
      suffix: "%",
      label: "Customer Acquisition",
      description: "Enhanced customer acquisition performance",
      color: "green"
    },
    {
      value: 30,
      suffix: "%",
      label: "Campaign Accuracy",
      description: "Improved marketing campaign measurement",
      color: "green"
    },
    {
      value: 60,
      suffix: "%",
      label: "Latency Reduction",
      description: "Reduced reporting latency for fraud detection",
      color: "green"
    },
    {
      value: 2,
      suffix: "M+",
      label: "Budget Impact",
      description: "Supported data-driven budget decisions",
      color: "blue"
    },
    {
      value: 80,
      suffix: "%",
      label: "Manual Work Eliminated",
      description: "Automated data workflows and processes",
      color: "green"
    },
    {
      value: 200,
      suffix: "+",
      label: "Week 1 Users",
      description: "Procurement platform adoption",
      color: "blue"
    }
  ],

  skills: {
    "Languages & Data Processing": [
      "SQL",
      "Python",
      "R",
      "Bash"
    ],
    "Data Warehousing & Modeling": [
      "Snowflake",
      "PostgreSQL",
      "Oracle",
      "SQL Server",
      "Dimensional Modeling",
      "OLTP/OLAP Schemas"
    ],
    "Pipeline Engineering": [
      "ETL/ELT Design",
      "Airflow",
      "dbt",
      "Fivetran",
      "Python Frameworks",
      "DAG Management"
    ],
    "Analytics & Visualization": [
      "Tableau",
      "Power BI",
      "Looker",
      "Jupyter",
      "Deep-Dive Analysis",
      "Reporting Frameworks"
    ],
    "Full-Stack Development": [
      "NextJS",
      "React",
      "TypeScript",
      "Node.js",
      "REST APIs",
      "Server-Side Rendering"
    ],
    "System Design & Architecture": [
      "Multi-Tenant Systems",
      "Medallion Architecture",
      "Microservices",
      "API Design",
      "Scalability Patterns",
      "Zero-Downtime Deployments"
    ],
    "Cloud/DevOps": [
      "AWS (Lambda, S3, RDS, Redshift)",
      "Vercel",
      "Supabase",
      "GitHub Actions",
      "CI/CD Pipelines",
      "Infrastructure as Code"
    ],
    "Testing & Reliability": [
      "Data Quality Checks",
      "Schema Validation",
      "Pytest",
      "Code Reviews",
      "A/B Test Methodologies"
    ]
  },

  detailedProjects: [
    {
      name: "Procurement Intelligence Platform",
      subtitle: "Production NextJS App · 200+ Active Users",
      date: "2024",
      image: require("./assets/images/etlgenie.png"),
      description: "Enterprise procurement tool connecting Snowflake DWH to intuitive NextJS frontend, serving 200+ users from week one",
      bullets: [
        "Architected full-stack NextJS application with server-side rendering, deployed on AWS with zero-downtime CI/CD pipeline",
        "Designed RESTful API layer connecting Snowflake data warehouse via Snowflake Connector, enabling real-time procurement analytics",
        "Implemented role-based access control for multi-department security, supporting 200+ concurrent users across 5 business units",
        "Built interactive dashboards with Chart.js showing real-time spend analytics, reducing procurement approval time by 50%",
        "Became company-wide standard for internal tool development, demonstrating production-grade system design at scale"
      ],
      technologies: ["NextJS", "Snowflake", "AWS", "TypeScript", "Node.js", "REST API", "CI/CD"],
      links: []
    },
    {
      name: "SKU Master Ware",
      subtitle: "Multi-Channel Inventory Management System",
      date: "Oct 2025",
      image: require("./assets/images/etlgenie.png"),
      description: "Production inventory reconciliation system deployed by 3 retail/logistics startups",
      bullets: [
        "Architected production PostgreSQL database with 15+ tables and Row-Level Security for multi-channel inventory reconciliation—deployed by 3 retail/logistics startups managing 10K+ SKUs across Amazon, Flipkart, and Myntra",
        "Engineered serverless DevOps pipeline on Vercel with Vite optimization and Supabase BaaS, achieving zero-downtime deployments, sub-second page loads, and 99.9% uptime",
        "Built analytics engine computing 40+ real-time KPIs and automated reorder workflows with barcode-driven GRN systems, reducing manual intervention by 80%"
      ],
      technologies: ["PostgreSQL", "Vercel", "Vite", "Supabase", "Row-Level Security"],
      links: [
        { name: "GitHub", url: "https://github.com/jugalsheth" }
      ]
    },
    {
      name: "GeoPulse AI",
      subtitle: "LLM-Powered Analytics Layer",
      date: "Feb 2025",
      image: require("./assets/images/querygenie.png"),
      description: "AI-powered financial news analysis for market performance forecasting",
      bullets: [
        "Developed an OpenAI-powered Streamlit app analyzing global financial news to forecast market performance",
        "Designed dbt-based modular pipelines with explainable metrics, ensuring trustable ML-driven dashboards"
      ],
      technologies: ["OpenAI", "Streamlit", "dbt", "Python", "NLP"],
      links: [
        { name: "GitHub", url: "https://github.com/jugalsheth/querygenie" }
      ]
    },
    {
      name: "ETL Real-Time Platform",
      subtitle: "Kafka, Spark, Snowflake",
      date: "Jan 2025",
      image: require("./assets/images/scriptwriter.png"),
      description: "Real-time order ingestion platform with SLA monitoring and alerts",
      bullets: [
        "Simulated live order ingestion via Kafka, PySpark, and Snowflake with SLA monitoring, alerts, and observability",
        "Delivered dashboards for latency tracking, low-stock alerts, and business-critical event monitoring",
        "Emphasized fault tolerance and schema evolution, showcasing working knowledge of data warehouse technologies"
      ],
      technologies: ["Kafka", "PySpark", "Snowflake", "Airflow", "Real-time Processing"],
      links: [
        { name: "GitHub", url: "https://github.com/jugalsheth/etlgenie/tree/main" }
      ]
    }
  ]
};

const resumeSection = {
  title: "Resume",
  subtitle: "Download my resume to know more about my work",
  display: true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle: "Let’s collaborate or connect – happy to chat!",
  number: "+1 (857) 869-8235",
  email_address: "jugal.sheth63@gmail.com"
};

const twitterDetails = {
  userName: "",
  display: false
};

const isHireable = true;

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection,
  visualResume
};
