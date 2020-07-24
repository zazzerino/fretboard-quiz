import * as React from 'react';
import { SecondsLeft } from './SecondsLeft';
import { Stave } from './Stave';
import { Fretboard } from './Fretboard';
import { NewNoteButton } from './NewNoteButton';
import { SettingsModal } from './SettingsModal';
import { RoundOverModal } from './RoundOverModal';
import { useSelector } from 'react-redux';
import { AppState, Status } from '../types';

export function PlayingContainer(props: any) {
  /* const status = useSelector((app: AppState) => {
   *   return app.status;
   * }); */

  /* if (status === Status.ROUND_OVER) {
   *   return (
   *     <RoundOverModal />
   *   );
   * } else { */
    return (
      <div className="PlayingContainer">
        <SettingsModal />
        <SecondsLeft />
        <Stave />
        <Fretboard />
        <NewNoteButton />
      </div>
    );
  /* } */
}
