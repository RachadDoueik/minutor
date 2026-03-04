import { Link } from 'react-router-dom';
import logoImage from '../../../assets/images/logo-white-bg.png';

const Logo = () => {
  return (
    <Link to="/" className='flex items-center gap-2 no-underline'>
      <img
        src={logoImage}
        alt="Minutor"
        className="h-20 w-auto"
      />
      <span className='hidden text-4xl font-extrabold font-["Nunito"] items-center h-20 mt-3 md:flex' >Minutor</span>
    </Link>
  );
};

export default Logo;
