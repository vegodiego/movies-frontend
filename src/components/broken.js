import React, {useEffect} from 'react';
import { connect } from "react-redux";
import {updateBrokenFalse} from "../actionCreators";


const Broken = (props) => { //componente que se muestra cuando hay un err en alguna peticion axios a las API(el backend o base de datos estan offline)
  const notBucle = null;
  
  useEffect(() => {
    props.updateBrokenFalse();
  }, [notBucle]); 

  return (
    <div>
      <h3>Something is broken!</h3>
    </div>     
  );
}

// keys values del state
const mapStateToProps = state => {
  return {
    broken: state.broken
  }
}

// metodos 
const mapDispatchToProps = dispatch => {
  return {
    updateBrokenFalse(){
      dispatch(updateBrokenFalse());
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Broken);