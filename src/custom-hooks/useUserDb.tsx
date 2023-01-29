import { useRef, useState} from 'react';







const useUserDb = () => {

    const signUpFormRef = useRef<HTMLFormElement>(null)

    const [showSignUp, setShowSignUp] = useState(false);
    const handleSignUpClose = (): void => setShowSignUp(false);
    const handleSignUpShow = (): void => setShowSignUp(true);

    const getUserDetails = () => {
        if (signUpFormRef.current) {
          const userData  = new FormData(signUpFormRef.current);
          const valuesObj = Object.fromEntries(userData.entries());
          return valuesObj;
      }
    }
    const handleSignUpSubmit = () => {
      getUserDetails();
      handleSignUpClose()
    }





    return {signUpFormRef, showSignUp, handleSignUpClose, handleSignUpShow, handleSignUpSubmit}

}


export default useUserDb;