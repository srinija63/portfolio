import React from 'react';

const projects = [
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
    link: "https://github.com/srinija63/-smartrecycle",
  },
];

export default function App() {
  return (
    <>
      <header className="header">
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
          <a href="#about" style={{ fontWeight: 600 }}>About Me</a>
          <a href="#contact" style={{ fontWeight: 600 }}>Contact</a>
          <a href="#projects" style={{ fontWeight: 600 }}>Projects</a>
        </nav>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Srinija Abburi</h1>
        <p style={{ color: '#7fbcff', margin: '0.5rem 0 0 0', fontWeight: 500 }}>
          Full Stack Developer | AI/ML | Data Visualization
        </p>
      </header>
      <main className="container">
        <section id="about" style={{ marginBottom: '2.5rem' }}>
          <h2 className="section-title">About Me</h2>
          <p style={{ fontSize: '1.15rem', lineHeight: 1.7 }}>
            I’m Srinija, a passionate final-year B.Tech student and tech creator who loves solving real-world problems through smart digital solutions. I specialize in full-stack development, AI/ML integration, and data visualization. From building women’s safety apps to personalized learning platforms for dyslexic children and sustainable recycling solutions, I bring creativity, empathy, and technical depth to every project I take on.
          </p>
        </section>
        <section id="contact">
          <h2 className="section-title">Contact</h2>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span>Email: <a href="mailto:saradasrinija@gmail.com">saradasrinija@gmail.com</a></span>
            <span>LinkedIn: <a href="https://www.linkedin.com/in/srinija-abburi/" target="_blank" rel="noopener noreferrer">Srinija Abburi</a></span>
            <span>GitHub: <a href="https://github.com/srinija63" target="_blank" rel="noopener noreferrer">srinija63</a></span>
          </div>
        </section>
        <section id="projects">
          <h2 className="section-title">Projects</h2>
          {projects.map((project, idx) => (
            <div className="card" key={idx}>
              <h3 style={{ marginTop: 0 }}>{project.title}</h3>
              <p>{project.description}</p>
              <div style={{ fontStyle: 'italic', color: '#b2b8c6', marginBottom: '0.5rem' }}>{project.tech}</div>
              <div className="project-links">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      </main>
      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Srinija Abburi</span>
      </footer>
    </>
  );
} 