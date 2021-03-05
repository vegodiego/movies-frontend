import React, {useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {updateRedirectRegister, updateRegister, closeErrorLogin, changeLogin, submitLogin} from "../actionCreators";


const Login = (props) => {  //useEffect se ejecuta al cargarse el componente y notBucle cambia(nunca) evitando un bucle infinito
  const notBucle = null;
  
  useEffect(() => {
    props.updateRedirectRegister();
    props.updateRegister();
  }, [notBucle]); 

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  if (props.tokenUserId != null) {
    return <Redirect to="/" />
  }

  return (
    <div class="container">
      <div className={props.newRegister === false ? "d-none": "alert alert-success"}>Successful registration. You can now log in with your username.</div>
      <div className={props.errorLogin === false ? "d-none": "alert alert-danger alert-dismissible fade show"}>
        <button onClick={props.closeErrorLogin} type="button" class="close">&times;</button>Invalid email and / or password. Try again.
      </div>
      <div class="row justify-content-center">
        <div class="col-9 col-sm-6 col-md-5 col-lg-4">
          <h2 class="mb-4 text-center">Login</h2>
          <form onSubmit={(event) => props.submitLogin(props.emailLogin, props.passwordLogin, event)}>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" className={props.wrongEntry1Login === false ? "form-control": "is-invalid form-control"} value={props.emailLogin} onChange={props.changeLogin} name="email" id="email" placeholder="Enter email"></input>
              <div className={props.wrongEntry1Login === false ? "d-none": "text-danger"}>Wrong entry</div>
            </div>
            <div class="form-group">
              <label for="pwd">Password:</label>
              <input type="password" className={props.wrongEntry2Login === false ? "form-control": "is-invalid form-control"} value={props.passwordLogin} onChange={props.changeLogin} name="password" id="password" placeholder="Enter password"></input>
              <div className={props.wrongEntry2Login === false ? "d-none": "text-danger"}>Wrong entry</div>
            </div>
            <button type="submit" class="btn btn-primary btn-block ">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// keys values del state
const mapStateToProps = state => {
  return {
    broken: state.broken,
    emailLogin: state.emailLogin,
    passwordLogin: state.passwordLogin,
    errorLogin: state.errorLogin,
    tokenUserId: state.tokenUserId,
    redirectRegister: state.redirectRegister,
    wrongEntry1Login: state.wrongEntry1Login,
    wrongEntry2Login: state.wrongEntry2Login,
    newRegister: state.newRegister
  }
}

// metodos 
const mapDispatchToProps = dispatch => {
  return {
    updateRedirectRegister(){
      dispatch(updateRedirectRegister());
    },
    updateRegister(){
      dispatch(updateRegister());
    },
    closeErrorLogin(){
      dispatch(closeErrorLogin());
    },
    changeLogin(event){
      dispatch(changeLogin(event));
    },
    submitLogin(email,password,event){
      event.preventDefault();
      dispatch(submitLogin(email,password))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);