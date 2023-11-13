import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import joi from "joi"
import axios from 'axios'




export default function SignIn({ usedata }) {
    let [valdtionError, setVald] = useState([])
    let [apiError, setApiError] = useState(null)
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()

    let [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    async function sendData(e) {
        e.preventDefault();
        if (VAldData()) {
            setIsLoading(true)
            let { data } = await axios.post(`https://todo-puth.onrender.com/user/signin`, userData)
            console.log(data);
            if (data.message === "Done") {
                localStorage.setItem("token", data.token)
                usedata();
                setIsLoading(false)
                setApiError(null)
                navigate("/TodoList")
            } else {
                setApiError(data.message)
                setIsLoading(false)
            }
        }
    }





    function VAldData() {
        const schema = joi.object({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','lol'] } }).messages({
                "string.email": "Email must be a valid email",
                "string.empty": "Email Required!"
            }),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
                "string.pattern.base": "Password no match to pattern",
                "string.empty": "Password Required!"
            })
        })
        let res = schema.validate(userData, { abortEarly: false })
        if (res.error) {
            setVald(res.error.details)

            return false
        } else {
            return true
        }
    }

    function getData(e) {
        let current = { ...userData }
        current[e.target.name] = e.target.value
        setUserData(current)
    }
    return (
        <div className="d-flex justify-content-center backs ">
            <div className='bg rounded-2  text-center b mt-5 update-info position-absolute'>
                <div className="cards">
                    <div className="title pt-5">
                        <h2 >Sign In</h2>
                        <p >Dont have account yet? <Link to="/TodoList/SignUp" className=' text-decoration-none text-info'>Sign up</Link></p>
                        <hr />
                    </div>
                    <div className="body">
                        {apiError && <div className=' alert alert-info'>{apiError}</div>}
                        <form action="" onSubmit={sendData}>
                            <input type="email" onChange={getData} name='email' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='Email' />
                            <div className={valdtionError.filter(ele => ele.context.label === "email")[0] ? "alert alert-primary rounded-pill h-50 mt-4 w-50 mx-auto" : ""}>
                                {valdtionError.filter(ele => ele.context.label === "email")[0]?.message}
                            </div>
                            <input type="password" name="password" onChange={getData} className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light ' placeholder='Password' />
                            <div className={valdtionError.filter(ele => ele.context.label === "password")[0] ? "alert alert-primary rounded-pill mt-4 w-50 mx-auto" : ""}>
                                {valdtionError.filter(ele => ele.context.label === "password")[0]?.message}
                            </div>
                            <button className='btn-grad mx-auto border-0 rounded-pill'>{isLoading ? <i className='fa fa-spinner fa-spin '></i> : "Login"}</button>
                        </form>
                        <Link to="/TodoList/SendCode" className='list-unstyled badge text-bg-warning mb-2 text-decoration-none'>Forget Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
