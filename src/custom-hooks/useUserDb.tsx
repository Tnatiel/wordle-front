import {  useRef, useState} from 'react';
import { UserDetails, validateUserDetails } from 'wordle-components/wordle-logic';



const useUserDb = () => {

    const signUpRef = useRef<HTMLFormElement>(null)
    const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
    const [showSignUp, setShowSignUp] = useState(false);
    const handleSignUpClose = (): void => setShowSignUp(false);
    const handleSignUpShow = (): void => setShowSignUp(true);
    
    
    const addAndCloseModal = () => {
      if (signUpRef && signUpRef.current) {

        const userData  = new FormData(signUpRef.current);
        const valuesObj = Array.from(userData.entries())
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {} as UserDetails);
        const isValid = validateUserDetails(valuesObj)   
        if (typeof(isValid) === "string") {
          console.log(isValid);
          console.log(valuesObj);
          return 
        }
        addNewUser(valuesObj);
        handleSignUpClose();
        setUserDetails(valuesObj)
        // return valuesObj;
        }
      }
    

    const addNewUser = async (user: UserDetails) => {

      const res = await fetch('http://localhost:3333/user/sign-up' ,{
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({...user}),
      });
      const data: UserDetails = await res.json() 
      localStorage.setItem('name', data.fname)
    }
    // const validateUser = async (user: UserDetails) => {

    //   const res = await fetch('http://localhost:3333/user/sign-up' ,{
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json'
    //     },
    //     body: JSON.stringify({email: user.email, password: user.password}),
    //   });
    //   const data: UserDetails = await res.json() 
    //   localStorage.setItem('name', data.fname)
    //   setUserDetails(data)
    // }

    return { signUpRef,   addAndCloseModal,  showSignUp, handleSignUpClose, handleSignUpShow}

  }


export default useUserDb;