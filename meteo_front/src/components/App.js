import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// import Dashboard from "./dashboard";
import Login from "../auth/login";
import axios from "axios";
import ForecastsView from "./forecasts";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/general.scss"

import Registration from "../auth/registration";
import WeatherDataHistories from "./weatherDataHistories";
import WeatherDataHistory from "./weatherDataHistory";
import User from "./user";
import Navbar from "./navbar";


export default function App() {

  useEffect(() => {
    // checkLoginStatus();
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
              < Navbar />
              <ForecastsView />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
              < Navbar />
              <Login/>
              </>
            }
          />
          <Route
            path="/registration"
            element={
              <>
              < Navbar />
              <Registration/>
              </>
            }
          />
          <Route
            path="/user"
            element={
              <>
              < Navbar />
              <User/>
              </>
            }
          />
          <Route
            path="/weather_data_histories"
            element={
              <>
              < Navbar />
              <WeatherDataHistories />
              </>
            }
          />
          <Route
            path="/weather_data_histories/:id"
            element={
              <>
              < Navbar />
              < WeatherDataHistory />
              </>
              }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


// import React, { Component } from "react";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
// // import Dashboard from "./dashboard";
// import Home from "./home";
// import axios from "axios";
// import ForecastsView from "./forecasts";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Registration from "../auth/registration";

// export default class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       loggedInStatus: false
//     };

//     this.handleLogin = this.handleLogin.bind(this);
//     this.handleLogout = this.handleLogout.bind(this);
//     this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
//   }

//   checkLoginStatus() {
//     axios
//       .get("http://localhost:3000/logged_in", { withCredentials: true })
//       .then(response => {
//         this.state.loggedInStatus = response.data.logged_in
//       }).catch(error => {
//         this.state.loggedInStatus = false
//         console.log("login error", error);
//       });
//   }

//   handleSuccessfulAuth(data) {
//     this.handleLogin(data);
//   }

//   componentDidMount() {
//     this.checkLoginStatus();
//   }

//   handleLogin(data) {
//     this.setState({
//       loggedInStatus: true
//     });
//   }

//   handleLogout() {
//     this.setState({
//       loggedInStatus: false
//     });
//   }

//   render() {
//     return (
//       <div className="app">
//         {console.log("here 1")}
//         <BrowserRouter>
//           <Routes>
//             <Route
//               path="/"
//               element={<Home
//                 loggedInStatus={this.state.loggedInStatus}
//                 handleLogin={this.handleLogin}
//                 handleLogout={this.handleLogout}
//               />}
//             />
//             <Route
//               path="/registration"
//               element={<Registration
//                 handleSuccessfulAuth={this.handleSuccessfulAuth}
//                 loggedInStatus={this.state.loggedInStatus}
//               />}
//             />
//             <Route
//               path="/"
//               element={<ForecastsView
//                 loggedInStatus={this.state.loggedInStatus}
//               />}
//             />
//           </Routes>
//         </BrowserRouter>
//       </div>
//     );
//   }
// }

// function getAPIData(url) {
//   return axios.get(url).then((response) => response.data);
// }


// // import "./App.css";
// // import axios from "axios";
// // import Books from "./components/books";
// // import ForecastsView from "./components/forecasts";
// // import { useEffect, useState } from "react";

// // const API_URL = "http://localhost:3000/api/v1/api/v1/api/v1/";

// // function getAPIData() {
// //   return axios.get(API_URL).then((response) => response.data);
// // }

// // function App() {
// //   const [forecasts, setforecasts] = useState([]);

// //   useEffect(() => {
// //     let mounted = true;
// //     getAPIData().then((items) => {
// //       if (mounted) {
// //         setforecasts(items);
// //       }
// //     });
// //     return () => (mounted = false);
// //   }, []);

// //   return (
// //     <div className="App">
// //       <h1>Hello</h1>
// //       <ForecastsView forecasts={forecasts} />
// //     </div>
// //   );
// // }

// // // const API_URL = "http://localhost:3000/api/v1/api/v1/books";

// // // function getAPIData() {
// // //   return axios.get(API_URL).then((response) => response.data);
// // // }

// // // function App() {
// // //   const [books, setBooks] = useState([]);

// // //   useEffect(() => {
// // //     let mounted = true;
// // //     getAPIData().then((items) => {
// // //       if (mounted) {
// // //         setBooks(items);
// // //       }
// // //     });
// // //     return () => (mounted = false);
// // //   }, []);

// // //   return (
// // //     <div className="App">
// // //       <h1>Hello</h1>
// // //       <Books books={books} />
// // //     </div>
// // //   );
// // // }

// // export default App;