import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect} from "react";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import 'intro.js/introjs.css';
import IntroJs from 'intro.js';
function App() {
   useEffect(() => {
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
          intro: 'Click to Turn off Audio',
        },
        {
          element: '.orbit-control',
          intro: 'Use Mouse to Navigate around the scene.',
        },
      ],
    });

    intro.start(); // Start the tour
  }, []); // Empty dependency array to run the effect once when component mounts
  return (
    <>
      <UI/>
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
