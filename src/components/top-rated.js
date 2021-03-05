import '../stylesheets/views.css';
import React, {useEffect} from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {updateRedirectLogin, updateRegisterLogin , getInfoTopRatedUser, getInfoTopRatedNotUser, addFavorite} from "../actionCreators";


const TopRated = (props) => {
  var route = "https://api.themoviedb.org/3/movie/top_rated?api_key=ab577ff2988024eaa963076929b07afb&language=en-US&page=1";

  useEffect(() => { //useEffect se ejecuta al cargarse el componente y cada que props.addMovie evitando un bucle infinito
    props.updateRedirectLogin();
    props.updateRegisterLogin();

    if (props.tokenUserId === null){
      props.getInfoTopRatedNotUser(route);
    } else{
      props.getInfoTopRatedUser(route, props.tokenUserId);
    }
  },[props.addMovie]); 

  if (props.broken === true) {
    return <Redirect to="/broken" />
  }

  return (
    <div class="container">
      <div className={props.addMovie === false ? "d-none": "float-right sticky-top alert alert-success"}>Movie added.</div>
      <div class="btn-group mb-4">
        <Link to="/popular" class="btn btn-info">Popular</Link>
        <Link to="/upcoming" class="btn btn-info">Upcoming</Link>
        <Link to="/now-playing" class="btn btn-info">Now playing</Link>
      </div>
      <h2 class="text-center mb-4">Top rated</h2>
      <hr></hr>
      <div class="row justify-content-around">
        {props.topRatedMovies.map((movie,index) =>
          <div class="col-lg-3 col-md-4 col-sm-6 col-9">
            <div class="card">   
              <img class="card-img-top" src={ "https://image.tmdb.org/t/p/w220_and_h330_face"+movie.poster_path} alt={"Card image"+index} style={{width:"100%"}}></img>
              <div class="card-body">
                <h6 class="card-title">{movie.title}</h6>
                <p class="card-text">Year: {movie.release_date.slice(0,4)}</p>
                <p class="card-text">Punctuation: {movie.vote_average}</p>
                <button onClick={() => props.addFavorite(props.tokenUserId,movie,{route})} className={props.tokenUserId === null || movie.user === true ? "d-none": "btn btn-primary"}>Add to favorites</button>
              </div>
            </div>
          </div> 
        )}
      </div>
    </div>
  );   
}

// keys values del state
const mapStateToProps = state => {
  return {
    broken: state.broken,
    redirectLogin: state.redirectLogin,
    topRatedMovies: state.topRatedMovies,
    addMovie: state.addMovie,
    tokenUserId: state.tokenUserId
  }
}

// metodos 
const mapDispatchToProps = dispatch => {
  return {
    updateRedirectLogin(){
      dispatch(updateRedirectLogin());
    },
    updateRegisterLogin(){
      dispatch(updateRegisterLogin());
    },
    getInfoTopRatedUser(route, tokenUserId){
      dispatch(getInfoTopRatedUser(route, tokenUserId));
    },
    getInfoTopRatedNotUser(route){
      dispatch(getInfoTopRatedNotUser(route));
    },
    addFavorite(movie,tokenUserId,route){
      dispatch(addFavorite(movie,tokenUserId,route));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopRated);