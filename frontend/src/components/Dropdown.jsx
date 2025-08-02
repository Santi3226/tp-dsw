import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dropdown.css';

function Drop(titulo, uno, dos, tres, cuatro) {
  return (
    <Dropdown className='Drop'>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Inicio
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">${uno}</Dropdown.Item>
        <Dropdown.Item href="#/action-2">${dos}</Dropdown.Item>
        <Dropdown.Item href="#/action-3">${tres}</Dropdown.Item>
        <Dropdown.Item href="#/action-4">${cuatro}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Drop;