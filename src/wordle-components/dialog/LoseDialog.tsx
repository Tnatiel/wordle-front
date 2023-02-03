import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { setLoseDialog } from '../../redux/features/DialogState';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';


export const LoseDialog = () => {

    const dispatch = useAppDispatch();
    const show = useAppSelector(state => state.dialog.loseDialog);

  return (
    <>

      <Modal show={show} onHide={() =>dispatch(setLoseDialog(false))}>
        <Modal.Body >
            <h3>TOO BAD..</h3>
            <h1> You Missed That one 🤓</h1>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="primary" onClick={() => dispatch(setLoseDialog(false))}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
