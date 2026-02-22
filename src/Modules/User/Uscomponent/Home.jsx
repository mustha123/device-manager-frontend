import React from 'react'
import Homepage from '../../../Assets/Home2.jpg'

export default function Home() {
  return (
    <div
      style={{
        backgroundImage: `url(${Homepage})`, // ✅ FIXED
        height: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: '20px' // 📱 Mobile view
        
      }}
    >
      <h2
        style={{
          textAlign: 'center', // 📱 Mobile view
          fontSize: 'clamp(24px, 5vw, 48px)', // 📱 Mobile view (responsive text)
          margin: 0, // 📱 Mobile view
          textDecoration: 'underline',
          textDecorationColor: 'white', // 📱 Mobile view
          textShadow: '2px 2px 8px rgba(0,0,0,0.7)', // 📱 Mobile view (readability)
          marginLeft: '-800px', // 📱 Mobile view
          marginBottom: '550px' // 📱 Mobile view
        }}
      >
        Welcome to Home Page
      </h2>
    </div>
  )
}
