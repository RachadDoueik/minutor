import { Lineicons } from "@lineiconshq/react-lineicons";
import { AlignTextCenterOutlined , HandShakeOutlined , CheckOutlined , AistudioOutlined , Buildings1Outlined , Bulb4Outlined} from "@lineiconshq/free-icons";

import FeatureCard from "../FeatureCard";

const FEATURES = [
  {
    icon: <Lineicons icon={AlignTextCenterOutlined} size={50} color="black" />,
    title: 'Smart Meeting Minutes',
    description:
      'Capture and organize meeting minutes with ease. Never miss important details or action items again.',
  },
  {
    icon: <Lineicons icon={HandShakeOutlined} size={50} color="black" />,
    title:  'Real-time Collaboration',
    description:
      ' Collaborate with team members during meetings. Share notes, comments, and updates in real-time for better team alignment.',
  },
  {
    icon: <Lineicons icon={CheckOutlined} size={50} color="black" />,
    title: 'Action Item Tracking',
    description:
      'Automatically extract and track action items from your meetings. Assign tasks, set deadlines, and monitor progress effortlessly.',
  },
  {
    icon: <Lineicons icon={AistudioOutlined} size={50} color="black" />,
    title: 'Document Generation',
    description:
      ' Automatically generate professional meeting summaries, reports, and documents. Export to PDF, Word, or share directly with stakeholders in seconds.',
  },
  {
    icon: <Lineicons icon={Buildings1Outlined} size={50} color="black" />,
    title: 'Meeting Room Booking',
    description:
      ' Reserve meeting rooms directly from the app. Check availability, book spaces, and manage room resources all in one integrated platform.',
  },
  {
    icon: <Lineicons icon={Bulb4Outlined} size={50} color="black" />,
    title: 'Smart Room Scheduling',
    description:
      ' AI-powered room recommendations based on meeting size, equipment needs, and availability. Optimize your workspace utilization effortlessly.',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-black px-6 py-16 md:py-20 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-['Nunito'] font-bold text-white md:text-4xl">
          Powerful Meeting Management Features
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-base text-white/90 md:text-lg">
          Everything you need to capture, organize, and act on your meeting insights
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
