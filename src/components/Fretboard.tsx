import * as React from 'react';
import { FretboardDiagram } from 'fretboard-diagram';
import { useDispatch, useSelector } from 'react-redux';
import { fretboardClick } from '../actions';
import { AppState, Status, FretboardCoord } from '../types';
import { findFret } from '../theory';

const correctColor = 'lime';
const incorrectColor = 'deeppink';

export function Fretboard(props: any) {
  const fretboardElem = React.useRef(null);
  const dispatch = useDispatch();
  const noteToGuess = useSelector((state: AppState) => state.noteToGuess);
  const clickedFret = useSelector((state: AppState) => state.clickedFret);
  const status = useSelector((state: AppState) => state.status);

  React.useEffect(() => {
    const correctGuess = status === Status.CORRECT;
    const isPlaying = status === Status.PLAYING;
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
      drawDotOnHover: isPlaying,
      onClick: (coord: FretboardCoord) => {
        if (isPlaying) {
          dispatch(fretboardClick(coord))
        }
      }
    });
  });

  return (
    <div className="Fretboard">
      <div id="fretboard-ref" ref={fretboardElem} />
    </div>
  );
}