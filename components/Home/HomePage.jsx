import React from "react";
import Header from "./Header";
import HeroSection from "./Login";
import HowWork from "./HowWork";
import DownLoadAppstore from "./DownLoadAppstore";
import ContactSection from "./ContactSection";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div style={{backgroundColor:"#fff"}}>
    <Header/>
    <HeroSection/>
    <HowWork/>
    <DownLoadAppstore/>
    <ContactSection/>
    <Footer/>
    </div>
  );
};

export default HomePage;
