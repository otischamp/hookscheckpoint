import Col from 'react-bootstrap/Col';


const Filter = (props) => {
    
    
    
    return(
        <Col md="auto">
        <input 
            className="form-control" 
            placeholder="Type to search" 
            value={props.value}
            onChange={(event) => props.setSearchValue(event.target.value)}
            ></input>
        </Col>
    )
}

export default Filter