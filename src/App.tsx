import './App.css';
import ColorBendBackground from './components/ColorBendBackground';
import Navbar from './components/Navbar';
import Mainpage from './sections/mainpage';
import Projects from './sections/projects';
import Skills from './sections/skills';
import Contact from './sections/contact';
import Footer from './sections/footer';
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div>
      {/* back ground */}
      <ColorBendBackground className={"backgroundLayer"}
        colors={["#ff002f", "#15ff00", "#4800ff"]}
        rotation={0}
        speed={0.2}
        scale={1}
        frequency={1}
        warpStrength={1}
        mouseInfluence={1}
        parallax={0.5}
        noise={0}
        transparent
        autoRotate={0} />

      {/* main body */}
      <Navbar />
      <ScrollToTop />
      <Mainpage />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
