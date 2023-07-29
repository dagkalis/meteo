import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.scss"
import * as Icon from 'react-bootstrap-icons';

import * as requests from './customHooks';

// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


function ForecastDatesNav(props) {

	function isActive2(date) {
		if (props.currentDate === date) {
			return 'active'
		}
		return ''
	}

	function chooseDate(event){
		console.log(event.target.id)
		props.setCurrentDate(event.target.id);
	}

	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav">
							{props.dates.map((date) => {
								return (
									<a id={date} onClick={chooseDate} className={`nav-item nav-link ${isActive2(date)}`}>
										{date}
									</a>
								);
							})}
						
						</div>
					</div>
				</div>
			</nav>
		</>
	)

}


export default ForecastDatesNav;