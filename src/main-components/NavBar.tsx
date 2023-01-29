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
}



function NavBar({ openInstructionsModal, openSignInModal, handleLogout }:NavBarProps) {

  
  let navigate = useNavigate();

  const showHome = () => {
    navigate('/')
  }

  
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><Link className="navbar-brand" to='wordle'>Wordle</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Button cy-data="home-btn" onClick={showHome} variant='dark'>
              Home
             </Button>
            { 
            localStorage.getItem('name') === null ? 
            
            <Button cy-data="sign-in-btn" variant='dark' onClick={openSignInModal}>
              Sign in
            </Button>
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
      </Container>
    </Navbar>
  );
}

export default NavBar;