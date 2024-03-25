import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useEffect, useState } from 'react';
import './App.css';
import MovieList from './Components/MovieList';
import { logDOM } from '@testing-library/react';
import MovieListHeading from './Components/MovieListHeading';
import Filter from './Components/Filter';
import AddFavorites from './Components/AddFavorites';
import RemoveFavorites from './Components/RemoveFavorites';
import defaultMovies from './defaultMovies';

function App() {


{/* //////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  STATES /////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

const [movies, setMovies] = useState(defaultMovies)
const [favorites, setFavorites] = useState([]);
const [searchValue, setSearchValue] = useState('');



{/* //////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  FUNCTIONS /////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=d7c5e1bc`;

  const response = await fetch(url);
  const responseJson = await response.json();

  console.log(responseJson);
  if (responseJson.Search) {
    setMovies(responseJson.Search);
  }
  
}

useEffect (() => {
  getMovieRequest(searchValue);
},[searchValue]);


useEffect ( () =>{
  const movieFavorites = JSON.parse(
    localStorage.getItem('react-movie-app-favorites')
    );
setFavorites(movieFavorites);

},[])

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-favorites', JSON.stringify(items))
}

const addFavoriteMovie = (movie) => {

  const newFavoriteList = [...favorites, movie];
  setFavorites(newFavoriteList);
  saveToLocalStorage(newFavoriteList);
};

const removeFavoriteMovie = (movie) => {
  const newFavoriteList = favorites.filter(
    (favorites) => favorites.imdbID !== movie.imdbID 
  );

  setFavorites(newFavoriteList);
  saveToLocalStorage(newFavoriteList);
}


{/* //////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  JSX  /////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}
  return (
    <div className="App bg-black movie-app">


      {/* <header className="App-header ">
      </header> OLD HEADER DO NOT USE*/}
  {/* //////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  MAIN SECTION /////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

      
        <Container fluid className='movie-app'>
          
          <Row className='row align-items-center header mt-4 mb-2 '>
            <MovieListHeading heading='Movies' />
            <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
          </Row>
          
          <Row className='row'>
            <MovieList 
              movies={movies} 
              favoriteComponent={AddFavorites} 
              handleFavoriteClick={addFavoriteMovie} 
            />
          </Row>
          
          
  {/* //////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\  FAVORITES SECTION /////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/}

          <Row className='row align-items-center header mt-4 mb-2 '>
            <MovieListHeading heading='Your Favorites' />
          </Row>

          <Row className='row'>
            <MovieList 
              movies={favorites} 
              favoriteComponent={RemoveFavorites} 
              handleFavoriteClick={removeFavoriteMovie} 
            />
          </Row>
        
        
        </Container>
        


    </div>
  );
}

export default App;
