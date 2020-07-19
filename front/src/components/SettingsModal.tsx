import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SettingsMenu } from './SettingsMenu';
import { AppState, Status } from '../types';
import { reset } from '../actions';

export function SettingsModal(props: any) {
  const dispatch = useDispatch();
  const status = useSelector((app: AppState) => {
    return app.status;
  });

  const show = status === Status.SHOW_SETTINGS;

  return show && (
    <div className="SettingsModal">
      <h2>Settings</h2>
      <SettingsMenu />
      <button onClick={() => {
        dispatch(reset());
      }}>
        Start
      </button>
    </div>
  );
}