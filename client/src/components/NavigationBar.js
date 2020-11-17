import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default function NavigationBar() {
    return (
        <Navbar>
            <Navbar.Brand href='/'>Inventory Manager</Navbar.Brand>
            <Nav.Link href='/'>Inventory</Nav.Link>
            <Nav.Link href='/orders'>Orders</Nav.Link>
        </Navbar>
    )
}