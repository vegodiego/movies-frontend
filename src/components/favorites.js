import '../stylesheets/views.css';
import React, {useEffect} from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {getFavoriteMovies, deleteMovie} from "../actionCreators";


const Favorites = (props) => {
  useEffect(() => {
    if (props.tokenUserId !== null) {
      props.getFavoriteMovies(props.tokenUserId);
    }
  }, [props.movieDeleted]) //useEffect se ejecuta al cargarse el componente y cada que props.movieDeleted evitando un bucle infinito
  
  if (props.broken === true) {
    return <Redirect to="/broken" />
  }
  
  if (props.tokenUserId === null) {
    return <Redirect to="/login" />
  }

  return (
    <div class="container">
      <div className={props.movieDeleted === false ? "d-none": "float-right sticky-top alert alert-success"}>Movie deleted.</div>
      <h2 class="text-center mb-4">Favorites</h2>
      <hr></hr>
      <div class="row justify-content-around">
        {props.userFavorites.map((movie,index) =>
          <div class="col-lg-3 col-md-4 col-sm-6 col-9">
            <div class="card">   
              <img class="card-img-top" src={"https://image.tmdb.org/t/p/w220_and_h330_face"+movie.poster_path} alt={"Card image"+index} style={{width:"100%"}}></img>
              <div class="card-body">
                <h6 class="card-title">{movie.title}</h6>
                <p class="card-text">Year: {movie.release_date.slice(0,4)}</p>
                <p class="card-text">Punctuation: {movie.vote_average}</p>
                <button onClick={() => props.deleteMovie(movie, props.tokenUserId)} class="btn btn-danger">Delete movie</button>
              </div>
            </div>
          </div> 
        )}
      </div>
    </div>
  );   
};

// keys values del state
const mapStateToProps = state => {
  return {
    broken: state.broken,
    userFavorites: state.userFavorites,
    tokenUserId: state.tokenUserId,
    movieDeleted: state.movieDeleted
  }
}

// metodos
const mapDispatchToProps = dispatch => {
  return {
    getFavoriteMovies(tokenUserId){
      dispatch(getFavoriteMovies(tokenUserId));
    },
    deleteMovie(movie, tokenUserId){
     if (window.confirm("Are you sure?")){
      dispatch(deleteMovie(movie, tokenUserId));
     } 
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Favorites);