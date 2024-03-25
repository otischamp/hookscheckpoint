import Col from 'react-bootstrap/Col';

const MovieListHeading = (props) => {

    return (
        <Col md="auto">
        <h1>
            {props.heading}
        </h1>        
        </Col>

    )
}

export default MovieListHeading