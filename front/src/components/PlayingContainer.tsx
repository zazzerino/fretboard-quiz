import * as React from 'react';
import { SecondsLeft } from './SecondsLeft';
import { Stave } from './Stave';
import { Fretboard } from './Fretboard';
import { NewNoteButton } from './NewNoteButton';

export function PlayingContainer(props: any) {
  return (
    <div className="PlayingContainer">
        <SecondsLeft />
        <Stave />
        <Fretboard />
        <NewNoteButton />
    </div>
  )
}