import CursorDepthBackground from '../../common/CursorDepthBackground';
import MainHeroImage from '../HeroImage/MainHeroImage';
import SideHeroImage from '../HeroImage/SideHeroImage';
import NotesHero from '../../../assets/images/notes-hero.jpg';
import CalendarHero from '../../../assets/images/calendar-hero.jpg';

const Hero = () => {
  return (
    <CursorDepthBackground
      as="section"
      className="flex min-h-[calc(100vh-4rem)] min-w-0 flex-1 flex-col justify-center bg-gray-50 px-6 py-8 md:px-10"
    >
      <div className="relative z-10 mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
          Simplify Your Minutes with{' '}
          <span className="text-black font-bolder font-['Nunito'] decoration-2 decoration-gray-400 underline-offset-4">
            Minutor
          </span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
          The modern solution for meeting management, note-taking, and team collaboration.
          Transform your meetings into actionable insights with our intelligent platform.
        </p>

        <div className="flex flex-1 items-end justify-center gap-3 px-2 md:gap-6">
          {/* Left image - bottom aligned to middle of center image */}
          <SideHeroImage imgSrc={NotesHero} />
          {/* Main hero image */}
          <MainHeroImage />
          {/* Right image - bottom aligned to middle of center image */}
          <SideHeroImage imgSrc={CalendarHero} />
        </div>
      </div>
    </CursorDepthBackground>
  );
};

export default Hero;
