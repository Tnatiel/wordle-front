
import { useState, useEffect, useRef } from 'react'
import {InstructionsModal} from './main-components/InstructionsModal'
import './styles/App.scss';
import NavBar from './main-components/NavBar';
import SignInModal from './main-components/SignInModal';
import { Route, Routes } from 'react-router-dom';
import { WordleApp } from './pages/WordleApp';
import { HomePage } from './pages/HomePage';
import { useSignIn } from './custom-hooks/useSignIn';
import RegisterModal from 'main-components/RegisterModal';
import useUserDb from 'custom-hooks/useRegister';

function App() {

  
  
  const [logout, setLogout] = useState(false);
  const { signUpErrorMessage, signInRef, handleSignIn, handleSignInClose, handleSignInShow, showSignIn } = useSignIn(setLogout);
  const { registerErrorMessage, handleSignUpClose, handleRegisterShow, showRegister, registerRef, handleRegister } = useUserDb(setLogout);

  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
    });
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.clear();
      });
    };
  }, []);


  const logoutUser = () => {
    localStorage.clear();
    setLogout(false)
  }
 
  const [showInsructions, setShowInstructions] = useState(false);
  const handleInstructionsClose = (): void => setShowInstructions(false);
  const handleInstructionsShow = (): void => setShowInstructions(true);

  const homeGreet = localStorage.getItem('name') !== null 
  ? localStorage.getItem('new') === 'true' 
  ? `Welcome ${localStorage.getItem('name')}!`
  : `Welcome Back ${localStorage.getItem('name')}!` : 'Welcome Guest';

  
  return (
    <>
      <NavBar 
        openSignInModal={handleSignInShow} 
        openInstructionsModal={handleInstructionsShow}
        handleLogout={logoutUser}
        openSignUpModal={handleRegisterShow}
        showLogout={logout}
      />
      <InstructionsModal 
        showInstructions={showInsructions} 
        closeModal={handleInstructionsClose}
      />
      <SignInModal 
        showSignIn={showSignIn} 
        closeSignInModal={handleSignInClose}
        handleSubmit={handleSignIn}
        formRef={signInRef}
        errorMessage={signUpErrorMessage}
      />
      <RegisterModal 
        closeSignUpModal={handleSignUpClose}
        registerRef={registerRef}
        handleSubmit={handleRegister}
        showRegister={showRegister}
        errorMessage={registerErrorMessage}
        
        
      />
      <Routes>
        <Route path='*'  element={<HomePage greet={homeGreet as string} />  } />
        <Route path='wordle'  element={<WordleApp />}  />
      </Routes>
    </>
  );
}

export default App;
