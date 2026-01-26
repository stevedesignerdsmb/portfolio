import Header from './components/Header';
import Hero from './components/Hero';
import SelectedWork from './components/SelectedWork';
import WorkExperience from './components/WorkExperience';
import AboutMe from './components/AboutMe';
import AIWorkflow from './components/AIWorkflow';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DividerSystem from './components/DividerSystem';
import SectionTitle from './components/SectionTitle';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <DividerSystem />
      <Header />
      <div className="max-w-[1440px] mx-auto px-5 relative z-10">
        <div className="max-w-[1048px] mx-auto">
          <Hero />
        </div>
        <SectionTitle>Selected Work</SectionTitle>
        <div className="max-w-[1048px] mx-auto">
          <SelectedWork />
        </div>
        <SectionTitle>Recent Experience</SectionTitle>
        <div className="max-w-[1048px] mx-auto">
          <WorkExperience />
        </div>
        <SectionTitle>About Me</SectionTitle>
        <div className="max-w-[1048px] mx-auto">
          <AboutMe />
        </div>
        <SectionTitle>How I use AI in my daily workflow</SectionTitle>
        <div className="max-w-[1048px] mx-auto">
          <AIWorkflow />
        </div>
        <SectionTitle>Contact me</SectionTitle>
        <div className="max-w-[1048px] mx-auto">
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
