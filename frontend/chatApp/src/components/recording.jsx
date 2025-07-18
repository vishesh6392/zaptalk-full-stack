import React, { useState, useRef } from "react";

const recording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    audioChunksRef.current = []; // Clear previous chunks
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        // Stop all tracks in the stream to release microphone
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      mediaRecorderRef.current = recorder;
    } catch (error) {
      console.error('Error starting recording:', error);
      // Provide user feedback if microphone access is denied or fails
      // Using a simple alert for demonstration, consider a custom modal in a real app.
      alert("Could not start recording. Please ensure microphone permissions are granted.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playAudio = () => {
    if (audioURL) {
      const audio = new Audio(audioURL);
      audio.play().catch(e => console.error("Error playing audio:", e));
    }
  };

  return (
    <div>
        <button
          onClick={isRecording ? stopRecording : startRecording}
        
        >
          {isRecording ? (
            <>
              <span>Stop Recording</span>
            </>
          ) : (
            <>
              
              <span>Start Recording</span>
            </>
          )}
        </button>

        {/* Play Audio Button (appears after recording) */}
        {audioURL && (
          <button
            onClick={playAudio}
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.025A1 1 0 008 8v4a1 1 0 001.555.975l3.5-2a1 1 0 000-1.95l-3.5-2z" clipRule="evenodd"></path>
            </svg>
            <span>Play Recorded Audio</span>
          </button>
        )}

        {/* Display recorded audio (optional, for direct playback) */}
        {audioURL && (
          <audio src={audioURL} controls className="w-full max-w-xs mt-4"></audio>
        )}

        <p className="text-sm text-gray-600 mt-4">
          (This example uses native browser APIs for recording.)
        </p>
   </div>
  );
};

export default recording;
