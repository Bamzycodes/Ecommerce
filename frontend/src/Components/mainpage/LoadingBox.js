import Spinner from 'react-bootstrap/Spinner'


export default function LoadingBox() {
    return(
    <Spinner animation="border" role="status" className='spin'>
        
        <span className="visually-hidden"></span>
    </Spinner>
    )
}