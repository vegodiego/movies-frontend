import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {currentUser} from "../actionCreators";


const Header = (props) => { 
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
      <div class="container">
        <Link to="/" class="navbar-brand">Movies</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <div class="navbar-nav">
              <Link to="/favorites" className={props.tokenUserId === null ? "d-none": "nav-link"}>Favorites</Link>
              <Link to="/" className={props.tokenUserId === null ? "d-none": "nav-link"} onClick={props.logout}>Logout</Link>
              <Link to="/login" className={props.tokenUserId !== null ? "d-none": "nav-link"}>Login</Link>
              <Link to="/register" className={props.tokenUserId !== null ? "d-none": "nav-link"}>Register</Link>
            </div>
          </form>
        </div>
      </div>
    </nav>   
  );
}

// keys values del state
const mapStateToProps = state => {
  return {
    tokenUserId: state.tokenUserId,
    emailLogin: state.emailLogin,
    passwordLogin: state.passwordLogin,
    wrongEntry1Login: state.wrongEntry1Login,
    wrongEntry2Login: state.wrongEntry2Login,
    emailRegister: state.emailRegister,
    passwordRegister: state.passwordRegister,
    wrongEntry1Register: state.wrongEntry1Register,
    wrongEntry2Register: state.wrongEntry2Register
  }
}

// metodos 
const mapDispatchToProps = dispatch => {
  return {
    logout(){
      localStorage.removeItem('tokenUserId');
      dispatch(currentUser());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);