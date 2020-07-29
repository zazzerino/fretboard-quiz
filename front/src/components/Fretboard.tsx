import * as React from 'react';
import { FretboardDiagram } from 'fretboard-diagram';
import { useDispatch, useSelector } from 'react-redux';
import { fretboardClick } from '../actions';
import { AppState, FretboardCoord } from '../types';
import { findFret } from '../theory';

const correctColor = 'lime';
const incorrectColor = 'deeppink';

export function Fretboard() {
  const fretboardElem = React.useRef(null);
  const dispatch = useDispatch();
  const noteToGuess = useSelector((state: AppState) => state.quiz.noteToGuess);
  const clickedFret = useSelector((state: AppState) => state.quiz.clickedFret);
  const guessStatus = useSelector((state: AppState) => state.quiz.guessStatus);

  React.useEffect(() => {
    const correctGuess = guessStatus === 'CORRECT';
    const isPlaying = guessStatus == null;
    const drawDotOnHover = isPlaying && guessStatus == null;
    const dots = [];

    if (clickedFret != null) {
      const color = correctGuess ? correctColor : incorrectColor;
      dots.push({ ...clickedFret, color });

      if (!correctGuess) {
        const correctCoord = findFret(noteToGuess);
        dots.push({ ...correctCoord, color: correctColor });
      }
    }

    new FretboardDiagram({
      id: "fretboard-ref",
      dots,
      drawDotOnHover,
      showFretNums: true,
      showStringNames: true,

      onClick: (coord: FretboardCoord) => {
        if (drawDotOnHover) {
          dispatch(fretboardClick({ coord, noteToGuess }))
        }
      }
    });
  }, [dispatch, clickedFret, guessStatus, noteToGuess]);

  return (
    <div className="Fretboard">
      <div id="fretboard-ref" ref={fretboardElem} />
    </div>
  );
}
