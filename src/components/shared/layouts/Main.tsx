


import React from "react";
import Header from "../header/Header";
import Footer from './../Footer';

const Main = ({ children }) => {
  return (
    <>
    <div className="relative">
      <div className="top-0 w-full bg-white fixed z-30">
        <Header />
      </div>
      <div className="mt-20 z-10">
        <main className="flex min-h-screen flex-col items-center justify-between ">  
                {children}
        </main>
      </div>
     
    </div>
     
      <Footer/>
    </>
  );
};

export default Main;
