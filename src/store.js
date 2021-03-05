import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";


const reducer = (state,action) => {
  if( action.type === "ESTABLECIENDO_USUARIO_ACTUAL"){ //todas los componentes
    return {
      ...state,
      tokenUserId: action.object
    }
  } else if(action.type === "ACTUALIZANDO_BROKEN"){ //todas los componentes
    return {
      ...state,
      broken: action.object
    }
  } else if(action.type === "ACTUALIZANDO_MENSAJE_DE_REGISTRO_EXITOSO"){ //login
  	return {
  	  ...state,
  	  newRegister: action.object
  	}
  } else if(action.type === "ACTUALIZANDO_MENSAJE_DE_USUARIO_INVALIDO"){ //login
    return {
      ...state,
      errorLogin: action.object
    }
  } else if(action.type === "ACTUALIZANDO_EMAIL_DE_LOGIN"){ //login
    return {
      ...state,
      emailLogin: action.object
    }
  } else if(action.type === "ACTUALIZANDO_PASSWORD_DE_LOGIN"){ //login
    return {
      ...state,
      passwordLogin: action.object
    }
  } else if(action.type === "ACTUALIZANDO_WRONGENTRY1_DE_LOGIN"){ //login
    return {
      ...state,
      wrongEntry1Login: action.object
    }
  } else if(action.type === "ACTUALIZANDO_WRONGENTRY2_DE_LOGIN"){ //login
    return {
      ...state,
      wrongEntry2Login: action.object
    }
  } else if(action.type === "ACTUALIZANDO_MENSAJE_DE_USUARIO_YA_EXISTE"){ //register
    return {
      ...state,
      errorRegister: action.object
    }
  } else if(action.type === "ACTUALIZANDO_EMAIL_DE_REGISTER"){ //register
    return {
      ...state,
      emailRegister: action.object
    }
  } else if(action.type === "ACTUALIZANDO_PASSWORD_DE_REGISTER"){ //register
    return {
      ...state,
      passwordRegister: action.object
    }
  } else if(action.type === "ACTUALIZANDO_WRONGENTRY1_DE_REGISTER"){ //register
    return {
      ...state,
      wrongEntry1Register: action.object
    }
  } else if(action.type === "ACTUALIZANDO_WRONGENTRY2_DE_REGISTER"){ //register
    return {
      ...state,
      wrongEntry2Register: action.object
    }
  } else if(action.type === "ACTUALIZANDO_REDIRECTREGISTER"){ //register
    return {
      ...state,
      redirectRegister: action.object
    }
  } else if(action.type === "OBTENIENDO_PELICULAS_FAVORITAS_DEL_USUARIO"){ //favorites
    return {
      ...state,
      userFavorites: action.object
    }
  } else if(action.type === "ACTUALIZANDO_MENSAJE_DE_PELICULA_ELIMINADA"){ //favorites
    return {
      ...state,
      movieDeleted: action.object
    }
  } else if(action.type === "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_NOWPLAYING"){ //now-playing
    return {
      ...state,
      nowPlayingMovies: action.object
    }
  } else if(action.type === "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_POPULAR"){ //popular
    return {
      ...state,
      popularMovies: action.object
    }
  } else if(action.type === "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_TOP-RATED"){ //top-rated
    return {
      ...state,
      topRatedMovies: action.object
    }
  } else if(action.type === "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_UPCOMING"){ //upcoming
    return {
      ...state,
      upcomingMovies: action.object
    }
  } else if(action.type === "ACTUALIZANDO_MENSAJE_DE_PELICULA_AGREGADA"){ //componentes de tipo categoria
    return {
      ...state,
      addMovie: action.object
    }
  }
  return state;
};


export default createStore(reducer,{
  tokenUserId:localStorage.getItem('tokenUserId'),
  broken: false, 
  newRegister: false,
  errorLogin: false,
  emailLogin: "",
  passwordLogin: "",
  wrongEntry1Login: false,
  wrongEntry2Login: false,
  errorRegister: false,
  emailRegister: "",
  passwordRegister: "",
  wrongEntry1Register: false,
  wrongEntry2Register: false,
  redirectRegister: null,
  userFavorites: [],
  movieDeleted: false,
  nowPlayingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  addMovie: false
}, applyMiddleware(thunk));