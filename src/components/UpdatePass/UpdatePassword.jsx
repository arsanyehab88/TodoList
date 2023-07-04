import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import joi from "joi"
import axios from 'axios'

export default function UpdatePassword() {
    let [valdtionError, setVald] = useState([])
    let [apiError, setApiError] = useState(null)
    let [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()
    let token = `Bearer ${localStorage.getItem('token')}`

    let [userData, setUserData] = useState({
        newPassword: "",
        ConfirmPassword: ""
    })

    async function sendData(e) {
        e.preventDefault();
        if (VAldData()) {
            setIsLoading(true)
            let { data } = await axios.put(`https://todo-puth.onrender.com/user/updatePassword`, userData, {
                headers: {
                    Authorization: token
                }
            })
            if (data.message === "Done") {
                setIsLoading(false)
                setApiError(data.message)
                navigate("/TodoList")
            } else {
                setApiError(data.message)

                setIsLoading(false)
            }
        }
    }



    function VAldData() {
        const schema = joi.object({
            newPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
                "string.pattern.base": "Password no match to pattern",
                "string.empty": "Password Required!"
            }),
            ConfirmPassword: joi.ref("newPassword")

        })
        let res = schema.validate(userData, { abortEarly: false })
        if (res.error) {
            setVald(res.error.details)
            console.log(res.error.details);
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
                        <h5 className='update'>Update Password</h5 >

                        <hr />
                    </div>
                    <div className="body">
                        {apiError && <div className=' alert alert-info'>{apiError}</div>}
                        <form action="" onSubmit={sendData}>
                            <input type="password" onChange={getData} name='newPassword' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='New Password' />
                            <div className={valdtionError.filter(ele => ele.context.label === "newPassword")[0] ? "alert alert-primary rounded-pill h-50 mt-4 w-75 mx-auto" : ""}>
                                {valdtionError.filter(ele => ele.context.label === "newPassword")[0]?.message}
                            </div>
                            <input type="password" name="ConfirmPassword" onChange={getData} className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light ' placeholder='Confirm Password' />
                            <div className={valdtionError.filter(ele => ele.context.label === "ConfirmPassword")[0] ? "alert alert-primary rounded-pill mt-4 w-75 mx-auto" : ""}>
                                {valdtionError.filter(ele => ele.context.label === "ConfirmPassword")[0]?.message}
                            </div>
                            <button className='btn-grad mx-auto border-0 rounded-pill'>{isLoading ? <i className='fa fa-spinner fa-spin '></i> : "Update"}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
