import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, newNoteToGuess } from '../actions';
import { AppState } from '../types';
import { useHistory } from 'react-router-dom';

export function Home(props: any) {
  const dispatch = useDispatch();
  const noteOpts = useSelector((state: AppState) => state.noteOpts);
  const history = useHistory();
  const previousNote = useSelector((state: AppState) => {
    return state.quiz.noteToGuess;
  });

  return (
    <div className="Home">
      <h1>Fretboard Quiz</h1>
      <ol>
        <li>Click the 'Play' button.</li>
        <li>Enter the settings you'd like to use and click 'Start'.</li>
        <li>Click where the note is played on the fretboard.</li>
        <li>Try to get the highest score.</li>
      </ol>
      <button onClick={() => {
        dispatch(reset());
        dispatch(newNoteToGuess(noteOpts, previousNote));
        history.push('/settings');
      }}>
        Play
      </button>
    </div>
  );
}
