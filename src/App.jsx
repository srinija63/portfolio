import React, { useCallback, useEffect, useState } from 'react';

const projects = [
  {
    title: "Multi-Tool AI Research Agent (Autonomous Decision System)",
    description:
      "Built an autonomous research assistant with LangChain that dynamically chooses tools for search, summarization, and comparative reasoning. Exposed production-style FastAPI endpoints with structured JSON outputs, fallback handling, and resilient response repair for multi-step workflows.",
    tech: "Python, FastAPI, LangChain, LLMs",
    link: "https://github.com/srinija63/multi-tool-ai-research-agent",
  },
  {
    title: "Online Mental Health Companion (AI-Driven Support Platform)",
    description:
      "Developed a full-stack mental health platform with journaling, mood tracking, sentiment analysis, and conversational support. Integrated NLP and GPT-based chatbot flows, plus a crisis detection pipeline to trigger real-time intervention resources.",
    tech: "React.js, Node.js, Express.js, MongoDB, NLP, OpenAI API",
    link: "https://github.com/srinija63/online-therapy-application",
  },
  {
    title: "Women’s Security Alert System",
    description:
      "An Android app that triggers an alarm and sends emergency alerts with the user's location when the phone is shaken, ensuring quick response in danger situations. A built-in alarm prevents accidental triggers.",
    tech: "Java, Firebase",
    link: "https://github.com/srinija63/WomenSecurity",
  },
  {
    title: "Personalized Educational Aid for Dyslexic Children",
    description:
      "A web app using gamification and multisensory techniques to support dyslexic learners. It features speech-to-text, text-to-speech, adaptive learning using AI, and real-time progress tracking.",
    tech: "React, MongoDB, Firebase, TensorFlow",
    link: null,
  },
  {
    title: "Smart Recycling MVP",
    description:
      "A sustainability-focused MVP built during a hackathon. It helps users scan and categorize waste items, guides proper disposal methods, and includes a planned reward system for eco-friendly behavior.",
    tech: "React, Firebase, AI (planned)",
    link: "https://github.com/srinija63/smartrecyclecbre",
  },
  {
    title: "Loop Habits",
    description:
      "A habit tracking web application focused on consistency and progress visualization. Includes clean workflow management for daily habit tracking and performance insights.",
    tech: "JavaScript",
    link: "https://github.com/srinija63/loop-Habits",
  },
  {
    title: "Zorvyn Finance Dashboard",
    description:
      "A modern finance dashboard with interactive UI for tracking financial metrics and trends. Deployed to Vercel with a TypeScript-based codebase for maintainability.",
    tech: "TypeScript, React, Vercel",
    link: "https://github.com/srinija63/Zorvyn-finance-dashboard",
    demo: "https://zorvyn-finance-dashboard-three.vercel.app",
  },
];

export default function App() {
  const introMessages = [
    "SRINIJA\nMADE THIS",
    "FULL STACK\nDEVELOPER",
    "AI/ML\nBUILDER",
    "WELCOME TO\nMY PORTFOLIO",
  ];
  const [introVisible, setIntroVisible] = useState(true);
  const [msgIdx, setMsgIdx] = useState(0);
  const [photoLoadFailed, setPhotoLoadFailed] = useState(false);

  const nextMessage = useCallback(() => {
    setMsgIdx((i) => (i + 1) % introMessages.length);
  }, [introMessages.length]);

  useEffect(() => {
    if (!introVisible) {
      return undefined;
    }
    const textTimer = setInterval(nextMessage, 1800);
    const hideTimer = setTimeout(() => setIntroVisible(false), 5200);
    return () => {
      clearInterval(textTimer);
      clearTimeout(hideTimer);
    };
  }, [introVisible, nextMessage]);

  useEffect(() => {
    const animatedNodes = document.querySelectorAll('.animate-on-scroll');
    if (!animatedNodes.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    animatedNodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const skillGroups = [
    "Languages: Java, Python, JavaScript, HTML/CSS",
    "Frameworks/Libraries: React.js, Node.js, Express.js",
    "Databases: MongoDB, SQL (querying, joins, schema design, indexing)",
    "Tools/Platforms: Git, GitHub, Jenkins, Docker, Jira, Firebase, AWS (Basics), Postman",
    "AI/ML: Machine Learning, NLP, Sentiment Analysis, OpenAI API, Prompt Engineering",
  ];

  const certifications = [
    "Networking Devices and Initial Configuration (Cisco)",
    "Advanced Testing Practices Using AWS DevOps Tools (AWS)",
    "Machine Learning (Coursera)",
    "React JS (Infosys Springboard)",
    "GenAI for Professionals: 10x Your Productivity (Udemy)",
  ];
  const particles = Array.from({ length: 14 }, (_, i) => i);
  const profileImageSrc = '/profile.jpg';

  return (
    <>
      {introVisible && (
        <section className="intro-screen">
          <div className="intro-board">
            <pre className="intro-message" key={msgIdx}>{introMessages[msgIdx]}</pre>
            <button className="intro-button" onClick={() => setIntroVisible(false)}>
              Enter Portfolio
            </button>
          </div>
        </section>
      )}
      <div className={`app-shell ${introVisible ? 'app-shell-hidden' : 'app-shell-visible'}`}>
        <div className="bg-blobs" aria-hidden="true">
          <span className="blob blob-one"></span>
          <span className="blob blob-two"></span>
          <span className="blob blob-three"></span>
        </div>
        <div className="particle-field" aria-hidden="true">
          {particles.map((p) => (
            <span key={p} className={`particle particle-${p + 1}`}></span>
          ))}
        </div>
        <header className="header hero-wrap">
          <nav className="top-nav">
            <a href="#about">About Me</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
            <a href="#projects">Projects</a>
          </nav>
          <div className="hero-content hero-split animate-on-scroll in-view">
            <div className="hero-left">
              <span className="hero-chip">Open to Full-Stack & AI Roles</span>
              <h1 className="hero-title">Srinija Abburi</h1>
              <p className="hero-subtitle">
                Full Stack Developer | AI/ML Engineer | Building human-centered products
              </p>
              <div className="hero-cta">
                <a href="#projects" className="btn btn-primary">View Projects</a>
                <a href="#contact" className="btn btn-ghost">Let&apos;s Connect</a>
              </div>
            </div>
            <div className="hero-right">
              <div className="profile-frame">
                <div className="profile-avatar">
                  {!photoLoadFailed ? (
                    <img
                      src={profileImageSrc}
                      alt="Srinija profile"
                      className="profile-image"
                      onError={() => setPhotoLoadFailed(true)}
                    />
                  ) : (
                    <span>SA</span>
                  )}
                </div>
                <p className="profile-meta">Hyderabad, India</p>
                <p className="profile-role">B.Tech | AI + Full Stack</p>
              </div>
            </div>
          </div>
        </header>
        <main className="container">
          <section id="about" className="content-section animate-on-scroll">
            <h2 className="section-title">About Me</h2>
            <p className="section-text">
              I am a B.Tech student at G. Narayanamma Institute of Technology and Sciences (CGPA 9.01) with strong interest in building impactful products using full-stack development and AI. I enjoy creating scalable systems, from autonomous AI research workflows to mental-health and safety-focused applications, with emphasis on usability, performance, and reliability.
            </p>
          </section>
          <section id="skills" className="content-section animate-on-scroll">
            <h2 className="section-title">Skills & Certifications</h2>
            <div className="card glass-card">
              <h3 className="sub-title">Core Skills</h3>
              <ul className="list-clean">
                {skillGroups.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
              <h3 className="sub-title">Certifications</h3>
              <ul className="list-clean">
                {certifications.map((cert, idx) => (
                  <li key={idx}>{cert}</li>
                ))}
              </ul>
            </div>
          </section>
          <section id="contact" className="content-section animate-on-scroll">
            <h2 className="section-title">Contact</h2>
            <div className="card glass-card contact-card">
              <span>Email: <a href="mailto:saradasrinija@gmail.com">saradasrinija@gmail.com</a></span>
              <span>Phone: <a href="tel:+919391034637">+91 93910 34637</a></span>
              <span>LinkedIn: <a href="https://www.linkedin.com/in/srinija-abburi/" target="_blank" rel="noopener noreferrer">Srinija Abburi</a></span>
              <span>GitHub: <a href="https://github.com/srinija63" target="_blank" rel="noopener noreferrer">srinija63</a></span>
            </div>
          </section>
          <section id="projects" className="content-section animate-on-scroll">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
              {projects.map((project, idx) => (
                <div
                  className="card glass-card project-card animate-on-scroll"
                  key={idx}
                  style={{ transitionDelay: `${Math.min(idx * 70, 420)}ms` }}
                >
                  <h3 className="project-title">{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech-tags">
                    {project.tech.split(',').map((item) => (
                      <span className="tech-pill" key={`${project.title}-${item.trim()}`}>
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View on GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <footer className="footer">
          <span>&copy; {new Date().getFullYear()} Srinija Abburi</span>
        </footer>
      </div>
    </>
  );
} 