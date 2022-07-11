import { useState } from 'react';


// Get Jokes from Joke API
async function getJokes() {
  const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,political,racist,sexist';
  let data = null;
  try {
    const response = await fetch(apiUrl);
    data = await response.json();
  } catch (error) {
    console.log('whoops', error);
  }
  return data;
}


function useJoke() {
  const [ jokes, setJokes ] = useState(null);

  const newJokes = async () => {
    const newState = await getJokes();
    if (newState.setup) {
      setJokes(`${newState.setup} ... ${newState.delivery}`);
    } else {
      setJokes(newState.joke)
    }
  };
  return [ jokes, newJokes ];
}

export default useJoke;