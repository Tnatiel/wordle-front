
import { useState, useEffect, useRef } from 'react'
import {InstructionsModal} from './main-components/InstructionsModal'
import './styles/App.scss';
import NavBar from './main-components/NavBar';
import SignInModal from './main-components/SignInModal';
import { Route, Routes } from 'react-router-dom';
import { WordleApp } from './pages/WordleApp';
import { HomePage } from './pages/HomePage';
import { useSignIn } from './custom-hooks/useSignIn';
import SignUpModal from 'main-components/SignUpModal';
import useUserDb from 'custom-hooks/useUserDb';
import { UserDetails, validateUserDetails } from 'wordle-components/wordle-logic';
;
function App() {

  useEffect(() => {
    localStorage.clear()
  }, [])

  
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
  const [logout, setLogout] = useState(false);
  const { formRef, handleSignIn, handleSignInClose, handleSignInShow, showSignIn } = useSignIn(setUserDetails);
  const {handleSignUpClose, handleSignUpShow, showSignUp, signUpRef, addAndCloseModal } = useUserDb();
  // const handleSignUpUser = () => {
  //   const newUser = addAndCloseModal();
  //   setUserDetails(newUser);
  //   console.log(newUser)
  // }
  
  const logoutUser = () => {
    localStorage.clear();
    setLogout(true)
  }
 
  const [showInsructions, setShowInstructions] = useState(false);
  const handleInstructionsClose = (): void => setShowInstructions(false);
  const handleInstructionsShow = (): void => setShowInstructions(true);

  const userName = localStorage.getItem('name') !== null ?
    localStorage.getItem('name') : 'Guest';
  
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
        handleSubmit={handleSignIn}
        formRef={formRef}
      />
      <SignUpModal 
        closeSignUpModal={handleSignUpClose}
        signUpRef={signUpRef}
        handleSubmit={addAndCloseModal}
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