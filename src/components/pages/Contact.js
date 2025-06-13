import './Contact.css';
import Footer from '../Footer';
import React, { useEffect } from 'react';

export default function Contact() {
    //scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [/contact/]); // Trigger the effect when the pathname changes
  return (
    <div className='contact-page'>
        <div className='contact-container'>
            <div className='contact-heading'>
                <h1>
                    Contact Us
                </h1>
            </div>
            <div className='contact-text'>
                <p>
                    If you have any questions or feedback, please feel free to reach out to us at:
                </p>
                <ul>
                    <p>Email: contact@pointview.com</p>
                    <p>Phone: (123) 456-7890</p>
                </ul>
            </div>
        </div>
        <><Footer/></>
    </div>
  );
}