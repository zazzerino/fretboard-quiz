import React from 'react';
import { AppState } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleString } from '../actions';

interface StringCheckboxProps {
  stringNum: number
}

function StringCheckbox(props: StringCheckboxProps) {
  const dispatch = useDispatch();
  const stringNum = Number(props.stringNum);
  const name = `string-${stringNum}`;
  const useString = useSelector((state: AppState) => {
    return state.noteOpts.strings.includes(stringNum);
  });

  return (
    <div>
      <label htmlFor={name}>{`${stringNum}`}</label>
      <input type="checkbox"
        name={name}
        checked={useString}
        onChange={() => dispatch(toggleString(stringNum))}
      />
    </div>
  )
}

export function StringSelect() {
  return (
    <div className="StringSelect">
      <p>Strings</p>
      <div className="string-checkboxes">
        {[1, 2, 3, 4, 5, 6].map((stringNum: number) => {
          return <StringCheckbox
            stringNum={stringNum}
            key={String(stringNum)}
          />
        })}
      </div>
    </div>
  )
}
