import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Placeholder.css';

function Placehold(props) {
  const { titulo, boton, texto, image } = props;
  return (
    <div className="d-flex justify-content-around">
      <Card className="Card" style={{ width: '20rem' }}>
        <Card.Img className="CardImg" variant="top" src={image} />
        <Card.Body className="CardBody">
          <Card.Title className="CardTitle">{titulo}</Card.Title>
          <Card.Text className="CardText">
            {texto}
          </Card.Text>
          <Button className="CardButton">{boton}</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Placehold;