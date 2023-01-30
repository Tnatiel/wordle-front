import { useRef, useState } from 'react';
import { UserDetails } from 'wordle-components/wordle-logic';


export const useSignIn = (setLogout: React.Dispatch<React.SetStateAction<boolean>>) => {

    const formRef = useRef<HTMLFormElement>(null)
    const [errorMessage, setErrorMessage] = useState('');

    // const handleSignIn = () => {
    //     if (formRef.current) {
    //       const userData  = new FormData(formRef.current);
    //       const valuesObj = Array.from(userData.entries())
    //       .reduce((acc, [key, value]) => ({...acc, [key]: value}), {} as UserDetails);
    //       console.log('valuesObj: ', valuesObj)
    //       if(!valuesObj.email.length || ! valuesObj.password.length) {
    //         // setErrorMessage('Email and password required');
    //         return 'Email and password required'
    //       }
          
    //       validateUser(valuesObj).then( user => {
    //         console.log('validate fufiled res: ',user)
    //         if (user) {
              
    //           console.log('user.fname: ', user.fname)
    //           console.log('user: ', user)
    //           console.log('user.token: ', user.user_token)
    //           localStorage.setItem('name', user.fname);
    //           localStorage.setItem('user_token', user.user_token as string);
    //           setUserDetails(user);
    //           handleSignInClose();
    //           return user
    //         } else {
    //           return 'Incorrect password or email'
    //         }

    //       }).catch( e => {
    //         console.log(e);
            
    //       })
  
    //   }
    // }

    const handleSignIn = async () => {
      if (formRef.current) {
        const userData  = new FormData(formRef.current);
        const valuesObj = Array.from(userData.entries())
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {} as UserDetails);
        console.log('valuesObj: ', valuesObj)
        if(!valuesObj.email.length || ! valuesObj.password.length) {
          setErrorMessage('Email and password required')
          return
        }
        
        try {
          const user = await validateUser(valuesObj);
          if (user) {
            localStorage.setItem('name', user.fname);
            localStorage.setItem('user_token', user.user_token as string);
            localStorage.setItem('new', 'false');
            handleSignInClose();
            setErrorMessage('')
            setLogout(true)
            return user;
          } else {
            setErrorMessage('Incorrect password or email')
          }
        } catch (e) {
          console.log(e);
          setErrorMessage('Error occurred')
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

    const [showSignIn, setShowSignIn] = useState(false);
    const handleSignInClose = (): void => {
      setShowSignIn(false); 
      setErrorMessage('')
    }
    const handleSignInShow = (): void => setShowSignIn(true);

    const userName = localStorage.getItem('name') !== null ?
    localStorage.getItem('name') : 'Guest';


      return { errorMessage, userName,  handleSignIn, formRef, handleSignInShow, handleSignInClose, showSignIn }
}