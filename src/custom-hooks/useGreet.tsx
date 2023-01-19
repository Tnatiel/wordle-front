import { useRef, useState } from 'react';


export const useGreet = () => {

    const formRef = useRef<HTMLFormElement>(null)
    const [logout, setLogout] = useState(false);
    const addUserData = () => {
        if (formRef.current) {
          const userData  = new FormData(formRef.current);
          const valuesObj = Object.fromEntries(userData.entries())
          localStorage.setItem('name', valuesObj.name.toString())
          localStorage.setItem('email', valuesObj.email.toString())
          console.log('local storage: ', localStorage)
          setLogout(false);
      }
    }
    
    const logoutUser = () => {
      localStorage.clear();
      setLogout(true)
    }

    const handleSubmit = () => {
      addUserData();
      handleSignInClose()
    }

    const [showSignIn, setShowSignIn] = useState(false);
    const handleSignInClose = (): void => setShowSignIn(false);
    const handleSignInShow = (): void => setShowSignIn(true);

    const userName = localStorage.getItem('name') !== null ?
  localStorage.getItem('name') : 'Guest';


      return { userName, handleSubmit, formRef,  logoutUser, handleSignInShow, handleSignInClose, showSignIn }
}