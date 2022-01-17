import React,{ useState, useEffect } from 'react'
import {types} from "../context/types-actions"
import {useUsersDispatch, useUsersState} from "../context/users"
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [formData, setformData] = useState({
        email:"",
        password:""
    })
    const dispatch = useUsersDispatch()
    const {user, message} = useUsersState()
    const navigate = useNavigate()
    const {LOGIN} = types
    const onChangeHandler = (e) =>{
        const{name, value} = e.target
        setformData({
            ...formData,
            [name]: value
        })
    }
    const onSubmithandler = (e) => {
        e.preventDefault()
        dispatch({
            type: LOGIN,
            payload: formData
        })
    }
    useEffect(() => {
        if(user) navigate("/")
    }, [user])
    return (
        <form onSubmit={onSubmithandler}>
        <h1>LOGIN</h1>
        <div className="icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="formcontainer">
        <div className="container">
          <label for="mail"><strong>E-mail</strong></label>
          <input type="text"  onChange={onChangeHandler}  placeholder="Enter E-mail" name="mail" required/>
          <label for="psw"><strong>Password</strong></label>
          <input type="password" onChange={onChangeHandler} placeholder="Enter Password" name="psw" required/>
        </div>
        {message&& <p style={{color:'red'}}>{message}</p>}
        <button type="submit"><strong>LOGIN</strong></button>
        </div>
      </form>

    // <form onSubmit={onSubmithandler}>
    //     <input type="email" name="email" onChange={onChangeHandler} placeholder="Enter your email"/>
    //     <input type="password" name="password" onChange={onChangeHandler} placeholder="Enter your paword"/>
    //     {message&& <p>{message}</p>}
    //     <button>Login</button>
    // </form>
    )
}

export default Login
