import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { usePostAPI } from "../components/customHooks";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrors, setLoginErrors] = useState("");

  const navigate = useNavigate();

  const { responseData, loading, error, postData } = usePostAPI('/sessions', {
    user: {
      email: email,
      password: password
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    postData();
  };

  if(responseData?.logged_in){
    console.log("Logged_in")
    navigate('/');
  }

  if(error){
    console.log("login error", error);
    setLoginErrors("Login failed. Please check your credentials.");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <button type="submit" className="btn btn-primary btn-sm">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {loginErrors && <p>{loginErrors}</p>}
      </div>
      <p>
        Don't have an account? <Link to="/registration">Register</Link>
      </p>
    </div>
  );
}

export default Login;


// import React, { Component } from "react";
// import axios from "axios";

// export default class Login extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       email: "",
//       password: "",
//       loginErrors: ""
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleSubmit(event) {
//     const { email, password } = this.state;
//     axios
//       .post(
//         "http://localhost:3000/sessions",
//         {
//           user: {
//             email: email,
//             password: password
//           }
//         },
//         { withCredentials: true }
//       )
//       .then(response => {
//         if (response.data.logged_in) {
//           this.props.handleSuccessfulAuth(response.data);
//         }
//       })
//       .catch(error => {
//         console.log("login error", error);
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
//           <button type="submit" className="btn btn-primary btn-sm">
//             Login
//           </button>
//         </form>
//       </div>
//     );
//   }
// }