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

function User(props) {
	const userGetRequest = requests.useGetAPI('/users/current_user_data');
	const userPatchRequest = requests.usePatchAPI('/users/0');

	const handleSubmit = (event) => {
		let formObject = Object.fromEntries(new FormData(event.currentTarget).entries());
		event.preventDefault();

		console.log(formObject)

		var form_data = new FormData();
		for (var key in formObject) {
			form_data.append(key, formObject[key]);
		}

		console.log("formObject", form_data);
		userPatchRequest.patchData(form_data);
	};

	return (
		<Form style={{ margin: "5em" }} onSubmit={handleSubmit} >
			{console.log(params)}
			{!params().password_only ? userForm(userGetRequest) : passwordOnlyForm()}

			<Button style={{ float: "right" }} variant="" type="submit">
				<Icon.Save2 size="20" /> | Submit
			</Button>
		</Form>
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
	return (<>
		<Row className="mb-3">
			<Form.Group as={Col} controlId="formGridEmail">
				<Form.Label>Email</Form.Label>
				<input className="form-control" type="email" name="email" placeholder="email" required defaultValue={userGetRequest.data?.email || ''} />
			</Form.Group>
		</Row>

		<Row className="mb-3">
			<Form.Group as={Col} controlId="formGridResume">
				<Form.Label>Resume</Form.Label>
				<input
					className="form-control"
					type="file"
					id="resume_file"
					name="resume_data"
					placeholder="Resume"
				/>
			</Form.Group>

			<Form.Group as={Col} controlId="formGridPassword">
				<Form.Label>Current resume</Form.Label>
				<Row>
					<Col>
						<input
							className="form-control col"
							type="text"
							disabled
							value={userGetRequest.data?.resume_name || ''}
						/>
					</Col>
					<Col>
						{userGetRequest.data?.resume_name
							?
							<button onClick={() => { window.open(userGetRequest.data?.resume_url, "_blank"); }} className="btn">
								Show
							</button>
							:
							''}
					</Col>
				</Row>
			</Form.Group>
		</Row>
	</>)
}


function passwordOnlyForm() {
	return (
		<>
			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridOldPassword">
					<Form.Label>Old Password</Form.Label>
					<input
						className="form-control col"
						type="password"
						id="old_password"
						name="old_password"
						placeholder="Old Password"
					/>
				</Form.Group>
				<Form.Group as={Col} controlId="formGridResume"></Form.Group>
			</Row>

			<Row className="mb-3">
				<Form.Group as={Col} controlId="formGridResume">
					<Form.Label>New Password</Form.Label>
					<input
						className="form-control col"
						type="password"
						name="password"
						placeholder="Password"
					/>
				</Form.Group>

				<Form.Group as={Col} controlId="formGridResume">
					<Form.Label>Confirm New Password</Form.Label>
					<input
						className="form-control col"
						type="password"
						name="password_confirmation"
						placeholder="Password Confirmation"
					/>
				</Form.Group>
			</Row>
		</>
	)
}


// function password


export default User;
