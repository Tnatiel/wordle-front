import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {BsInfoCircle} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function NavBar({ openInstructionsModal, openSignInModal,  }: { openInstructionsModal: () => void, openSignInModal: () => void}) {

  useEffect(() => {

  },[openSignInModal])


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
            <Button onClick={showHome} variant='dark'>
              Home
             </Button>
            { 
            localStorage.getItem('name') === null ? 
            
            <Button variant='dark' onClick={openSignInModal}>
              Sign in
            </Button>
            :
              <Button variant='dark' onClick={() => {localStorage.clear(); console.log(localStorage)}}>
                Logout 
              </Button> //FIXME logout button won't render the and user stays loged till page switched
            }
          </Nav>
          <Nav>
            <Button onClick={openInstructionsModal} variant='dark'>
              <BsInfoCircle />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;