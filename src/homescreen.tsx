import { useNavigate } from "react-router";
import classes from "./styles/initial.module.css";
import { ListView } from "./list";

export const Homescreen = (props: Record<string, never>) => {
 const navigation = useNavigate();

 const handleSingupClick = () => {
  navigation("/signup");
 };
 return (
  <div>
   <div className={classes.header}>
    <div className={classes.container}>
     <h1>Andy's Rental</h1>
     <button
      className="button"
      onClick={() => {
       navigation("./login");
      }}
     >
      Login
     </button>
     <button className="button" onClick={handleSingupClick}>
      Sign Up
     </button>
     <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="black"
     >
      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.12.45 2.33.69 3.58.69.55 0 1 .45 1 1v3.5c0 .55-.45 1-1 1C10.07 22 2 13.93 2 3.5 2 2.95 2.45 2.5 3 2.5H6.5c.55 0 1 .45 1 1 0 1.25.24 2.46.69 3.58.14.34.07.73-.21 1.11l-2.2 2.2z" />
     </svg>
    </div>
   </div>
   <ListView vehicles={props.vehicles} />
  </div>
 );
};
