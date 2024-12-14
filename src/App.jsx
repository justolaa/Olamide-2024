import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import ReactGA from 'react-ga4';
import { initializeGA } from './components/Analytics';
import 'intro.js/introjs.css';
import IntroJs from 'intro.js';

function App() {

 useEffect(() => {
    initializeGA();  // Initialize GA4 when the app loads
  }, []);

  useEffect(() => {
    // Track page view on route change
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  }, [location]);

  const startTour = () => {
    // Initialize the tour
    const intro = IntroJs();

    intro.setOptions({
      steps: [
        {
          element: '.book',
          intro: 'Click to Flip the Pages.',
        },
        {
          element: '.page',
          intro: 'Click to Turn off Audio.',
        },
        {
          element: '.orbit-control',
          intro: 'Use Mouse to Navigate around the scene.',
        },
      ],
    });

    intro.start(); // Start the tour
  };

  return (
    <>
      <UI />
      {/* Add a button to trigger the tour */}
      <button
        onClick={startTour}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          backgroundColor: "#1E90FF",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Start Tour
      </button>
      <Loader />
      <Canvas shadows camera={{ position: [-0.5, 1, 4], fov: 45 }}>
        <group position-y={0}>
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </group>
      </Canvas>
    </>
  );
}

export default App;
