import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UserDetails } from 'wordle-components/wordle-logic';
import { useState } from 'react';
interface SignInModalProps {
  showSignIn: boolean, 
  closeSignInModal: () => void, 
  handleSubmit:   () => Promise<UserDetails | "Email and password required" | "Incorrect password or email" | "Error occurred" | undefined>, 
  formRef: React.RefObject<HTMLFormElement> ,
  errorMessage?: string,
}


const SignInModal =({ errorMessage,  showSignIn, closeSignInModal, handleSubmit, formRef }: SignInModalProps) => {

  return (
    <>
    
        <Modal
            show={showSignIn}
            onHide={closeSignInModal}
            backdrop="static"
            keyboard={true}
        >
      
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <Form ref={formRef} >

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
            <Button onClick={handleSubmit} variant="primary" type="submit">
                Sign in
            </Button>
        </Modal.Footer>
      
      </Modal>
    </>
    
  );
}

export default SignInModal;