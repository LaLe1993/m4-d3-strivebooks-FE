import React from 'react'
import { Button, Container, Row, Col, Card, Spinner} from 'react-bootstrap'
import books from '../data/fantasy.json';

class Home extends React.Component {

    state={
        books:[]
    }

    componentDidMount=async()=>{
        let response= await fetch(`https://test-strivebooks-app.herokuapp.com/books`,{
            headers: new Headers({
                'content-type': 'application/json'})
        })
        let books=await response.json()
        this.setState({books})
     }

    render(){
        console.log("Books: ",this.state.books)
        return (
        <div>
            <Container>
                <Row className='d-flex justify-content-center'>
                    {this.state.books.length>1 ? this.state.books.map((book)=>{
                        return(
                            <Col xs={6} md={4} lg={3} className='my-2 p-2'>
                                <Card className='mb-3 h-100' key={book.asin}>
                                    <Card.Img variant="top" src={book.img} />
                                    <Card.Body>
                                        <Card.Title>{book.title}</Card.Title>
                                        <Card.Text>
                                        Price: {book.price} $
                                        </Card.Text>
                                        <Button variant="primary">Buy now</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }):<Spinner animation="grow" variant="secondary" className='mt-5' />}
                </Row>
            </Container>
        </div>
        )
    }
}

export default Home