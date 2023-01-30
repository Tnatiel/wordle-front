import {  useRef, useState} from 'react';
import { UserDetails, validateUserDetails } from 'wordle-components/wordle-logic';



const useUserDb = (setLogout: React.Dispatch<React.SetStateAction<boolean>>) => {

    const registerRef = useRef<HTMLFormElement>(null);
    const [registerErrorMessage, setRegisterErrorMessage] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const handleRegisterClose = (): void => {
      setShowRegister(false);
      setRegisterErrorMessage('');
    }
    const handleRegisterShow = (): void => setShowRegister(true);
    
    const handleRegister = async () => {

      if (registerRef && registerRef.current) {
        const userData  = new FormData(registerRef.current);
        const valuesObj = Array.from(userData.entries())
        .reduce((acc, [key, value]) => ({...acc, [key]: value}), {} as UserDetails);
        const isValid = validateUserDetails(valuesObj)   ;
        if (typeof(isValid) === "string") {
          console.log(isValid);
          setRegisterErrorMessage(isValid);
          return 
        }
        try {
          const user = await addNewUser(valuesObj);
          if (user.userCreated !== false) {
            localStorage.setItem('name', user.fname);
            localStorage.setItem('user_token', user.user_token as string);
            localStorage.setItem('new', 'true');
            handleRegisterClose();
            setRegisterErrorMessage('')
            setLogout(true)
            return user;
          } else {
            setRegisterErrorMessage('Server couldn\'t add new user')
          }
        } catch (e) {
          console.log(e);
          setRegisterErrorMessage('Error occurred')
        }

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
      const data = await res.json() ;
      return data

    }

    return { registerErrorMessage,  registerRef,   handleRegister,  showRegister, handleSignUpClose: handleRegisterClose, handleRegisterShow}

  }


export default useUserDb;