import React, {useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {updateLogin, closeUserExists, changeRegister, submitRegister} from "../actionCreators";

  
const Register = (props) => {
  const notBucle = null;
  
  useEffect(() => { //useEffect se ejecuta al cargarse el componente y notBucle cambia(nunca) evitando un bucle infinito
    props.updateLogin();
  }, [notBucle]);

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  if (props.redirectRegister != null) {
    return <Redirect to={props.redirectRegister} />
  }  

  if (props.tokenUserId != null) {
    return <Redirect to="/" />
  }

  return (
    <div class="container">
      <div className={props.errorRegister === false ? "d-none": "alert alert-danger alert-dismissible fade show"}>
        <button onClick={props.closeUserExists} type="button" class="close">&times;</button>The user already exists, enter a different user.
      </div>
      <div class="row justify-content-center">
        <div class="col-9 col-sm-6 col-md-5 col-lg-4">
          <h2 class="mb-4 text-center">Register</h2>
          <form onSubmit={(event) => props.submitRegister(props.emailRegister, props.passwordRegister, event)}>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" className={props.wrongEntry1Register === false ? "form-control": "is-invalid form-control"} value={props.emailRegister} onChange={props.changeRegister} name="email" id="email" placeholder="Enter email"></input>
              <div className={props.wrongEntry1Register === false ? "d-none": "text-danger"}>Wrong entry</div>
            </div>
            <div class="form-group">
              <label for="pwd">Password:</label>
              <input type="password" className={props.wrongEntry2Register === false ? "form-control": "is-invalid form-control"} value={props.passwordRegister} onChange={props.changeRegister} name="password" id="password" placeholder="Enter password"></input>
              <div className={props.wrongEntry2Register === false ? "d-none": "text-danger"}>Wrong entry</div>
            </div>
            <button type="submit" class="btn btn-primary btn-block ">Register</button>
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
    emailRegister: state.emailRegister,
    passwordRegister: state.passwordRegister,
    errorRegister: state.errorRegister,
    tokenUserId: state.tokenUserId,
    redirectRegister: state.redirectRegister,
    wrongEntry1Register: state.wrongEntry1Register,
    wrongEntry2Register: state.wrongEntry2Register,
    newRegister: state.newRegister
  }
}

// metodos 
const mapDispatchToProps = dispatch => {
  return {
    updateLogin(){
      dispatch(updateLogin());
    },
    closeUserExists(){
      dispatch(closeUserExists());
    },
    changeRegister(event){
      dispatch(changeRegister(event));
    },
    submitRegister(email,password,event){
      event.preventDefault();
      dispatch(submitRegister(email,password))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register);