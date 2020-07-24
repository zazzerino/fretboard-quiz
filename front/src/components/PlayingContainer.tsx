import * as React from 'react';
import { SecondsLeft } from './SecondsLeft';
import { Stave } from './Stave';
import { Fretboard } from './Fretboard';
import { NewNoteButton } from './NewNoteButton';
import { RoundOverModal } from './RoundOverModal';
import { useSelector } from 'react-redux';
import { AppState } from '../types';

export function PlayingContainer(props: any) {
  return (
    <div className="PlayingContainer">
      <SecondsLeft />
      <Stave />
      <Fretboard />
      <NewNoteButton />
    </div>
  );
}
