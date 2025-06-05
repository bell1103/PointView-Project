import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
const [click, setClick] = useState(false);
const[button, setButton] = useState(true);


const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);

const showButton = () => {
    if (window.innerWidth <= 960) {
        setButton(false);
    } else {
        setButton(true);
    }
};

useEffect(() => {
    showButton()
}, [])
window.addEventListener('resize', showButton);
return (
        <>
            <nav className="navbar">
                <div className='navbar-container'>
                  <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
                  PointView <i className="fas fa-video" style={{ marginLeft: '8px' }}></i>

                  </Link>
                  <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fa-tab-times' :'fas fa-bars'} />
                  </div>
                  <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                            Dashboard
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/Upload' className='nav-links' onClick={closeMobileMenu}>
                            Upload
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='/log-in' className='nav-links' onClick={closeMobileMenu}>
                            Log In
                        </Link>
                    </li>
                  </ul>
                  {button && <Button buttonStyle='btn--outline'>LOG IN</Button>}
                </div>
            </nav>
        </>
    );
}

export default Navbar