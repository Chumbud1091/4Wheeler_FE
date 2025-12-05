import React from 'react'
import UserNavBar from '../UI/NavBar/UserNavBar'
import HomeBanner from '../UI/HomeComponents/HomeBanner'
import HomeCars from '../UI/HomeComponents/HomeCars'
import Testimonials from '../testimonials/Testimonials'
import Footer from '../UI/Footer/Footer'

const Home = () => {
  return (
    <div>
      <UserNavBar />
      <HomeBanner />
      <HomeCars />
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
