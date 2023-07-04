import React from 'react'
import { Link } from 'react-router-dom'
import photo from '../NavBar/1.png'

export default function NavBar({ logout, use }) {
    return (
        <div>

            <nav className="navbar bg-body-tertiary navbar-dark text-dark  nav-bar">
                <div className="container-fluid">
                    <Link className="navbar-brand  fw-bold fs-4 " to="/TodoList"><img className='logo' src={photo} alt="" />To Do List</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="offcanvas offcanvas-end  gradient-custom-2" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header ">
                            <h5 className="offcanvas-title " id="offcanvasNavbarLabel"><img className='logo2' src={photo} alt="" /></h5>
                            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body text-black">
                            <ul className="navbar-nav justify-content-end  flex-grow-1 pe-3">
                                {use ? <>
                                    <li className="nav-item text-black">
                                        <Link className="nav-link text-black" to="/TodoList" >Home</Link>
                                    </li>
                                    <li className="nav-item dropdown ">
                                        <Link className="nav-link dropdown-toggle text-black" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            profile
                                        </Link>
                                        <ul className="dropdown-menu text-black border-0">
                                            <li><Link to="/TodoList/UpdateInfo" className="dropdown-item" >update Information</Link></li>
                                            <li><Link to="/TodoList/UpdatePass" className="dropdown-item" >update Password</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={logout} className="nav-link btn-grad w-50 border-0 rounded-pill" >Log Out</button>
                                    </li>
                                </> : <>
                                    <li className="nav-item">
                                        <Link className="nav-link text-black " aria-current="page" to="/TodoList/SignUp" >Sign Up</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link text-black" to="/TodoList/SignIn">Sign In</Link>
                                    </li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

    )
}
