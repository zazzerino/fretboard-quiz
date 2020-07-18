import * as React from 'react';
import { StringSelect } from './StringSelect';
import { AccidentalSelect } from './AccidentalCheckbox';

export function SettingsMenu(props: any) {
  return (
    <div className="SettingsMenu">
      <StringSelect />
      <AccidentalSelect />
    </div>
  );
}