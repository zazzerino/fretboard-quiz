import * as React from 'react';
import { FretboardDiagram } from 'fretboard-diagram';
import { useDispatch, useSelector } from 'react-redux';
import { fretboardClick } from '../actions';
import { AppState } from '../types';
import { isCorrectGuess } from '../theory';

const correctColor = 'lime';
const incorrectColor = 'deeppink';

export function Fretboard(props: any) {
  const fretboardElem = React.useRef(null);
  const dispatch = useDispatch();
  const clickedFret = useSelector((state: AppState) => state.clickedFret);

  const isCorrect = useSelector((state: AppState) => {
    const note = state.noteToGuess;
    const coord = state.clickedFret;

    return isCorrectGuess(note, coord);
  });

  React.useEffect(() => {
    const dots = [];

    if (clickedFret != null) {
      const color = isCorrect ? correctColor : incorrectColor;
      dots.push({...clickedFret, color});
    }

    const fd = new FretboardDiagram({
      id: "fretboard-ref",
      dots,
      // drawDotOnHover: true,
      onClick: (coord) => {
        dispatch(fretboardClick(coord))
      }
    });
  });

  return (
    <div className="Fretboard">
      <div id="fretboard-ref" ref={fretboardElem} />
    </div>
  );
}