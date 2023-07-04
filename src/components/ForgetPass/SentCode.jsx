import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import joi from "joi"
import axios from 'axios'



export default function SentCode() {
    let [valdtionError, setVald] = useState([])
    let [apiError, setApiError] = useState(null)
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    let token = `Bearer ${localStorage.getItem('token')}`

    let [userData, setUserData] = useState({ email: "" })
    async function sendData(e) {
        e.preventDefault();
        if (VAldData()) {
            setIsLoading(true)
            let { data } = await axios.post(`https://todo-puth.onrender.com/user/ForgetPassword`, userData)
            console.log(data);
            if (data.message === "Go To Mail To Reset") {
                setIsLoading(false)
                setApiError(null)
                navigate("/TodoList/ForgetPassword")
            } else {
                setApiError(data.message)
                setIsLoading(false)
            }
        }
    }


    function VAldData() {
        const schema = joi.object({
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'lol'] } }).messages({
                "string.email": "Email must be a valid email",
                "string.empty": "Email Required!"
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
                        <h5 className='update'>Send Code</h5>
                        <hr />
                    </div>
                    <div className="body">
                        {apiError && <div className=' alert alert-info'>{apiError}</div>}
                        <form action="" onSubmit={sendData}>
                            <input type="email" onChange={getData} name='email' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='Email' />
                            <div className={valdtionError.filter(ele => ele.context.label === "email")[0] ? "alert alert-primary rounded-pill h-50 mt-4 w-75 mx-auto" : ""}>
                                {valdtionError.filter(ele => ele.context.label === "email")[0]?.message}
                            </div>
                            <button className='btn-grad mx-auto border-0'>{isLoading ? <i className='fa fa-spinner fa-spin '></i> : "Update"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
