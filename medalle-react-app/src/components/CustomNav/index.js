import React, { useState } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const CustomNav = () => {
  // State to manage the open/closed state of the navigation bar
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // Function to toggle the navigation bar state


  return (
    <div className="custom-nav">
      <Navbar color="light" light expand="md">   {/*main navigation bar container*/}
        <NavbarBrand href="/" className="mr-auto"> 
          Movie App
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" /> 
        <Collapse isOpen={isOpen} navbar> 
          <Nav navbar>
            <NavItem> {/*navigation items. In this case, there is a single item represented by the NavItem component which is the logout link */}
              <NavLink href="/logout">Logout</NavLink> {/*renders a link labeled "Logout" and links to "/logout" URL. */}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNav;
