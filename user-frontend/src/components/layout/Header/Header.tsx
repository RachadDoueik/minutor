import { Link } from "react-router-dom";
import Logo from "../../common/Logo";
import Button from "../../common/Button/Button";
import ButtonOutline from "../../common/Button/ButtonOutline";

const Header = () => {
  return (
    <header className="fixed border-0 left-0 right-0 top-0 z-50 flex w-full items-center justify-between bg-white px-6 py-1.5 shadow-sm md:px-10">
      <Logo />
      <div className="flex items-center justify-between gap-4">
        <Link to="/login">
          <ButtonOutline text="Log In"/>
        </Link>
        <Link to="/signup">
          <Button text="Get Minutor Free" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
