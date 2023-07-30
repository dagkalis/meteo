import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.scss"
import * as Icon from 'react-bootstrap-icons';

import * as requests from './customHooks';

// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Navbar(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const logoutRequest = requests.useDeleteAPI(`/logout`);


	function isActive(path) {
		if (path.split('/')[1] === location.pathname.split('/')[1]) {
			return 'active'
		}
		return ''
	}

	function logout() {
		logoutRequest.deleteData();
	}



	useEffect(() => {
		if (logoutRequest.responseData) {
			navigate('/login');
		}
  }, [logoutRequest.responseData]);

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<a href="#" className="navbar-brand">
						<img src={`${window.PUBLIC_URL}/temperature_icon.png`} height="38" alt="Meteo" />
					</a>
					<button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav">
							<a onClick={() => { navigate('/') }} className={`nav-item nav-link ${isActive('/')}`} >Forecast</a>
							<a onClick={() => { navigate('/weather_data_histories') }} className={`nav-item nav-link ${isActive('/weather_data_histories')}`} >Stored Weather Data</a>
						</div>
						<div className="navbar-nav ms-auto">
							{['/registration', '/login'].includes(location.pathname)
								? <>
									<a onClick={() => { navigate('/registration') }} className={`nav-item nav-link ${isActive('/registration')}`} >Register</a>
									<a onClick={() => { navigate('/login') }} className={`nav-item nav-link ${isActive('/login')}`} tabIndex="-1">Login</a>
								</>
								: <>
									{/* <a onClick={()=>{navigate('/user')}} className={`nav-item nav-link ${isActive('/user')}`}  tabIndex="-1">User</a> */}

									<NavDropdown id="nav-dropdown" className={isActive('/user')} title="User">
										<NavDropdown.Item onClick={() => { navigate('/user') }} >Edit account data</NavDropdown.Item>
										<NavDropdown.Item onClick={() => { navigate('/user?password_only=true') }}>
											Edit account password
										</NavDropdown.Item>
									</NavDropdown>

									<a onClick={() => logout()} className={`nav-item nav-link`} tabIndex="-1">
										<Icon.Power fill="white" size="25" />
									</a>
								</>
							}

						</div>
					</div>
				</div>
			</nav>
		</>
	)

}


export default Navbar;