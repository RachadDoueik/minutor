import type { ReactNode } from 'react';
import { memo } from 'react';

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = memo(({ icon, title, description, className = '' }: FeatureCardProps) => {
  return (
    <article
      className={`rounded-lg bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md md:p-8 ${className}`.trim()}
    >
      <div className="flex justify-center">{icon}</div>
      <h3 className="mt-4 text-lg font-bold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600 md:text-base">{description}</p>
    </article>
  );
});

export default FeatureCard;
