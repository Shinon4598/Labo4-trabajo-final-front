import { useState } from 'react';
import './assets/css/App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello World{count ? ` N°${count}` : ''}</h1>
      <button onClick={() => setCount(count + (count ? 1 : 2))}>Boton</button>
    </>
  );
}

export default App;
