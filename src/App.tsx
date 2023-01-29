
import {useState, useEffect} from 'react'
import {InstructionsModal} from './main-components/InstructionsModal'
import './styles/App.scss';
import NavBar from './main-components/NavBar';
import SignInModal from './main-components/SignInModal';
import { Route, Routes } from 'react-router-dom';
import { WordleApp } from './pages/WordleApp';
import { HomePage } from './pages/HomePage';
import { useGreet } from './custom-hooks/useGreet';
import SignUpModal from 'main-components/SignUpModal';
import useUserDb from 'custom-hooks/useUserDb';
function App() {

  useEffect(() => {
    localStorage.clear()
  }, [])
  
  const { userName, formRef, handleSubmit,  logoutUser, handleSignInClose, handleSignInShow, showSignIn } = useGreet();
  const { signUpFormRef, handleSignUpSubmit, handleSignUpClose, handleSignUpShow, showSignUp } = useUserDb()
  const [showInsructions, setShowInstructions] = useState(false);
  const handleInstructionsClose = (): void => setShowInstructions(false);
  const handleInstructionsShow = (): void => setShowInstructions(true);
  
  return (
    <>
      <NavBar 
        openSignInModal={handleSignInShow} 
        openInstructionsModal={handleInstructionsShow}
        handleLogout={logoutUser}
        openSignUpModal={handleSignUpShow}
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
      <SignUpModal 
        closeSignUpModal={handleSignUpClose}
        formRef={signUpFormRef}
        handleSubmit={handleSignUpSubmit}
        showSignUp={showSignUp}
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