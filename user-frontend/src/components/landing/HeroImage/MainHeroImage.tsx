import MeetingIllustration from '../../../assets/images/hero-img.png';
import { memo } from 'react';

const MainHeroImage = memo(() => {
    return ( 
        <div className="relative w-full max-w-2xl shrink-0">
            <img
              src={MeetingIllustration}
              alt="Team collaborating in a meeting"
              loading='lazy'
              className="w-full rounded-2xl shadow-2xl ring-1 ring-gray-200/80 object-contain"
            />
            <div
              className="absolute -inset-4 -z-10 rounded-3xl bg-gray-300/30 blur-2xl"
              aria-hidden
            />
          </div>
     );
});
 
export default MainHeroImage;