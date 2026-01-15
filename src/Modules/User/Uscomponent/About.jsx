import React from 'react'
import aboutimg from '../../../Assets/home.png'

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
        <img src={aboutimg} alt="About Us" style={{ width: '300px', height: '200px' }} />
      <p>
        Welcome to our application! We are dedicated to providing the best user experience. Our team works tirelessly to ensure that our platform is user-friendly, efficient, and reliable.
      </p>
      <p>
        Our mission is to empower users by offering innovative solutions that cater to their needs. We believe in continuous improvement and are always open to feedback to enhance our services.
      </p>
      <p>
        Thank you for choosing our application. We look forward to serving you and helping you achieve your goals!
      </p>
    </div>
  )
}
