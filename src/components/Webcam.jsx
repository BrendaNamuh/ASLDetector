import React, { useRef, useEffect, useState } from 'react';

function Webcam() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState('');
  const [word,setWord] = useState('');

  // Ask for camera access and display the stream
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error('Error accessing webcam:', err);
      });


      // Listen for backspace to delete latest charcher
      const handleKeyDown = (event) => {
        if (event.key === 'Backspace') {
          setWord(prev => prev.slice(0, -1)); // Remove last character
        }
      };
    
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };


      
  }, []);

  // Capture and send a frame every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!videoRef.current || !canvasRef.current) return;

      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      const imageData = canvasRef.current.toDataURL('image/jpeg');

      fetch("https://3.138.121.255/predict", {
      // fetch('https://asl-backend-26m3.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }),
      })
        .then((res) => res.json())
        .then((data) => {
          setPrediction(data.character);
          setWord(prev => prev + data.character)
        })
        .catch((err) => console.error('Prediction error:', err));
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    
    <div className="items-center justify-around flex-col flex h-full w-full">
      
      <video ref={videoRef} className="w-full object-cover" />

      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ display: 'none' }}
      />

      <div className="mt-auto flex justify-center  items-center w-full h-50  text-white p-2 rounded shadow ">
        <div className='text-6xl text-white'>
        {word + '...'}
        </div>
      </div>
    </div>
  );
}

export default Webcam;

