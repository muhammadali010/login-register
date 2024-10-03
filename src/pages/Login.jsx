import React ,{ useRef } from 'react'
import {useNavigate} from 'react-router-dom'
function Login() {
    const usernameRef = useRef()
    const passwordRef = useRef()
    const formRef =useRef()
    const navigate = useNavigate()

    function handleLogin(event) {
        event.preventDefault()

        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value,
        }

        fetch('https://auth-rg69.onrender.com/api/auth/signin', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body : JSON.stringify(user)
        })
        .then(resp => resp.json())
        .then(data =>{
      if(data.message == "Invalid Password!"|| data.message == "User Not found."){
    alert(data.message)
    }  
    if (data.accessToken) {
        localStorage.setItem('token',data.accessToken);
        localStorage.setItem('user',JSON.stringify(data))
        navigate('/')
        formRef.current.reset()
    } 
    })
        .catch(err =>{
        console.log(err);
        })
    }
    return (
        <div>
            <form ref={formRef} className='flex w-1/3 flex-col gap-5 bg-slate-400 mx-auto p-4 rounded-md mt-2'>
                <input  className='p-2 rounded border' ref={usernameRef} type="text" placeholder='Enter username...' />
                <input  className='p-2 rounded border' ref={passwordRef} type="password" placeholder='Enter password...' />
                <button className='p-2 rounded border bg-blue-700 text-white'  onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}

export default Login