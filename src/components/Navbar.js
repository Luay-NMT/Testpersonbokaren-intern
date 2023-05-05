import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

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
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Testpersonbokaren - Intern
           
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                Sök
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/persons'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Testpersoner
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/bookings'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Bokningar
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/groups'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Grupper
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/users'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Användare
              </Link>
            </li>

            <li>
              <Link
              target={"_blank"}
              rel="noopener noreferrer"
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Extern hemsida
              </Link>
            </li>
          </ul>
          {button && <Button>Extern hemsida</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
