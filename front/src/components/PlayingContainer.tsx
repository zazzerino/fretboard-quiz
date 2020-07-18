import * as React from 'react';
import { SecondsLeft } from './SecondsLeft';
import { Stave } from './Stave';
import { Fretboard } from './Fretboard';
import { NewNoteButton } from './NewNoteButton';
import { SettingsModal } from './SettingsModal';

export function PlayingContainer(props: any) {
  return (
    <div className="PlayingContainer">
      <SettingsModal />
      <SecondsLeft />
      <Stave />
      <Fretboard />
      <NewNoteButton />
    </div>
  )
}