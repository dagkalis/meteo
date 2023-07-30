import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.scss";
import * as Icon from 'react-bootstrap-icons';
import * as Messages from "../components/message";


export default function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [registrationErrors, setRegistrationErrors] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post( // todo do it using customhooks
        "http://localhost:3000/users",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
          }
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          console.log("Registration data", response.data);
          navigate('/user');
        }
      })
      .catch((error) => {
        console.log("registration error", error);
        setRegistrationErrors(error);
        // alert(error.response?.data)
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password_confirmation") {
      setPasswordConfirmation(value);
    }
  };

  return (
    <div className="form-container container">
      {registrationErrors ? <><Messages.DangerMsg children={registrationErrors.response?.data} /><br></br></> : '' }
      <div className="wrapper">
        <img src={`${window.PUBLIC_URL}/temperature_icon.png`} />
        <div className="title"></div>
        <div id="login_notice_messages">

          <form onSubmit={handleSubmit}>
            <div className="row">
              <span><Icon.Person fill="white" size="55" /></span>
              <input
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <span><Icon.Lock fill="white" size="45" /></span>
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <span><Icon.LockFill fill="white" size="45" /></span>
              <input
                className="form-control"
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                required
                value={passwordConfirmation}
                onChange={handleChange}
              />
            </div>

            {/* <button type="submit" className="btn btn-primary btn-sm">
              Register
            </button> */}
            <div className="row button">
              <input type="submit" value="Register" />
            </div>
            
            {/* <p style={{color: "blue", fontSize: "14pt"}}>
              Have an account? <Link to="/login">Login</Link>
            </p> */}
          </form>
        </div>
      </div>
    </div>
  );
}



// import React, { Component } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// export default class Registration extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//       password_confirmation: "",
//       registrationErrors: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleSubmit(event) {
//     const {
//       email,
//       password,
//       password_confirmation
//     } = this.state;
//     axios
//       .post(
//         "http://localhost:3000/users",
//         {
//           user: {
//             email: email,
//             password: password,
//             password_confirmation: password_confirmation
//           }
//         },
//         { withCredentials: true }
//       )
//       .then(response => {
//         if (response.data.status === "created") {
//           console.log("Registration data", response.data)
//         }
//       })
//       .catch(error => {
//         console.log("registration error", error);
//       });

//     event.preventDefault();
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <input
//               className="form-control"
//               type="email"
//               name="email"
//               placeholder="Email"
//               required
//               value={this.state.email}
//               onChange={this.handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <input
//               className="form-control"
//               type="password"
//               name="password"
//               placeholder="Password"
//               required
//               value={this.state.password}
//               onChange={this.handleChange}
//             />
//           </div>

//           <div className="form-group">
//             <input
//               className="form-control"
//               type="password"
//               name="password_confirmation"
//               placeholder="Password Confirmation"
//               required
//               value={this.state.password_confirmation}
//               onChange={this.handleChange}
//             />
//           </div>

//           <button type="submit" className="btn btn-primary btn-sm">
//             Register
//           </button>
//           <p>
//             Have an account? <Link to="/">Login</Link>
//           </p>
//         </form>
//       </div>
//     );
//   }
// }