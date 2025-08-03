import Dropdown from 'react-bootstrap/Dropdown';
import './Dropdown.css';

function Drop(props) {
  const { titulo, uno, dos, tres, cuatro } = props;
  return (
    <Dropdown className='Drop'>
      <Dropdown.Toggle className='DropToggle' variant="success" id="dropdown-basic">
        {titulo[0].toUpperCase() + titulo.slice(1)}
      </Dropdown.Toggle>

      <Dropdown.Menu className='DropMenu'>
        {uno !== undefined && (
          <>
            <Dropdown.Item className='DropItem' href={`/${titulo}/${uno[0].toLowerCase() + uno.slice(1)}`}>{uno}</Dropdown.Item>
          </>
        )}
        {dos !== undefined && (
          <>
            <Dropdown.Divider className='DropDivider'/>
            <Dropdown.Item className='DropItem'href={`/${titulo}`}>{dos}</Dropdown.Item>
          </>
        )}
        {tres !== undefined && (
          <>
            <Dropdown.Divider className='DropDivider'/>
            <Dropdown.Item className='DropItem' href={`/${titulo}`}>{tres}</Dropdown.Item>
          </>
        )}
        {cuatro !== undefined && (
          <>
            <Dropdown.Divider className='DropDivider'/>
            <Dropdown.Item className='DropItem' href={`/${titulo}`}>{cuatro}</Dropdown.Item>
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Drop;