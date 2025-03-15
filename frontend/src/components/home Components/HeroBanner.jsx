import React from 'react'
import './home.css'
const HeroBanner = () => {
  return (
    <div className="hero-banner position-relative text-center text-white" style={{ background: "url('/heroBanner/KidStyle.jpg') center/cover no-repeat", height: "90vh" }}>
    <div className="overlay position-absolute w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}></div>
    <div className="content position-relative z-index-1 d-flex flex-column align-items-center justify-content-center h-100">
      <h1 className="display-4 fw-bold mb-3">Everything on Sale!</h1>
      <p className="fs-5 mb-4">Discover unbeatable discounts across all categories. Shop now and save big!</p>
      <a href="/product" className="btn btn-warning btn-lg">Shop Now</a>
    </div>
  </div>
  )
}

export default HeroBanner