import axios from 'axios'
import React, { useEffect, useState } from 'react'



export default function Home({ use }) {
  let [item, setItem] = useState([])
  let token = `Bearer ${localStorage.getItem('token')}`
  let [Data, setUserData] = useState({
    TodoName: "",
    description: ""
  })
  let [ErorrApi, SetErrorApi] = useState([])


 function hook(url, methods, x) {
    axios({
      method: methods,
      url: url,
      headers: {
        Authorization: token
      },
      data: x
    }).then((res) => {
      getData()
      if (methods === "post" && res.data.massage === "Done") {
        document.getElementById('TodoName').value = ''
        document.getElementById('description').value = ''
        setUserData({
          TodoName: "",
          description: ""
        })
        SetErrorApi([])
      }
      if (methods === "post" && res.data.massage !== "Done") {
        SetErrorApi([...res.data.error.details])
      }



    }).catch((err) => {
      console.log(err);

    })
  }
  






  function SendData() {
    hook('https://todo-puth.onrender.com/Todo/create', 'post', Data)

  }


  async function getData() {
    let { data } = await axios.get("https://todo-puth.onrender.com/Todo/GetTodo", {
      headers: {
        'authorization': token
      }
    })
    if (data.massage === "Done") return setItem([...data.todo])

  }



  async function DeleteData(_id) {
    hook(`https://todo-puth.onrender.com/Todo/DeleteTodo/${_id}`, "delete")
  }

  function getDataTO(e) {
    let current = { ...Data }
    current[e.target.name] = e.target.value
    setUserData(current)
  }

  async function Updates(_id) {
    hook(`https://todo-puth.onrender.com/Todo/UpdateTodo/${_id}`, 'put', Data)
  }



  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <section className="h-100 ">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-10">

              <div className="card gradient-custom-2">
                <div className="card-body p-4 text-white">
                  <div className="text-center pt-3 pb-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check" width="60" />
                    <h2 className="my-5 ">Task List</h2>
                  </div>
                  <div className="error mb-4">
                    <div className="container">
                      <div className="row ">
                        {ErorrApi.length != 0 ? ErorrApi.map((ele, i) =>
                          <div className="col-md-6 d-flex justify-content-center" key={i}>
                            <span className='alert alert-info' role="alert">{ele.message}</span>
                          </div>
                        ) : ''}
                      </div>
                    </div>
                  </div>
                  <div className="input">
                    <div className="row">
                      <div className="col-md-6">
                        <input type="text" id='TodoName' onChange={(e) => getDataTO(e)} name='TodoName' className='mb-5 form-control rounded-pill w-75 border-0 mx-auto bg-light' placeholder='Title' />
                      </div>
                      <div className="col-md-6 ">
                        <input type="text" id='description' onChange={(e) => getDataTO(e)} name='description' className='mb-5 form-control rounded-pill w-75 border-0 mx-auto bg-light' placeholder='Description' />
                      </div>
                      <div className="col-md-12 d-flex justify-content-center mb-5">
                        <button className='btn-grad1   border-0  rounded-pill' id='Add' onClick={SendData}>Add</button>
                      </div>
                    </div>
                  </div>
                  <table className="table text-white mb-0">
                    {item.length>0 ? <>
                      <thead>
                        <tr>
                          <th scope="col" >Task</th>
                          <th scope="col">Descraption</th>
                          <th scope="col">Status</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      </>:""}
                    <tbody>
                      {item?.map((ele, i) => (
                        <tr className="fw-normal" key={i}>
                          <th>
                            <span className="ms-2">{ele.TodoName}</span>
                          </th>
                          <td className="align-middle">
                            <span>{ele.description}</span>
                          </td>
                          <td className="align-middle">
                            {ele.status === "pending" ? <h6 className="mb-0"><span className="badge bg-danger">{ele.status}</span></h6> : <h6 className="mb-0"><span className="badge bg-success">{ele.status}</span></h6>}
                          </td>
                          <td className="align-middle">
                            <span data-mdb-toggle="tooltip" onClick={() => Updates(ele._id)} className='point' title="Done"><i
                              className="fas fa-check fa-lg text-success me-3"></i></span>
                            <span data-mdb-toggle="tooltip" onClick={() => DeleteData(ele._id)} className='point' title="Remove"><i
                              className="fas fa-trash-alt fa-lg text-warning"></i></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
