import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


// add an icon/logo to the top left
// icon styles should be global
// maybe put other styled elements in a separate folder

const Header = styled.header`
    margin: 0;
    position: fixed;

    width: 100%;
    height: 4rem;

    z-index: 1;
    background: rgba(240, 240, 240 0.7);
    box-shadow: 2px 2px 6px #003864;
    background-color: #1e2122;

    ul {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        margin: 1rem;

        li, a {
            list-style: none;
            text-decoration: none;
            padding: 0.3rem;
        }
    }
`
// const Flex = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     align-items: center;
//     margin-right: 1rem;

//     li, a {
//             list-style: none;
//             text-decoration: none;
//             padding: 0.3rem;
//         }
// `

const Navbar = (isAuthenticated = false) => {

    const AuthLinks = (
        <nav>
            <ul>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/account'>Account</Link>
                </li>
                <li>
                    <Link to='/cart'>Cart</Link>
                </li>
            </ul>
        </nav>
    );

    const GuestLinks = (
        <nav>
            <ul>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/register'>Login</Link>
                </li>
                <li>
                    <Link to='/cart'>Cart</Link>
                </li>
            </ul>
        </nav>
    )

    return (
        <Header>
            {isAuthenticated
                ? AuthLinks
                : GuestLinks
            }
        </Header>
    );
};

export default Navbar;
