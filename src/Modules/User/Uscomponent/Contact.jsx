import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h1 style={styles.title}>Contact Me</h1>
        <p style={styles.subtitle}>
          Feel free to reach out for any opportunities, collaborations, or queries.
        </p>

        <div style={styles.contactBox}>

          <div style={styles.row}>
            <FaEnvelope style={styles.icon} />
            <a href="mailto:tech@gmail.com" style={styles.link}>
              tech@gmail.com
            </a>
          </div>

          <div style={styles.row}>
            <FaPhone style={styles.icon} />
            <span>+1234567890</span>
          </div>

          <div style={styles.row}>
            <FaMapMarkerAlt style={styles.icon} />
            <span>123 Tech Street, Innovation City, Country</span>
          </div>

        </div>
      </div>

    </div>
  );
}

const styles = {
  container: {
    background: '#f4f6f8',
    minHeight: '100vh',
    padding: '40px 20px',
  },

  card: {
    maxWidth: '600px',
    margin: 'auto',
    background: 'white',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },

  title: {
    marginBottom: '10px',
  },

  subtitle: {
    color: '#555',
    marginBottom: '25px',
  },

  contactBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    textAlign: 'left',
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
  },

  icon: {
    color: '#007bff',
    fontSize: '18px',
  },

  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '17px',
  },
};