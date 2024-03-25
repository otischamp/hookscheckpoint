import Col from 'react-bootstrap/Col';


 const MovieList = (props) => {
    const FavoriteComponent = props.favoriteComponent

    return (
        <>
        {props.movies.map(
            (movie,index) => (
                <Col>
                    <div className='image-container d-flex justify-content-start m-3' >
                        <img src={movie.Poster} alt="movie" />
                        <div 
                            onClick={() => props.handleFavoriteClick(movie)}
                            className='overlay d-flex align-items-center justify-content-center' >
                            <FavoriteComponent />
                        </div>
                    </div>                  
                </Col>
            )
            )}
        
        </>
    )
}

export default MovieList