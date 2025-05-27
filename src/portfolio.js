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
  subTitle: "A data engineer crafting modern data platforms, real-time pipelines, and GenAI tools.",
  githubProfile: "https://github.com/jugalsheth",
  displayGreeting: true // 👈🏽 ADD THIS LINE
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/jugalsheth",
  linkedin: "https://www.linkedin.com/in/jugalsheth/",
  gmail: "jugal.sheth63@gmail.com",
  instagram: "https://www.instagram.com/jugalsheth/",
  displayGreeting: true // 👈🏽 ADD THIS LINE
};

// Skills Section

const skillsSection = {
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
      role: "Data Engineer",
      company: "VaynerX",
      companylogo: require("./assets/images/vaynerxLogo.png"),
      date: "Dec 2023 – Present",
      desc: "Built 20+ modular dbt models, designed SLA alerts, standardized metrics for marketing and HR insights"
    },
    {
      role: "Analytics Associate",
      company: "VaynerMedia",
      companylogo: require("./assets/images/vaynermediaLogo.png"),
      date: "Oct 2021 – Dec 2023",
      desc: "Built Snowflake pipelines, standardized attribution models, led documentation initiatives"
    },
    {
      role: "Claims Data Analyst",
      company: "Optima Global (Client: The Hanover Insurance Group)",
      companylogo: require("./assets/images/hanoverLogo.png"),
      date: "Jun 2021 – Oct 2021",
      desc: "Automated ADF pipelines and designed metrics in SQL + Power BI"
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
      projectName: "ETLGenie",
      projectDesc: "Natural language to dbt pipeline generator",
      footerLink: [{ name: "GitHub", url: "https://github.com/jugalsheth/etlgenie/tree/main" }]
    },
    {
      image: require("./assets/images/querygenie.png"),
      projectName: "QueryGenie",
      projectDesc: "AI-powered SQL generation from plain English",
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
  resumeSection
};
