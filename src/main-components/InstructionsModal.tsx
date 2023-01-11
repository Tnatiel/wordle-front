
import Modal from 'react-bootstrap/Modal';


export function InstructionsModal({showInstructions: show, closeModal}: {showInstructions: boolean, closeModal: () => void}) {

  return (
    <>

      <Modal
        show={show}
        onHide={closeModal}
        backdrop="static"
        keyboard={true}
        
      >
        <Modal.Header closeButton>
          <Modal.Title>Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body >
        <h1>How to Play Wordle</h1>
        <h4>Guess the Word in 6 tries</h4>
        <p>Welcome to Wordle! In this game, your goal is to guess the correct 5-letter word-example in 6 tries. 
            Use the clues provided by the color of the tiles to help you guess correctly. 
            Here's how to play:
        </p>
        <ul className="instructions-list">
            <li>Each guess must be a valid 5-letter word</li>
            <li>The color of the tiles will change to show how close your guess was to the word-example</li>
        </ul>
        <h6>Examples</h6>
        <ul className="examples-list">
            <div className="examples">
                <li className='example-item'>
                    <div className="word-example">
                        <div className="example-ur-input correct">T</div>
                        <div className="example-ur-input">I</div>
                        <div className="example-ur-input">M</div>
                        <div className="example-ur-input">E</div>
                        <div className="example-ur-input">R</div>
                    </div>
                    <p><span className="the-letter">T</span> is in the word and in the correct spot</p>
                </li>
                <li className='example-item'>
                    <div className="word-example">
                        <div className="example-ur-input ">S</div>
                        <div className="example-ur-input">T</div>
                        <div className="example-ur-input present">A</div>
                        <div className="example-ur-input">M</div>
                        <div className="example-ur-input">P</div>
                    </div>
                    <p><span className="the-letter">A</span> is in the word but in the wrong spot</p>

                </li>
                <li className='example-item'>
                    <div className="word-example">
                        <div className="example-ur-input">T</div>
                        <div className="example-ur-input">R</div>
                        <div className="example-ur-input">I</div>
                        <div className="example-ur-input">C</div>
                        <div className="example-ur-input wrong">K</div>
                    </div>
                    <p><span className="the-letter">T</span> is not a word in the wordle</p>
                </li>
            
            </div>
        </ul>
        
        </Modal.Body>
        
      </Modal>
    </>
  );
}