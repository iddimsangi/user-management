import React,{ useState, useEffect } from 'react'
import {types} from "../context/types-actions"
import {useUsersDispatch, useUsersState} from "../context/users"
import {useNavigate} from "react-router-dom"

const Register = () => {
    const [formData, setformData] = useState({
        id: "",
        firsName: "",
        lastName: "",
        email: "",
        password: "",
        active: true,
        role: null
    })
    const dispatch = useUsersDispatch()
    const {user, message} = useUsersState()
    const navigate = useNavigate()
    const {REGISTER}= types
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
            type: REGISTER,
            payload: {
                ...formData,
                id: new Date().getTime()
            }
        })
    }
    useEffect(() => {
        if(user) navigate("/")
    }, [user])
    return (
        <form onSubmit={onSubmithandler}>
        <h1>SIGN UP</h1>
        <div className="icon">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="formcontainer">
        <div className="container">
        <label for="mail"><strong>First Name</strong></label>
          <input type="text"  onChange={onChangeHandler}  placeholder="Enter Your First Name" name="firstName" required/>
          <label for="mail"><strong>Last Name</strong></label>
          <input type="text"  onChange={onChangeHandler}  placeholder="Enter Your Last Name" name="lastName" required/>
          <label for="mail"><strong>E-mail</strong></label>
          <input type="text"  onChange={onChangeHandler}  placeholder="Enter E-mail" name="email" required/>
          <label for="psw"><strong>Password</strong></label>
          <input type="password" onChange={onChangeHandler} placeholder="Enter Password" name="password" required/>
        </div>
        {message&& <p style={{color:'red'}}>{message}</p>}
        <button type="submit"><strong>SIGN UP</strong></button>
        </div>
      </form>
    // <form onSubmit={onSubmithandler}>
    //     <input type="text" name="firstName" onChange={onChangeHandler} placeholder="Enter your first name"/>
    //     <input type="text" name="lastName" onChange={onChangeHandler} placeholder="Enter your last name"/>
    //     <input type="email" name="email" onChange={onChangeHandler} placeholder="Enter your email"/>
    //     <input type="password" name="password" onChange={onChangeHandler} placeholder="Enter your paword"/>
    //     {message&& <p>{message}</p>}
    //     <button>Register</button>
    // </form>
    )
}

export default Register
