import React ,{ useRef } from 'react'
import {useNavigate} from 'react-router-dom'

function Register() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const emailRef = useRef()
    const formRef = useRef()
    const navigate = useNavigate()

    function handleRegister(event) {
        event.preventDefault()

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
            email: emailRef.current.value, 
        }

        fetch('https://auth-rg69.onrender.com/api/auth/signup', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data => {
            if (data.message === "User registered successfully!") {
                navigate('/login')
                formRef.current.reset() 
            }  
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div>
            <form ref={formRef} className='flex w-1/3 flex-col gap-5 bg-slate-400 mx-auto p-4 rounded-md mt-2'>
                <input className='p-2 rounded border' ref={usernameRef} type="text" placeholder='Enter username...' />
                <input className='p-2 rounded border' ref={emailRef} type="text" placeholder='Enter email...' />
                <input className='p-2 rounded border' ref={passwordRef} type="password" placeholder='Enter password...' />
                <button className='p-2 rounded border bg-blue-700 text-white' onClick={handleRegister}>Register</button>
            </form>
        </div>
    )
}

export default Register;
