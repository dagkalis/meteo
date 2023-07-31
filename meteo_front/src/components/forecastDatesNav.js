import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.scss"
// import * as Icon from 'react-bootstrap-icons';

import * as requests from './customHooks';

// import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ViewType} from './weatherView';


function ForecastDatesNav(props) {

	function isActive2(date) {
		if (props.currentDate === date) {
			return 'active'
		}
		return ''
	}

	function chooseDate(event) {
		console.log(event.target.id)
		props.setCurrentDate(event.target.id);
	}

	function isActiveViewType(viewType) {
		console.log(props.currentViewType, viewType, props.currentViewType === viewType)
		if (props.currentViewType === viewType) {
			return 'active'
		}
		return ''
	}

	function chooseViewType(event) {
		console.log("target", event.target.id);
		console.log("curr", props.currentViewType);
		props.setCurrentViewType(event.target.id);
	}
	// console.log(ViewType);
	// console.log(props.currentViewType)
	return (
		<>
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<div className="collapse navbar-collapse" id="navbarCollapse">
						<div className="navbar-nav">
							{props.dates.map((date) => {
								return (
									<a id={date} key={date} onClick={chooseDate} className={`nav-item nav-link ${isActive2(date)}`}>
										{date}
									</a>
								);
							})}

						</div>
						<div className="navbar-nav ms-auto">
							{Object.values(ViewType).map((viewType) => {
								console.log(viewType);
								return (
									<a id={viewType} key={viewType} onClick={chooseViewType} className={`nav-item nav-link ${isActiveViewType(viewType)}`}>
										{viewType}
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