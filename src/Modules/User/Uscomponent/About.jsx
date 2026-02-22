import React from 'react';
import aboutimg from '../../../Assets/home.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

export default function About() {
  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h1 style={styles.mainTitle}>About Me</h1>

        <div style={styles.headerSection}>
          <img src={aboutimg} alt="About" style={styles.image} />

          <div>
            <h2 style={styles.name}>Mahammad Musthafa</h2>

            <p style={styles.contact}>

              <span style={styles.row}>
                <FaEnvelope />
                <a href="mailto:musthafaafraz3@gmail.com" style={styles.bigLink}>
                  musthafaafraz3@gmail.com
                </a>
              </span>

              <span style={styles.row}>
                <FaPhone />
                +91-7676888495
              </span>

              <span style={styles.row}>
                <FaLinkedin />
                <a
                  href="https://www.linkedin.com/in/mahammad-musthafa-10b3ab352"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.bigLink}
                >
                  LinkedIn Profile
                </a>
              </span>

              <span style={styles.row}>
                <FaGithub />
                <a
                  href="https://github.com/mustha123"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.bigLink}
                >
                  github.com/mustha123
                </a>
              </span>

            </p>
          </div>
        </div>

        <section>
          <h3 style={styles.heading}>Professional Summary</h3>
          <p style={styles.text}>
            A highly motivated and detail-oriented BCA graduate with strong programming
            skills and passion for web development. Experienced in Python, Java, MERN stack,
            and building real-world projects. Quick learner with excellent teamwork and
            problem-solving abilities.
          </p>
        </section>

      </div>
    </div>
  );
}

const styles = {
  container: {
    background: '#f4f6f8',
    minHeight: '100vh',
    padding: '30px',
  },

  card: {
    maxWidth: '900px',
    margin: 'auto',
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
  },

  mainTitle: {
    textAlign: 'center',
    marginBottom: '20px',
  },

  headerSection: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  image: {
    width: '180px',
    height: '180px',
    borderRadius: '12px',
    objectFit: 'cover',
  },

  name: {
    marginBottom: '10px',
  },

  contact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '16px',
  },

  bigLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '17px',
    fontWeight: '600',
    transition: '0.3s',
  },

  heading: {
    borderBottom: '2px solid #ddd',
    paddingBottom: '5px',
    marginTop: '20px',
  },

  text: {
    textAlign: 'justify',
    lineHeight: '1.7',
    marginTop: '10px',
  },
};