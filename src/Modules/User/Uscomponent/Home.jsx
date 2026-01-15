import React from 'react'
import Homepage from '../../../Assets/Home2.jpg'
export default function Home() {
  return (
    <div style={{backgroundImage:`url(${Homepage}`,height:'100vh',backgroundSize:'cover',backgroundPosition:'center',width:'100%',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  justifyContent: 'center',
  alignItems:' center',
  color: 'white'}}>
      <h1 style={{color:'dark',marginBottom:600,marginRight:1000,textDecoration: 'underline',
        textDecorationColor:'Scrollbar'}}>
          Welcome to Home Page</h1>
    </div>
  )
}
