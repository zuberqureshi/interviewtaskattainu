import React from "react";
import AuthService from "../services/auth.service";
import { useHistory,Link } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();

  const currentUser = AuthService.getCurrentUser();
if( !currentUser ) {         

return (
  
<>
<div className="container">
<header className="jumbotron">

 <Link to={"/login"} className="nav-link text-center" >
              Click Here To login 
            </Link>
            </header>

    </div>


</>

); 

}
else{
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          My Profile : <br/>
          <strong>{currentUser.username}</strong> 
        </h3>

        <p>
        <strong>JWT Token:</strong> {currentUser.accessToken.substring(0, 200)}
       </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
       

      </header>
     
    </div>
  );
}
};

export default Profile;
