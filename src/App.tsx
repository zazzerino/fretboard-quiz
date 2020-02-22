import React from 'react';
import './App.css';
import { Stave } from './components/Stave';
import { Fretboard } from './components/Fretboard';
import { NewNoteButton } from './components/NewNoteButton';
import { UserScore } from './components/UserScore';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Status } from './types';

// function handleKeyPress(dispatch: any, event: KeyboardEvent) {
//   switch (event.key) {
//     case 'Enter':
//       dispatch({ type: })
//   }
// }

export default function App() {
  const dispatch = useDispatch();
  const status = useSelector((state: AppState) => state.status);

  return (
    <div className="App">
      <UserScore />
      <Stave />
      <Fretboard />
      <NewNoteButton />
    </div>
  )
}

// function PlayingView() {
//   return (
//     <div className="PlayingView">
//       <UserScore />
//       <Stave />
//       <Fretboard />
//       <NewNoteButton />
//     </div>
//   );
// }

  // return (
  //   <div className="App">
  //     {(() => {
  //       switch (status) {
  //         default:
  //           return <PlayingView />;
  //       }
  //     })()}
  //   </div>
  // );