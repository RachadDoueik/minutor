import Header from '../components/layout/Header';
import Hero from '../components/landing/Hero';
import FeaturesSection from '../components/landing/FeaturesSection';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="min-h-0 flex-1 pt-24">
        <Hero />
        <FeaturesSection />
      </main>
    </div>
  );
};

export default LandingPage;
