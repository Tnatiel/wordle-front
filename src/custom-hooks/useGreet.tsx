import {useState, useRef } from 'react'


export const useGreet = () => {

    const [greet, setGreet] = useState('Guest');
    const formRef = useRef<HTMLFormElement>(null)

    const getUserData = () => {
        if (formRef.current) {
          const userData  = new FormData(formRef.current);
          const valuesObj = Object.fromEntries(userData.entries())
          localStorage.setItem('name', valuesObj.name.toString())
          localStorage.setItem('email', valuesObj.email.toString())
          console.log('local storage: ', localStorage)
          setGreet(localStorage.getItem('name')!)
        //   console.log(greet)
        }
      }

      return { greet, formRef, getUserData}
}