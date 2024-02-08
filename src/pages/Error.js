import Container from 'react-bootstrap/Container'; 
import Button from 'react-bootstrap/Button';

export default function Error() {
    return (
        <Container className='text-center'>
            <h5>Error 404.</h5>
            An oopsie happened :/<br/>
            <Button href="/" variant='primary'>Return To Main</Button>
        </Container>
    )
}