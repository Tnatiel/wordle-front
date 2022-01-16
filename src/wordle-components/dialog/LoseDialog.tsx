import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { setFailure } from '../../redux/features/GameState';


export const LoseDialog = () => {

    const dispatch = useAppDispatch()
    const show = useAppSelector(state => state.game.lose)

  return (
    <>

      <Modal show={show} onHide={() =>dispatch(setFailure(false))}>
        <Modal.Body >
            <h3>TOO BAD..</h3>
            <h1> You Missed That one 🤓</h1>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={() => dispatch(setFailure(false))}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
