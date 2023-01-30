import { access } from 'fs';
import { useRef, useState } from 'react';
import { UserDetails } from 'wordle-components/wordle-logic';


export const useSignIn = (setUserDetails: React.Dispatch<React.SetStateAction<UserDetails | undefined>>) => {

    const formRef = useRef<HTMLFormElement>(null)

    const handleSignIn = () => {
        if (formRef.current) {
          const userData  = new FormData(formRef.current);
          const valuesObj = Array.from(userData.entries())
          .reduce((acc, [key, value]) => ({...acc, [key]: value}), {} as UserDetails);
          console.log('valuesObj: ', valuesObj)
          const isValid =  validateUser(valuesObj)
          console.log('isValid: ', isValid)
          validateUser(valuesObj).then( user => {
            if (user) {
              console.log('user.fname: ', user.fname)
              console.log('user: ', user)
              console.log('user.token: ', user.user_token)
              localStorage.setItem('name', user.fname);
              localStorage.setItem('user_token', user.user_token as string);
              setUserDetails(user);
              handleSignInClose();
            }

          }).catch( e => {
            console.log(e);
            
          })
  
          return valuesObj
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
      // localStorage.setItem('name', data.fname);
      return data;
    }

    const [showSignIn, setShowSignIn] = useState(false);
    const handleSignInClose = (): void => setShowSignIn(false);
    const handleSignInShow = (): void => setShowSignIn(true);

    const userName = localStorage.getItem('name') !== null ?
    localStorage.getItem('name') : 'Guest';


      return { userName,  handleSignIn, formRef, handleSignInShow, handleSignInClose, showSignIn }
}