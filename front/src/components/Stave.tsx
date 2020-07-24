import React from 'react';
import * as Vex from 'vexflow';
import * as theory from '../theory';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

type VexObjs = {
  renderer: Vex.Flow.Renderer,
  context: Vex.IRenderContext,
  stave: Vex.Flow.Stave,
}

function vexFormat(notename: string) {
  const match = /\d$/.exec(notename);
  if (match != null) {
    const idx = match.index;
    return notename.slice(0, idx) + '/' + notename.slice(idx);
  } else {
    throw new Error(`${notename} does not contain an octave number.`);
  }
}

function empty(elem: Element) {
  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  }
}

function makeVexObjs(elem: HTMLElement, width: number, height: number): VexObjs {
  empty(elem);

  const renderer = new Vex.Flow.Renderer(elem, 3);
  renderer.resize(width, height);

  const context = renderer.getContext();

  const stave = new Vex.Flow.Stave(0, 0, width-1);
  stave.addClef('treble');
  stave.setContext(context);

  return { renderer, context, stave };
}

function drawNote(vexObjs: VexObjs, notename: string) {
  const vexNotename = vexFormat(notename);

  const staveNote = new Vex.Flow.StaveNote({
    keys: [vexNotename],
    duration: 'w'
  });

  const accidental = theory.parseNote(notename).accidental;
  if (accidental !== '') {
    staveNote.addAccidental(0, new Vex.Flow.Accidental(accidental));
    staveNote.setExtraLeftPx(vexObjs.stave.getWidth() / 3.8);
  } else {
    staveNote.setExtraLeftPx(vexObjs.stave.getWidth() / 3.25);
  }

  Vex.Flow.Formatter.FormatAndDraw(vexObjs.context, vexObjs.stave, [staveNote]);
}

export function Stave(props: any) {
  const [width, height] = [200, 130];
  const staveElem = React.useRef(null);
  const note = useSelector((state: AppState) => state.quiz.noteToGuess);

  React.useEffect(() => {
    const objs = makeVexObjs(staveElem.current, width, height);
    objs.stave.draw();

    if (note != null) {
      drawNote(objs, note);
    }
  });

  return (
    <div className="Stave">
      <div id="stave-ref" ref={staveElem} />
    </div>
  )
}
