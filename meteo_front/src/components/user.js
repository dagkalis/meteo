import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

import * as requests from './customHooks';
import * as Icon from 'react-bootstrap-icons';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/login.scss";
import Loader from './loading';

import * as Messages from './message';



function User(props) {
	const userGetRequest = requests.useGetAPI('/users/current_user_data');
	const userPatchRequest = requests.usePatchAPI('/users/0');

	const handleSubmit = (event) => {
		let formObject = Object.fromEntries(new FormData(event.currentTarget).entries());
		event.preventDefault();

		if (params().password_only) {
			formObject.password_only = true;
		}

		console.log(formObject)

		var form_data = new FormData();
		for (var key in formObject) {
			form_data.append(key, formObject[key]);
		}

		console.log("formObject", form_data);
		userPatchRequest.patchData(form_data);
	};

	return (
		<>
				<div className="form-container container">
				{<>
					{userPatchRequest.error ? 
						<>
							<div className='container'>
								<Messages.DangerMsg children={userPatchRequest.error.response?.data} />
							</div>
						</> 
					: (userPatchRequest.responseData &&
						<>
							<div className='container'>
								<Messages.SuccessMsg children="Successful user update" />
							</div>
						</> 
						)}
						{params().success && 
						<div className='container'>
							<Messages.SuccessMsg children={params().success} />
						</div>}	
						{params().warning && 
							<div className='container'>
								<Messages.DangerMsgTimeout children={params().warning} />
							</div>}
						
					</>}
					<br></br>
					<br></br>
					<div className="wrapper user_form">
						<img src={`${window.PUBLIC_URL}/temperature_icon.png`} />
						<div className="title">User Attributes</div>
						<div id="login_notice_messages">
							<Form onSubmit={handleSubmit} >
								{console.log(params)}
								{!params().password_only ? userForm(userGetRequest) : passwordOnlyForm()}


								<div className='row button'>
									<Button variant="" type="submit">
										<Icon.Save2 fill="white" size="20" /> | Submit
									</Button>
								</div>
							</Form>
						</div>
					</div>
				</div>
		</>
	)

}


function params() {
	let _params = {};
	(new URLSearchParams(window.location.search)).forEach((value, key) => {
		_params[key] = value;
	});

	return _params;
}


function userForm(userGetRequest) {
	const title = userGetRequest.data?.resume_name ? 'Download current resume' : '';
	const styleObj = userGetRequest.data?.resume_name ? { cursor: "pointer" } : {};
	const onClickBtn = () => {
		userGetRequest.data?.resume_name
			?
			window.open(userGetRequest.data?.resume_url, "_blank")
			:
			console.log('not there')
	}
	return (<>
		<div className='user_data_form'>
			<div className="row">
				<span><Icon.Person fill="white" size="" />Email</span>
				<input
					className="form-control"
					type="email"
					name="email"
					placeholder="Email"
					required
					defaultValue={userGetRequest.data?.email || ''}
				// value={email}
				// onChange={handleChange}
				/>
			</div>


			<div className="row">
				<div className='col' style={{ "padding-left": "0", width: "90%" }}>
					<span><Icon.Paperclip fill="white" />Resume</span>
					<input style={{ width: "90%" }}
						className="form-control"
						type="file"
						id="resume_file"
						name="resume_data"
						placeholder="Resume"
					/>
				</div>

				<div className='col' title={title} style={Object.assign({ padding: "0" }, styleObj)}
					onClick={onClickBtn} >
					<span><Icon.Paperclip fill="white" />Current</span>

					<input style={styleObj} title={title} onClick={onClickBtn}
						className="form-control col"
						type="text"
						readOnly='true'
						value={userGetRequest.data?.resume_name || ''}
					/>

				</div>
			</div>
		</div>
	</>)
}


function passwordOnlyForm() {
	return (
		<>

			<div className="row">
				<span><Icon.Person fill="white" /></span>
				<input
					className="form-control col"
					type="password"
					id="old_password"
					name="old_password"
					placeholder="Old Password"
				/>
			</div>
			<div className="row">
				<span><Icon.Lock fill="white" /></span>
				<input
					className="form-control col"
					type="password"
					name="password"
					placeholder="Password"
				/>
			</div>
			<div className="row">
				<span><Icon.LockFill fill="white" /></span>
				<input
					className="form-control col"
					type="password"
					name="password_confirmation"
					placeholder="Password Confirmation"
				/>
			</div>
		</>
	)
}


// function password


export default User;
