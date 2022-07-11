import React, { useEffect, useRef, useState } from "react";
import useJoke from "./jokes";
import { VoiceRSS } from "./voice";
import "./App.css";

// Passing Joke to VoiceRSS API
const configureTellMe = (audioRef, setIsDisabled) => (jokes) => {
  if (jokes === null) return;
  setIsDisabled(true);
  VoiceRSS.speech({
    audioRef,
    key: "f7a90f82c82041eeab06b071e31f3d15",
    src: jokes,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

function App() {
  const [jokes, newJokes] = useJoke();
  const [ isButtonDisabled, setIsDisabled ] = useState(false);
  const audioRef = useRef(null);

  const tellMe = configureTellMe(audioRef, setIsDisabled);

  useEffect(() => {
    console.log("jokes:", jokes);
    tellMe(jokes);
  }, [jokes]);

  return (
    <div className="container">
      <button onClick={
        () => {
          newJokes();
        }
      } disabled={isButtonDisabled}>
        Tell Me A Joke
      </button>
      <audio controls ref={audioRef} onEnded={() => setIsDisabled(false)}></audio>
    </div>
  );
}

export default App;

/*
1. To get Jokes API
2. Make the button work with onClick event listener
3. Make the VoiceRSS work
4. Add ended event listener to make the button disabled when the audio is playing
*/
