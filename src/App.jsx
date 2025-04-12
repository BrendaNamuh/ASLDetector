import React, { useState,useEffect } from 'react';
import './App.css';
import Webcam from './components/Webcam.jsx'; // Your custom webcam component
import { CiCamera } from "react-icons/ci";

function App() {
  const [text, setText] = useState('');
  const [showWebcam, setShowWebcam] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    // Trigger fade in when component mounts
    setTimeout(() => setShowText(true), 100); // short delay to allow CSS transition
  }, []);


  const requestCameraAccess = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => {
        setShowWebcam(true); // Show webcam when access is granted
      })
      .catch((error) => {
        console.error("Camera access denied:", error);
        alert("Camera access is required to use this feature.");
      });
  };
  useEffect(() => {
    // Trigger fade in when component mounts
    setTimeout(() => setShowText(true), 5000); // short delay to allow CSS transition
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f5faf5] flex-col">
      <div className="h-[600px] w-[1300px] rounded-2xl bg-[#f5faf5] flex flex-row px-7 py-3 gap-7">
        
        {/* Webcam or Camera Button */}
        <div className={`rounded-xl shadow-2xl w-[820px] overflow-hidden flex flex-col justify-center items-center bg-[#4986b85f] duration-3000 ${showText ? "opacity-100" : "opacity-0"}`}>
          {showWebcam ? (
            <Webcam setText={setText} />
          ) : (
            <button
              className="webcam-button flex flex-col justify-center h-full w-full items-center"
              onClick={requestCameraAccess}
              style={{
                backgroundColor: "transparent",
                outline: "none",
                border: "none",
                color: "#f5faf5"
              }}
            >
              <CiCamera style={{ fill: "#f5faf5" }} size={53} />
              <div style={{ color: "#f5faf5" }} className="mt-3 h-fit w-fit text-lg">
                Turn on camera
              </div>
            </button>
          )}
        </div>

        {/* Text + Alphabet Display */}
        <div className="flex flex-col rounded-2xl h-full px-5 w-[600px] relative ">

          <div className={`mx-5 text-base/10  text-[25px] absolute top-0 left-0 h-[220px]  z-10 transition-opacity duration-3000 ${showText ? "opacity-100" : "opacity-0"} `}>
          The ASL Detector translates American Sign Language (ASL) into text using a random forest model. Click 'Turn on Camera' and start signing to translate your gestures in real time. Press backspace to delete the latest letter.
          </div>

            <div className={`mt-auto shadow-2xs h-[430px] w-full   border-[#4986b83d] translate-y-[10%] transition-opacity duration-4000 ${showText ? "opacity-100" : "opacity-0"}`} >
              <img
                className="h-full w-full "
                src="images/asl_alphabet.jpg"
                alt="ASL Alphabet"
              />
            </div>

        </div>
      </div>
    </div>
  );
}

export default App;
