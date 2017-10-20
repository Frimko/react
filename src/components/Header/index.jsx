import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">React-Bootstrap</Link>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer to="/customers/"><NavItem eventKey={1}>Customers</NavItem></LinkContainer>
                <LinkContainer to="/products/"><NavItem eventKey={1}>Products</NavItem></LinkContainer>
            </Nav>
        </Navbar>
    )
};

export default Header;