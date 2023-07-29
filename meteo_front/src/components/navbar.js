import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.scss"
import * as Icon from 'react-bootstrap-icons';

import * as requests from './customHooks';


function Navbar(props) {
	const navigate = useNavigate();
	const location = useLocation();

	const logoutRequest = requests.useDeleteAPI(`/logout`);


	function isActive(path){
		if (path === location.pathname){
			return 'active'
		}
		return ''
	}

	function logout(){
		logoutRequest.deleteData();
	}

	if(logoutRequest.responseData){
		navigate('/login');
	}

	return (
		<>
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-fluid">
				<a href="#" className="navbar-brand">
					<img src={`${window.PUBLIC_URL}/temperature_icon.ico`} height="28" alt="Meteo" />
				</a>
				<button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<div className="navbar-nav">
						<a onClick={()=>{navigate('/')}} className={`nav-item nav-link ${isActive('/')}`} >Forecast</a>
						<a onClick={()=>{navigate('/weather_data_histories')}} className={`nav-item nav-link ${isActive('/weather_data_histories')}`} >Stored Weather Data</a>
					</div>
					<div className="navbar-nav ms-auto">
						{['/registration', '/login'].includes(location.pathname) 
						?	<>
								<a onClick={()=>{navigate('/registration')}} className={`nav-item nav-link ${isActive('/registration')}`} >Register</a>
								<a onClick={()=>{navigate('/login')}} className={`nav-item nav-link ${isActive('/login')}`}  tabIndex="-1">Login</a>
							</>				
						: <>
								<a onClick={()=>{navigate('/user')}} className={`nav-item nav-link ${isActive('/login')}`}  tabIndex="-1">User</a>
								<a onClick={logout} className={`nav-item nav-link`}  tabIndex="-1">
									<Icon.Power size="25" />
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