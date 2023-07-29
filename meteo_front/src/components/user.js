import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

import * as requests from './customHooks';

function User(props) {
  const userGetRequest = requests.useGetAPI('/users/current_user_data');
  const userPatchRequest = requests.usePatchAPI('/users/0');

  const handleSubmit = (event) => {
    // const formData = new FormData(event.currentTarget);
    let formObject = Object.fromEntries(new FormData(event.currentTarget).entries());
    event.preventDefault();

		var form_data = new FormData();
		for ( var key in formObject ) {
			form_data.append(key, formObject[key]);
		}

		// var userData = new FormData();
		// userData.append("user", form_data);

		// const userData = {user: form_data}

		// console.log(document.getElementById("resume_file").files[0])

    console.log("formObject", form_data);
    userPatchRequest.patchData(form_data);
  };

	console.log(userGetRequest.data)

	return (
		<div>
			<h1>Coordinates</h1>
			<div>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<input
							className="form-control"
							type="email"
							name="email"
							placeholder="email"
							required
							defaultValue={userGetRequest.data?.email || ''}
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							name="password"
							placeholder="Password"
						/>
					</div>
					<div className="form-group">
						<input
							className="form-control"
							type="password"
							name="password_confirmation"
							placeholder="Password Confirmation"
						/>
					</div>
					<div className="form-group">
						{userGetRequest.data?.resume_name 
							? <button onClick = {() => {window.open(userGetRequest.data?.resume_url, "_blank");}}>Current resume: {userGetRequest.data?.resume_name}</button>
							: ''}
						<input
							className="form-control"
							type="file"
							id="resume_file"
							name="resume_data"
							placeholder="Resume"
						/>
					</div>
					<button type="submit" className="btn btn-primary btn-sm">
						{  userPatchRequest.loading ? 'Saving...' : 'Save' }
					</button>
				</form>
			</div>
		</div>)

}


export default User;
