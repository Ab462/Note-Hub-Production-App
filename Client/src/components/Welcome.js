import { useOutletContext } from "react-router-dom";

export default function About() {
  const [,name] = useOutletContext();
  
  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center">
        <div className="info d-flex flex-column align-items-center ">
          <i className="fa-regular fa-user" style={{fontSize:'50px'}}></i>
          <h2 className="my-3">Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        </div>
      </div>
    </div>
  );
}
