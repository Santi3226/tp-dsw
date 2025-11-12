import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carrousel.css';


function Carrousel() {
  return (
    <Carousel className='Carrousel'>
      <Carousel.Item>
        <img className='CarrouselImg' src="/lab1.png" alt="Primer diapositiva, bioquimicos trabajando" />
        <Carousel.Caption className='CarrouselCaption'>
          <h3>Confiabilidad</h3>
          <p>Nuestro laboratorio se compromete a ofrecer resultados precisos y confiables.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='CarrouselImg' src="/lab2.jpg" alt="Segunda diapositiva, muestra de sangre" />
        <Carousel.Caption className='CarrouselCaption'>
          <h3>Seguridad</h3>
          <p>Garantizamos su seguridad y privacidad en todo momento.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='CarrouselImg' src="/lab3.png" alt="Tercera diapositiva, bioquímica en acción" />
        <Carousel.Caption className='CarrouselCaption'>
          <h3>Innovación</h3>
          <p>Fomentamos la investigación y el desarrollo de nuevas soluciones.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrousel;