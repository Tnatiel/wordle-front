import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {BsInfoCircle} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ openInstructionsModal, openSignInModal }: { openInstructionsModal: () => void, openSignInModal: () => void}) {

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
            <Button variant='dark' onClick={openSignInModal}>
              Sign in
            </Button>
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