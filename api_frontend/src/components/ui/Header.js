import React from 'react'
import logo from './logo.png'

/**
 * Header of the frontend interface; contains IMDb logo
 */
const Header = () => {
    return (
        <header className="center">
            <a href="/">
                <img src={logo} alt='IMDb logo' />
            </a>
        </header>
    )
}

export default Header;
