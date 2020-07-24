import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { StringSelect } from './StringSelect';
import { AccidentalSelect } from './AccidentalCheckbox';

export function SettingsMenu(props: any) {
  const history = useHistory();

  return (
    <div className="SettingsMenu">
      <StringSelect />
      <AccidentalSelect />
      <button onClick={ () => history.push('/play') }>
        Start
      </button>
    </div>
  );
}
