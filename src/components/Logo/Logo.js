import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';
 
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt className="Tilt br4 shadow-2 flex items-center justify-center" options={{ max : 35}} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner"><img src={brain} alt="logo"/></div>
      </Tilt>
    </div>
  )
}

export default Logo;