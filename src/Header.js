import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    // NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';

const Headers = () => {
    return (
        <div>
            <Navbar color="light" light expand="md">
                {/* <NavbarBrand href="/">reactstrap</NavbarBrand> */}
                <NavbarToggler />
                <Collapse navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to="/event" >
                                <Button color="info">
                                    Event
                                </Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/calendar" >
                                <Button color="secondary">
                                    Calendar
                                </Button>
                            </Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Headers;