import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {BsInfoCircle} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';


interface NavBarProps {
  openInstructionsModal: () => void,
  openSignInModal: () => void,
  handleLogout: () => void,
  openRegisterModal: () => void,
  showLogout: boolean,
  
}



function NavBar({ showLogout, openRegisterModal, openInstructionsModal, openSignInModal, handleLogout }:NavBarProps) {

  let navigate = useNavigate();

  const showHome = () => {
    navigate('/')
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand><Link cy-data="wordle-btn" className="navbar-brand" to='wordle'>Wordle</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Button cy-data="home-btn" onClick={showHome} variant='dark'>
              Home
             </Button>
            { 
            !showLogout ? 
            <>
            <Button cy-data="sign-in-btn" variant='dark' onClick={openSignInModal}>
              Sign in
            </Button>
            <Button cy-data="reg-btn" variant='dark' onClick={openRegisterModal}>
              Register
            </Button>
            </>
            :
              <Button cy-data="sign-out-btn" variant='dark' onClick={handleLogout}>
                Logout 
              </Button> 
            }
          </Nav>
          <Nav>
            <Button cy-data="inst-btn" onClick={openInstructionsModal} variant='dark'>
              <BsInfoCircle />
            </Button>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;