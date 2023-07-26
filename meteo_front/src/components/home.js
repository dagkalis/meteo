import React, { useState } from "react";
import Login from "../auth/login";
import { Link, useNavigate } from "react-router-dom";

function Home(props) {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const navigate = useNavigate();

  const handleSuccessfulAuth = (data) => {
    props.handleLogin(data);
    setLoggedInStatus(true);
    navigate('/forecasts');
  };

  console.log("rendering home");
  return (
    <div>
      <h1>Home</h1>
      <h1>Status: {loggedInStatus ? "Logged in" : "NOT logged in"}</h1>
      <Login handleSuccessfulAuth={handleSuccessfulAuth} />
      <p>
        Don't have an account? <Link to="/registration">Register</Link>
      </p>
    </div>
  );
}

export default Home;

// import React, { Component } from "react";
// import Login from "../auth/login";
// import { Link } from "react-router-dom";
// import { withNavigate } from "./withnavigate"

// export default class Home extends Component {
//   constructor(props) {
//     super(props);
//     console.log(props)
//     this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
//   }

//   handleSuccessfulAuth(data) {
//     // const navigate = useNavigate();
//     this.props.handleLogin(data);
//     // this.props.navigate('/forecasts');
//     this.props.navigate('/forecasts');

//     // this.props.history.push("/dashboard");
//   }

//   render() {
//     console.log("rendering home")
//     return (
//       <div>
//         <h1>Home</h1>
//         <h1>Status: {this.props.loggedInStatus ? "Logged in" : "NOT logged in"}</h1>
//         <Login
//           handleSuccessfulAuth={this.handleSuccessfulAuth}
//         />
//         <p>
//           Don't have an account? <Link to="/registration">Register</Link>
//         </p>
//       </div>
//     );
//   }
// }