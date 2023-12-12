
import axios from 'axios';
import "./Registration.css";
import Validation from "./RegistrationValidation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Registration(){

  const navigate = useNavigate();

    const [value, setValue] = useState({
        "name": '',
        "email": '',
        "password": ''
      });
      const [error, setError] = useState({});
    
      function handleInput(e) {
        setValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        setError(Validation(value));
        if(error.name===""&&error.email===""&&error.password===""){
          axios.post('http://localhost:8000/signup',value)
          .then(res=> {
            navigate('/Login');
          })
          .catch(err=> console.log(err));

        }
      }
    
     

  
    return (
        <>
          <div className="Container">
            <div className="Header">
              <div className="text">Signup</div>
              <div className="underline"></div>
            </div>
            <form className="inputs" onSubmit={handleSubmit}>
              <div className="input">
              <input type="name" name="name" placeholder="Enter Your Name" onChange={handleInput} />
                {error.name && <span>{error.name}</span>}
                <input type="email" name="email" placeholder="Enter Your Email" onChange={handleInput} />
                {error.email && <span>{error.email}</span>}
                <input type="password" name="password" placeholder="Enter Your Password" onChange={handleInput} />
                {error.password && <span>{error.password}</span>}
              </div>
              <h4>Already Signup? Login</h4>
              <div className="Submit-container">
                <button type="submit" className="Submit">Signup</button>
               
                <button className="Submit" onClick={() => navigate("/Login")}>Login</button>
              </div>
            </form>
          </div>
        </>
      );
    }

export default Registration;