import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setWinDialog } from '../../redux/features/DialogState';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';


export const WinDialog = () => {
    
const dispatch = useAppDispatch()
const show = useAppSelector(state => state.dialog.winDialog)

  return (
    <>
      <Modal show={show} onHide={() => dispatch(setWinDialog(false))}>
        <Modal.Body >
            <h3>You Guessed The Wordle!</h3>
            <h1>🎉 Congrats!! 🎉</h1>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={() => dispatch(setWinDialog(false))}>
            Yay!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}