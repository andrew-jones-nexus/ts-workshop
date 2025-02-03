/* eslint-disable @typescript-eslint/no-explicit-any */
import {
 Routes,
 Route,
 BrowserRouter as Router,
 useNavigate,
} from "react-router";
import "./App.css";
import { Homescreen } from "./homescreen";
import React from "react";
import classes from "./styles/initial.module.css";

const apiKey = "abc123";

// DO NOT CHANGE
const reducer = (state: any, action: any) => {
 switch (action.type) {
  case "SET_FIELD":
   return {
    ...state,
    [action.field]: action.value,
    errors: {
     ...state.errors,
     [action.field]: "",
    },
   };
  case "SET_ERROR":
   return {
    ...state,
    errors: {
     ...state.errors,
     [action.field]: action.error,
    },
   };
  case "RESET":
   return initialState;
  default:
   return state;
 }
};

const validate = (state: Record<string, string>) => {
 const errors: any = {};
 if (!state.username) {
  errors.username = "Username is required";
 }
 if (!state.password) {
  errors.password = "Password is required";
 }
 return errors;
};

function App() {
 const [c, setC] = React.useState(null);

 React.useEffect(() => {
  fetch("http://localhost:3002/vehicles", {
   headers: {
    Authorization: `Bearer ${apiKey}`,
   },
  })
   .then((res) => res.json())
   .then((data) => {
    setC(data);
   });
 }, []);

 return (
  <>
   <Router>
    <Routes>
     <Route
      path="/login"
      element={
       <div style={{ display: "flex", flexDirection: "column" }}>
        <Homescreen />
        <Login />
       </div>
      }
     />
     <Route path="/" element={<Homescreen vehicles={c as never} />} />
     <Route
      path="/signup"
      element={
       <div>
        <h1>Sign Up</h1>
        <p>
         Sign up using our third-party provider,
         <a>www.andyssketchyauthprovider.com</a>
        </p>
        <button
         className="button"
         onClick={() => {
          window.history.pushState("", "", "/");
         }}
        >
         Back to Home
        </button>
       </div>
      }
     ></Route>
    </Routes>
   </Router>
  </>
 );
}

const initialState = {
 username: "",
 password: "",
 errors: {
  username: "",
  password: "",
 },
};

const Login = () => {
 const [state, dispatch] = React.useReducer(reducer, initialState);
 const navigation = useNavigate();

 const handleChange = (e: any) => {
  dispatch({
   type: "SET_FIELD",
   field: e.target.name,
   value: e.target.value,
  });
 };

 const handleSubmit = (e: any) => {
  e.preventDefault();
  const errors = validate(state);
  if (Object.keys(errors).length > 0) {
   for (const field in errors) {
    dispatch({
     type: "SET_ERROR",
     field,
     error: errors[field],
    });
   }
  } else {
   dispatch({ type: "RESET" });
   navigation("/");
  }
 };

 return (
  <div className={classes.auth}>
   <h2>Login</h2>
   <form
    onSubmit={handleSubmit}
    style={{
     display: "flex",
     flexDirection: "column",
     gap: "8px",
     alignItems: "center",
    }}
   >
    <input
     type="text"
     name="username"
     placeholder="username"
     className="input"
     value={state.username}
     onChange={handleChange}
    />
    {state.errors.username && <p className="error">{state.errors.username}</p>}
    <input
     type="password"
     name="password"
     placeholder="password"
     className="input"
     value={state.password}
     onChange={handleChange}
    />
    {state.errors.password && <p className="error">{state.errors.password}</p>}
    <button type="submit" className="button">
     Login
    </button>
   </form>
  </div>
 );
};

export default App;
