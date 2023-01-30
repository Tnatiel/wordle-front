import { useRef, useState } from 'react';
import { UserDetails } from 'wordle-components/wordle-logic';


export const useSignIn = (setLogout: React.Dispatch<React.SetStateAction<boolean>>) => {

    const signInRef = useRef<HTMLFormElement>(null)
    const [signUpErrorMessage, setSignUpErrorMessage] = useState('');
    const [showSignIn, setShowSignIn] = useState(false);
    const handleSignInClose = (): void => {
      setShowSignIn(false); 
      setSignUpErrorMessage('')
    }
    const handleSignInShow = (): void => setShowSignIn(true);

    const handleSignIn = async () => {
      if (signInRef.current) {
        const userData  = new FormData(signInRef.current);
        const valuesObj = Array.from(userData.entries())
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {} as UserDetails);
        if(!valuesObj.email.length || ! valuesObj.password.length) {
          setSignUpErrorMessage('Email and password required')
          return
        }
        
        try {
          const user = await validateUser(valuesObj);
          if (user) {
            localStorage.setItem('name', user.fname);
            localStorage.setItem('user_token', user.user_token as string);
            localStorage.setItem('new', 'false');
            handleSignInClose();
            setSignUpErrorMessage('')
            setLogout(true)
            return user;
          } else {
            setSignUpErrorMessage('Incorrect password or email')
          }
        } catch (e) {
          console.log(e);
          setSignUpErrorMessage('Error occurred')
        }
      }
  }

    const validateUser = async (user: UserDetails) => {

      const res = await fetch('http://localhost:3333/user/sign-in' ,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({email: user.email, password: user.password}),
      });
      const data: UserDetails = await res.json();
      return data;
    }

      return { signUpErrorMessage, handleSignIn,  signInRef, handleSignInShow, handleSignInClose, showSignIn }
}