import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import joi, { func } from "joi"
import axios from 'axios'


export default function SignUp() {
  let [valdtionError, setVald] = useState([])
  let [apiError, setApiError] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()

  let [userData, setUserData] = useState({
    name: "",
    repeat_password: "",
    age: 0,
    email: "",
    password: ""
  })
  function VAldData() {
    const schema = joi.object({
      name: joi.string().min(3).max(15).required().messages({
        "string.min": "first Name length must be at least 3 characters long",
        "string.empty": "First Name Required!",
        "string.max": "first Name length must be less than or equal to 15 characters long"
      }),
      age: joi.number().min(17).required().messages({
        "number.min": "you must be 17+",
        "number.empty": "Age Required!"
      }),
      email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'lol'] } }).messages({
        "string.email": "Email must be a valid email",
        "string.empty": "Email Required!"
      }),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
        "string.pattern.base": "Password no match to pattern",
        "string.empty": "Password Required!"
      }),
      repeat_password: joi.ref("password")
    })
    let res = schema.validate(userData, { abortEarly: false })
    if (res.error) {
      setVald(res.error.details)

      return false
    } else {
      return true
    }
  }

  async function sendData(e) {
    e.preventDefault();
    if (VAldData()) {
      setIsLoading(true)
      let { data } = await axios.post(`https://todo-puth.onrender.com/user/signup`, userData)
      console.log(data);
      if (data.message === "Done") {
        setIsLoading(false)
        setApiError(null)
        navigate("/TodoList/signIn")
      } else {
        setApiError(data.message)
        setIsLoading(false)
      }
    }
  }





  function getData(e) {
    let current = { ...userData }
    current[e.target.name] = e.target.value
    setUserData(current)
  }
  return (
    <div className="d-flex justify-content-center ">
      <div className=' bg  rounded-2 border text-center border-1 mt-5 update-info position-absolute '>
        <div className="cards">
          <div className="title pt-5">
            <h2 className=''>Sign Up</h2>
            <p className=''>you already have account? <Link to="/Todo/signIn" className=' text-decoration-none text-info'>Sign In</Link> </p>
            <hr />
          </div>
          <div className="body">
            {apiError && <div className='alert alert-info w-25 mx-auto'>{apiError}</div>}
            <form action="" onSubmit={sendData}>
              <input onChange={getData} type="text" name='name' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='First Name' />
              <div className={valdtionError.filter(ele => ele.context.label === "name")[0] ? "alert alert-info mt-4 w-50 rounded-pill mx-auto" : ""}>
                {valdtionError.filter(ele => ele.context.label === "name")[0]?.message}
              </div>
              <input onChange={getData} type="email" name='email' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='Email' />
              <div className={valdtionError.filter(ele => ele.context.label === "email")[0] ? "alert alert-info mt-4 w-50 rounded-pill mx-auto" : ""}>
                {valdtionError.filter(ele => ele.context.label === "email")[0]?.message}
              </div>
              <input onChange={getData} type="number" name='age' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='Age' />
              <div className={valdtionError.filter(ele => ele.context.label === "age")[0] ? "alert alert-info mt-4 w-50 rounded-pill mx-auto" : ""}>
                {valdtionError.filter(ele => ele.context.label === "age")[0]?.message}
              </div>
              <input onChange={getData} type="password" name='password' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='Password' />
              <div className={valdtionError.filter(ele => ele.context.label === "password")[0] ? "alert alert-info mt-4 w-50 rounded-pill mx-auto" : ""}>
                {valdtionError.filter(ele => ele.context.label === "password")[0]?.message}
              </div>
              <input onChange={getData} type="password" name='repeat_password' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='Re Password' />
              <div className={valdtionError.filter(ele => ele.context.label === "repeat_password")[0] ? "alert alert-info mt-4 w-50 rounded-pill mx-auto" : ""}>
                {valdtionError.filter(ele => ele.context.label === "repeat_password")[0]?.message}
              </div>
              <button className='btn-grad mx-auto border-0 rounded-pill'>{isLoading ? <i className='fa fa-spinner fa-spin '></i> : "Sign Up"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>


  )
}
