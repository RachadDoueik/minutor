import { memo } from 'react';

interface SideHeroImageProps {
   imgSrc: string;
}

const SideHeroImage = memo(({ imgSrc }: SideHeroImageProps) => {
  return (
    <div className="relative hidden shrink-0 -translate-y-44 md:block md:w-44 md:-translate-y-52 lg:w-56 lg:-translate-y-64">
      <img
        src={imgSrc}
        loading='lazy'
        alt="Notes and meeting minutes"
        className="w-full rounded-xl object-cover shadow-xl ring-1 ring-gray-200/80 aspect-[3/4]"
      />
    </div>
  );
});

export default SideHeroImage;
