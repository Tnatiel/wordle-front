
import {useState, useEffect} from 'react'
import {InstructionsModal} from './main-components/InstructionsModal'
import './styles/App.scss';
import NavBar from './main-components/NavBar';
import SignInModal from './main-components/SignInModal';
import { Route, Routes } from 'react-router-dom';
import { WordleApp } from './pages/WordleApp';
import { HomePage } from './pages/HomePage';
import { useGreet } from './custom-hooks/useGreet';
function App() {

  useEffect(() => {
    localStorage.clear()
  })
  
  const {  formRef, addUserData } = useGreet()
  const [showInsructions, setShowInstructions] = useState(false);
  const handleInstructionsClose = (): void => setShowInstructions(false);
  const handleInstructionsShow = (): void => setShowInstructions(true);

  const [showSignIn, setShowSignIn] = useState(false);
  const handleSignInClose = (): void => setShowSignIn(false);
  const handleSignInShow = (): void => setShowSignIn(true);
  const userName = localStorage.getItem('name') !== null ?
  localStorage.getItem('name') : 'Guest'
  const handleSubmit = () => {
    addUserData();
    handleSignInClose()
  }
  
  return (
    <>
      <NavBar 
        openSignInModal={handleSignInShow} 
        openInstructionsModal={handleInstructionsShow}
      />
      <InstructionsModal 
        showInstructions={showInsructions} 
        closeModal={handleInstructionsClose}
      />
      <SignInModal 
        showSignIn={showSignIn} 
        closeSignInModal={handleSignInClose}
        handleSubmit={handleSubmit}
        formRef={formRef}
      />
      <Routes>
        <Route path='*'  element={<HomePage user={userName as string} />  } />
        <Route path='wordle'  element={<WordleApp />}  />
      </Routes>
    </>
  );
}

export default App;

// TODO delete user functionality
// TODO delete user functionality