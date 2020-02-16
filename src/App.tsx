import React from 'react';
import './App.css';
import { Stave } from './components/Stave';
import { Fretboard } from './components/Fretboard';
import { NewNoteButton } from './components/NewNoteButton';

function App() {
  return (
    <div className="App">
      <Stave />
      <Fretboard />
      <NewNoteButton />
    </div>
  );
}

export default App;
