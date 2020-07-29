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
      <h2>Instructions</h2>
      <ol>
        <li>Click the 'Play' button to start.</li>
        <li>Enter the settings you'd like to use and click 'Start'.</li>
        <li>
          It will show you a note on a staff.
          Click the fretboard where the note is played.
        </li>
        <li>
          The green dot shows you the correct answer.
        </li>
        <li>
          At the end of the round, you can submit your score
          (either anonymously or after logging in).
        </li>
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
