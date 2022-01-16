import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { setSuccess } from '../../redux/features/GameState';


export const WinDialog = () => {
    
const dispatch = useAppDispatch()
const show = useAppSelector(state => state.game.win)

  return (
    <>
      <Modal show={show} onHide={() => dispatch(setSuccess(false))}>
        <Modal.Body >
            <h3>You Guessed The Wordle!</h3>
            <h1>🎉 Congrats!! 🎉</h1>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={() => dispatch(setSuccess(false))}>
            Yay!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}