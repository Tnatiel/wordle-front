
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


interface SignUpModalProps {
    showRegister: boolean, 
    closeSignUpModal: () => void, 
    handleSubmit: () => void,
    registerRef: React.RefObject<HTMLFormElement>,
    errorMessage?: string,

    
  }
  


const RegisterModal =({ errorMessage, registerRef, showRegister, closeSignUpModal, handleSubmit }: SignUpModalProps) => {

    return (
      <>
      
          <Modal
              show={showRegister}
              onHide={closeSignUpModal}
              backdrop="static"
              keyboard={true}
          >
        
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
  
              <Form ref={registerRef} >

                <Form.Group  className="mb-3" controlId="formBasicFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name='fname' type="text" placeholder="Enter first name" required={false}/>
                    <Form.Text className="text-muted">
                        We'll never share your name with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group  className="mb-3" controlId="formBasicLName">
                    <Form.Label >Last Name</Form.Label>
                    <Form.Control name='lname' type="text" placeholder="Enter last name" required/>
                    <Form.Text className="text-muted">
                        We'll never share your name with anyone else.
                    </Form.Text>
                </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label id="label1">Email address</Form.Label>
                      <Form.Control name='email' type="email" placeholder="Enter email" required/>
                      <Form.Text className="text-muted">
                          We'll never share your email with anyone else.
                      </Form.Text>
                   </Form.Group>
                  <Form.Group  className="mb-3" controlId="formBasicPassword">
                      <Form.Label id="label2">Password</Form.Label>
                      <Form.Control name='password' type="password" placeholder="Enter password" required/>
                      <Form.Text className="text-muted">
                          We'll never share your password with anyone else.
                      </Form.Text>
                   </Form.Group>
                   {errorMessage && <Form.Text className="text-danger">{errorMessage}</Form.Text>}
              </Form>
  
          </Modal.Body>
  
          <Modal.Footer>
              <Button onClick={handleSubmit} type="submit" variant="primary" >
                  Sign up
              </Button>
          </Modal.Footer>
        
        </Modal>
      </>
      
    );
  }
  
  export default RegisterModal;