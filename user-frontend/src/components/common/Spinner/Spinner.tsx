import Logo from '../../../assets/images/logo-white-bg.png';

const Spinner = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center"> 
        <img src={Logo} alt="Loading..." className="h-16 w-auto animate-spin rounded-full" />
        <span className="ml-2 font-900 font-['Nunito'] text-xl text-black">Loading</span>
    </div>
  );
}

export default Spinner;