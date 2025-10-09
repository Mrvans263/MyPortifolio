import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom" ;
import Navbar from '../common/Navbar' ;
import Home from '../pages/Home' ;
import About from '../pages/About' ;
import ProjectsAndSkills from '../pages/ProjectsAndSkills';
import Contact from '../pages/Contact' ;


function App() {
 

  return (
    <>
        <BrowserRouter>
          
          <Navbar />
          <Routes>
            <Route path='/' element={<Home /> } /> 
             
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<ProjectsAndSkills />} />
           
          </Routes>
        </BrowserRouter>
      
    </>
  )
}

export default App
