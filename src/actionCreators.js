import axios from "axios";


//todas los componentes
const currentUser = () =>{
  return{
    type: "ESTABLECIENDO_USUARIO_ACTUAL",
    object: localStorage.getItem('tokenUserId')
  }
}

const updateBrokenTrue = () =>{
  return{
    type: "ACTUALIZANDO_BROKEN",
    object: true
  }
}

//broken
const updateBrokenFalse = () =>{
  return{
    type: "ACTUALIZANDO_BROKEN",
    object: false
  }
}

//login
const updateRedirectRegister = () =>{
  return{
    type: "ACTUALIZANDO_REDIRECTREGISTER",
    object: null
  }
}

const updateRegister = () =>{
  return dispatch => {
    dispatch ({
      type: "ACTUALIZANDO_EMAIL_DE_REGISTER",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY1_DE_REGISTER",
      object: false
    }) 
    dispatch ({
      type: "ACTUALIZANDO_PASSWORD_DE_REGISTER",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY2_DE_REGISTER",
      object: false
    })
    dispatch ({
      type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_YA_EXISTE", 
      object: false
    })
  }
}

const closeErrorLogin = () =>{
  return{
    type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_INVALIDO",
    object: false
  }
}

const changeLogin = (event) =>{
  if([event.target.name] == "email"){
    return{
      type: "ACTUALIZANDO_EMAIL_DE_LOGIN",
      object: event.target.value
    }
  } else{
    return{
      type: "ACTUALIZANDO_PASSWORD_DE_LOGIN",
      object: event.target.value
    }
  }
}

const submitLogin = (email,password) =>{
  return dispatch => { 
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password !== "" ){
      dispatch ({
        type: "ACTUALIZANDO_WRONGENTRY1_DE_LOGIN",
        object: false
      })
      dispatch ({
        type: "ACTUALIZANDO_WRONGENTRY2_DE_LOGIN",
        object: false
      })

      axios.post("https://movies-mongodb-backend.herokuapp.com/login", {
        email: email,
        password: password
      })
      .then(response => {
        if(response.data.tokenUserId != null){
          localStorage.setItem('tokenUserId', response.data.tokenUserId);
          dispatch ({ //acción para que todas las vistas reciban el nuevo user del localstorage en su key tokenUser
            type: "ESTABLECIENDO_USUARIO_ACTUAL",
            object: localStorage.getItem('tokenUserId')
          })
          dispatch ({
            type: "ACTUALIZANDO_REDIRECTLOGIN",
            object: "/"
          })
        } else{
          dispatch ({
            type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_INVALIDO",
            object: response.data.error
          })
          dispatch ({
            type: "ACTUALIZANDO_PASSWORD_DE_LOGIN",
            object: ""
          })
        }
      })
      .catch(error => {
        dispatch ({
          type: "ACTUALIZANDO_BROKEN",
          object: true
        })
        console.log(error);
      });
    } else{
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false){
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY1_DE_LOGIN",
          object: true
        })
      } else{
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY1_DE_LOGIN",
          object: false
        })
      }
      if(password === ""){
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY2_DE_LOGIN",
          object: true
        })
      } else{
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY2_DE_LOGIN",
          object: false
        })
      }
    }
  }
}

//register
const updateLogin = () =>{
  return dispatch => {
    dispatch ({
      type: "ACTUALIZANDO_EMAIL_DE_LOGIN",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY1_DE_LOGIN",
      object: false
    }) 
    dispatch ({
      type: "ACTUALIZANDO_PASSWORD_DE_LOGIN",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY2_DE_LOGIN",
      object: false
    })
    dispatch ({
      type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_INVALIDO",
      object: false
    })
  }
}

const closeUserExists = () =>{
  return{
    type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_YA_EXISTE",
    object: false
  }
}

const changeRegister = (event) =>{
  if([event.target.name] == "email"){
    return{
      type: "ACTUALIZANDO_EMAIL_DE_REGISTER",
      object: event.target.value
    }
  } else{
    return{
      type: "ACTUALIZANDO_PASSWORD_DE_REGISTER",
      object: event.target.value
    }
  }
}

const submitRegister = (email,password) =>{
  return dispatch => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && password !== "" ){
      dispatch ({
        type: "ACTUALIZANDO_WRONGENTRY1_DE_REGISTER",
        object: false
      })
      dispatch ({
        type: "ACTUALIZANDO_WRONGENTRY2_DE_REGISTER",
        object: false
      })

      axios.post("https://movies-mongodb-backend.herokuapp.com/register", {
        email: email,
        password: password
      })
      .then(response => {
        if(response.data.userId != null){
          dispatch ({
            type: "ACTUALIZANDO_REDIRECTREGISTER",
            object: "/login"
          })
          dispatch ({
            type: "ACTUALIZANDO_MENSAJE_DE_REGISTRO_EXITOSO",
            object: true
          })
          setTimeout(() =>{ 
            dispatch ({
              type: "ACTUALIZANDO_MENSAJE_DE_REGISTRO_EXITOSO",
              object: false
            })
          }, 5000);
          dispatch ({
            type: "ACTUALIZANDO_PASSWORD_DE_REGISTER",
            object: ""
          })
          dispatch ({
            type: "ACTUALIZANDO_EMAIL_DE_REGISTER",
            object: ""
          })
        } else{
          dispatch ({
            type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_YA_EXISTE",
            object: response.data.error
          })
          dispatch ({
            type: "ACTUALIZANDO_PASSWORD_DE_REGISTER",
            object: ""
          })
        }
      })
      .catch(error => {
        dispatch ({
          type: "ACTUALIZANDO_BROKEN",
          object: true
        })
        console.log(error);
      });
    } else{
      if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false){
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY1_DE_REGISTER",
          object: true
        })
      } else{
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY1_DE_REGISTER",
          object: false
        })
      }
      if(password === ""){
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY2_DE_REGISTER",
          object: true
        })
      } else{
        dispatch ({
          type: "ACTUALIZANDO_WRONGENTRY2_DE_REGISTER",
          object: false
        })
      }
    }
  }
}

//favorites
const getFavoriteMovies = (tokenUserId) =>{
  return dispatch => {
    return axios.get("https://movies-mongodb-backend.herokuapp.com/movies",{ 
      headers: { 
        'Authorization': tokenUserId
      }
    })
    .then(response => {
      dispatch ({
        type: "OBTENIENDO_PELICULAS_FAVORITAS_DEL_USUARIO",
        object: response.data
      })
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })
      console.log(error);
    })
  }
}

const deleteMovie = (movie, tokenUserId) =>{
  return dispatch => {
    return axios.get("https://movies-mongodb-backend.herokuapp.com/movies/"+movie._id+"/delete",{
      headers: { 
        'Authorization': tokenUserId
      } 
    })
    .then(response => {
      dispatch ({
        type: "ACTUALIZANDO_MENSAJE_DE_PELICULA_ELIMINADA",
        object: true
      })
      setTimeout(() =>{ 
        dispatch ({
          type: "ACTUALIZANDO_MENSAJE_DE_PELICULA_ELIMINADA",
          object: false
        })
      }, 1000);
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })
      console.log(error);
    })
  } 
}

//now-playing
const getInfoNowPlayingUser = (route,tokenUserId) =>{
  var moviesFavorites
  return dispatch => {
    return axios.get("https://movies-mongodb-backend.herokuapp.com/movies",{ //obteniendo las películas favoritas del usuario si existe
      headers: { 
        'Authorization': tokenUserId
      }
    })
    .then(response => {
      moviesFavorites = response.data 
      return axios.get(route) //obteniendo las películas   
    })
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      for (var j = 0; j < movies.length; j++) { //cambiando user:true a las películas ya favoritas
        for (var k = 0; k < moviesFavorites.length; k++) {
          if(movies[j].title === moviesFavorites[k].title){
            movies[j].user = true;
          } 
        }
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_NOWPLAYING", //estableciendo las peliculas con opción o no de agregar a favoritos
        object: movies
      })
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })  
      console.log(error);
    })
  } 
}

const getInfoNowPlayingNotUser = (route) =>{
  return dispatch => {
    return axios.get(route) //obteniendo las películas
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_NOWPLAYING", //estableciendo las peliculas sin opción de agregar a favoritos
        object: movies
      })
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })
      console.log(error);
    }) 
  } 
}

//popular
const getInfoPopularUser = (route, tokenUserId) =>{
  var moviesFavorites
  return dispatch => {
    return axios.get("https://movies-mongodb-backend.herokuapp.com/movies",{ //obteniendo las películas favoritas del usuario si existe
      headers: { 
        'Authorization': tokenUserId
      }
    })
    .then(response => {
      moviesFavorites = response.data 
      return axios.get(route) //obteniendo las películas      
    })
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      for (var j = 0; j < movies.length; j++) { //cambiando user:true a las películas ya favoritas
        for (var k = 0; k < moviesFavorites.length; k++) {
          if(movies[j].title === moviesFavorites[k].title){
            movies[j].user = true;
          } 
        }
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_POPULAR", //estableciendo las peliculas con opción o no de agregar a favoritos
        object: movies
      })
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })   
      console.log(error);
    })
  } 
}

const getInfoPopularNotUser = (route) =>{
  return dispatch => {
    return axios.get(route) //obteniendo las películas
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_POPULAR", //estableciendo las peliculas sin opción de agregar a favoritos
        object: movies
      })
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })
      console.log(error);
    }) 
  } 
}

//top-rated
const updateRedirectLogin = () =>{
  return{
    type: "ACTUALIZANDO_REDIRECTLOGIN",
    object: null
  }
}

const updateRegisterLogin = () =>{
  return dispatch => {
    dispatch ({
      type: "ACTUALIZANDO_EMAIL_DE_LOGIN",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY1_DE_LOGIN",
      object: false
    }) 
    dispatch ({
      type: "ACTUALIZANDO_PASSWORD_DE_LOGIN",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY2_DE_LOGIN",
      object: false
    })
    dispatch ({
      type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_INVALIDO",
      object: false
    })
    dispatch ({
      type: "ACTUALIZANDO_EMAIL_DE_REGISTER",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY1_DE_REGISTER",
      object: false
    }) 
    dispatch ({
      type: "ACTUALIZANDO_PASSWORD_DE_REGISTER",
      object: ""
    })
    dispatch ({
      type: "ACTUALIZANDO_WRONGENTRY2_DE_REGISTER",
      object: false
    })
    dispatch ({
      type: "ACTUALIZANDO_MENSAJE_DE_USUARIO_YA_EXISTE", 
      object: false
    })
  }
}

const getInfoTopRatedUser = (route, tokenUserId) =>{
  var moviesFavorites
  return dispatch => {
    return axios.get("https://movies-mongodb-backend.herokuapp.com/movies",{ //obteniendo las películas favoritas del usuario si existe
      headers: { 
        'Authorization': tokenUserId
      }
    }) 
    .then(response => {
      moviesFavorites = response.data 
      return axios.get(route) //obteniendo las películas      
    })
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      for (var j = 0; j < movies.length; j++) { //cambiando user:true a las películas ya favoritas
        for (var k = 0; k < moviesFavorites.length; k++) {
          if(movies[j].title === moviesFavorites[k].title){
            movies[j].user = true;
          } 
        }
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_TOP-RATED", //estableciendo las peliculas con opción o no de agregar a favoritos
        object: movies
      })
    }) 
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })   
      console.log(error);
    })
  } 
}

const getInfoTopRatedNotUser = (route) =>{
  return dispatch => {
    return axios.get(route) //obteniendo las películas
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_TOP-RATED", //estableciendo las peliculas sin opción de agregar a favoritos
        object: movies
      })
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })
      console.log(error);
    }) 
  } 
}

//upcoming
const getInfoUpcomingUser = (route, tokenUserId) =>{
  var moviesFavorites
  return dispatch => {
    return axios.get("https://movies-mongodb-backend.herokuapp.com/movies",{ //obteniendo las películas favoritas del usuario si existe
      headers: { 
        'Authorization': tokenUserId
      }
    })
    .then(response => {
      moviesFavorites = response.data 
      return axios.get(route) //obteniendo las películas     
    })
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      for (var j = 0; j < movies.length; j++) { //cambiando user:true a las películas ya favoritas
        for (var k = 0; k < moviesFavorites.length; k++) {
          if(movies[j].title === moviesFavorites[k].title){
            movies[j].user = true;
          } 
        }
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_UPCOMING", //estableciendo las peliculas con opción o no de agregar a favoritos
        object: movies
      })
    })  
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })   
      console.log(error);
    })
  } 
}

const getInfoUpcomingNotUser = (route) =>{
  return dispatch => {
    return axios.get(route) //obteniendo las películas
    .then(response => {
      var movies =[];
      for (var i = 0; i < response.data.results.length; i++) { //agregando user:false a cada película
        var data = response.data.results[i]
        data.user = false
        movies.push(data)
      }
      dispatch ({
        type: "ESTABLECIENDO_PELICULAS_DE_LA_VISTA_UPCOMING", //estableciendo las peliculas sin opción de agregar a favoritos
        object: movies
      })
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })
      console.log(error);
    }) 
  } 
}

//componentes de tipo categoria
const addFavorite = (tokenUserId,movie,route) =>{
  return dispatch => {
    return axios.post("https://movies-mongodb-backend.herokuapp.com/movies", {
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    },
    {
      headers: { 
        'Authorization': tokenUserId
      }
    })
    .then(response => {
      dispatch ({
        type: "ACTUALIZANDO_MENSAJE_DE_PELICULA_AGREGADA",
        object: true
      })
      setTimeout(() =>{ 
        dispatch ({
          type: "ACTUALIZANDO_MENSAJE_DE_PELICULA_AGREGADA",
          object: false
        })
      }, 1000);
    })
    .catch(error => {
      dispatch ({
        type: "ACTUALIZANDO_BROKEN",
        object: true
      })
      console.log(error);
    });
  } 
}


export {updateBrokenTrue, updateBrokenFalse, currentUser, updateRegisterLogin, updateRegister, updateLogin, updateRedirectRegister, closeErrorLogin, changeLogin, submitLogin, closeUserExists, changeRegister, submitRegister, getFavoriteMovies, deleteMovie, getInfoNowPlayingUser, getInfoNowPlayingNotUser, getInfoPopularUser, getInfoPopularNotUser, updateRedirectLogin, getInfoTopRatedUser, getInfoTopRatedNotUser, getInfoUpcomingUser, getInfoUpcomingNotUser, addFavorite};