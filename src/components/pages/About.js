import './About.css';
import Footer from '../Footer';
import React, { useEffect } from 'react';

export default function About() {
    //scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [/about-us/]); // Trigger the effect when the pathname changes

    return (
    <div className='about-page'>
        <div className='about-container'>
            <div className='about-heading'>
                <h1>
                    About Us
                </h1>
            </div>
            <div className='about-text'>
                <p>
                    PointView is a website created by college tennis
                    players Emily Ing, Rebecca Kong, and Bell Zhou.
                    We attended Harvey Mudd College and played Division 
                    III tennis for the Claremont McKenna-Harvey Mudd-Scripps Colleges in California. 
                
                    Our mission is to help players analyze their game 
                    in a way that is cost-effective and accessible.
                </p>
            </div>
            <div className='team-info-container'>
                <div className='about-team-header'>
                    <h2>Meet the Team</h2>
                </div>

                <div className='about-team'>
                    <h1 className='emily-heading'>
                        Emily Ing
                    </h1>
                    <h1 className='rebecca-heading'>
                        Rebecca Kong
                    </h1>
                    <h1 className='bell-heading'>
                        Bell Zhou
                    </h1>
                </div>

                <div className='about-team-images'>
                    <img className='emily-image' src='emily-image.jpg' alt='Emily Ing'/>
                    <img className='rebecca-image' src='rebecca-image.jpg' alt='Rebecca Kong'/>
                    <img className='bell-image' src='bell-image.jpg' alt='Bell Zhou'/>
                </div>

                <div className='about-team-body'>
                    <p className='emily-text'>
                        Emily is currently a sophomore at Harvey Mudd College
                        and majors in Engineering.
                    </p>
                    <p className='rebecca-text'>
                        Rebecca is currently a sophomore at Harvey Mudd College
                        and majors in...
                    </p>
                    <p className='bell-text'>
                        Bell is currently a junior at Harvey Mudd College
                        and majors in Computer Science.
                    </p>
                </div>
            </div>
        </div>
        <><Footer/></>
    </div>
  );
}