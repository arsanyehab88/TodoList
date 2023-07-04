import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UpdateIndo({ use }) {
  let [apiError, setApiError] = useState(null)
  let [isLoading, setIsLoading] = useState(false)
  let [DataUser, setData] = useState()
  let token = `Bearer ${localStorage.getItem('token')}`

  let [userData, setUserData] = useState({
    name: DataUser?.name,
    age: DataUser?.age
  })



  async function sendData(e) {
    e.preventDefault();
    setIsLoading(true)
    let { data } = await axios.put(`https://todo-puth.onrender.com/user/updateUser`, userData, {
      headers: {
        Authorization: token
      }
    })
    if (data.message === "Done") {
      setIsLoading(false)
      GetUserData()
      setApiError(data.message)
    } else {
      setApiError(data.message)
      setIsLoading(false)
    }
  }


  async function GetUserData() {
    let { data } = await axios.post(`https://todo-puth.onrender.com/user/getUser`, userData, {
      headers: {
        Authorization: token
      }
    })
    if (data.message === "Done") {
      setData(data.user)
      
    }
    console.log(DataUser);
  }
  
  useEffect(() => {
    GetUserData()
  }, [])
  

  function getData(e) {
    let current = { ...userData }
    current[e.target.name] = e.target.value
    setUserData(current)
  }
  return (
    <div className="d-flex justify-content-center backs ">
      <div className='bg rounded-2 update-info text-center b mt-5  position-absolute'>
        <div className="cards">
          <div className="title pt-5">
            <h5 className='update' >Update Information</h5>
            <hr />
          </div>
          <h6 className='text-info'>Name : <span className=' text-dark'>{DataUser?.name }</span></h6>
          <h6 className='text-info'>age : <span className=' text-dark'>{DataUser?.age }</span></h6>
          <div className="body">
            {apiError && <div className=' alert alert-info'>{apiError}</div>}
            <form action="" onSubmit={sendData}>
              <input type="text" onChange={getData} name='name' className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light' placeholder='Name' />
              <input type="number" name="age" onChange={getData} className='mb-5 form-control rounded-pill w-50 border-0 mx-auto bg-light ' placeholder='Age' />
              <button className='btn-grad mx-auto border-0 rounded-pill'>{isLoading ? <i className='fa fa-spinner fa-spin '></i> : "Update"}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
