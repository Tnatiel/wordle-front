import { useRef } from 'react';


export const useGreet = () => {

    const formRef = useRef<HTMLFormElement>(null)

    const addUserData = () => {
        if (formRef.current) {
          const userData  = new FormData(formRef.current);
          const valuesObj = Object.fromEntries(userData.entries())
          localStorage.setItem('name', valuesObj.name.toString())
          localStorage.setItem('email', valuesObj.email.toString())
          console.log('local storage: ', localStorage)
    }
      }
    
      const deleteUser = () => localStorage.clear()

      return {  formRef, addUserData, deleteUser }
}