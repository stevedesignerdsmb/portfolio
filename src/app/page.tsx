import Hero from './components/Hero';
import Testimonial from './components/Testimonial';
import SelectedWork from './components/SelectedWork';
import WorkExperience from './components/WorkExperience';
import AboutMe from './components/AboutMe';
import AIWorkflow from './components/AIWorkflow';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-[1440px] mx-auto px-5">
        <Hero />
        <div className="flex justify-center my-16">
          <Testimonial
            quote="'It was such a pleasure working with Steve! He delivered perfection and he gave me true ease knowing that he's handling the project from beginning to end.'"
            author="Eli Glanz"
            role="CEO at ConceptLAB"
            avatar="portfolio/testimonial-avatar"
          />
        </div>
        <div className="flex items-center gap-6 my-16">
          <div className="flex-1 h-px bg-gray-200" />
          <h2 className="text-base text-gray-400 font-medium">Selected Work</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <SelectedWork />
        <div className="flex items-center gap-6 my-16">
          <div className="flex-1 h-px bg-gray-200" />
          <h2 className="text-base text-gray-400 font-medium">Recent Experience</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <WorkExperience />
        <div className="flex items-center gap-6 my-16">
          <div className="flex-1 h-px bg-gray-200" />
          <h2 className="text-base text-gray-400 font-medium">About Me</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <AboutMe />
        <div className="flex items-center gap-6 my-16">
          <div className="flex-1 h-px bg-gray-200" />
          <h2 className="text-base text-gray-400 font-medium">
            How I use AI in my daily workflow
          </h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <AIWorkflow />
        <div className="flex items-center gap-6 my-16">
          <div className="flex-1 h-px bg-gray-200" />
          <h2 className="text-base text-gray-400 font-medium">Contact me</h2>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
