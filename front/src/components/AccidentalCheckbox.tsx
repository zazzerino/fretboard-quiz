import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../types';
import { toggleSharps, toggleFlats, toggleDoubleSharps, toggleDoubleFlats } from '../actions';

/* function SharpCheckbox() {
 *   const dispatch = useDispatch();
 *   const useSharps = useSelector((state: AppState) => state.noteOpts.useSharps);
 * 
 *   return (
 *     <div className="SharpCheckbox">
 *       <label htmlFor="useSharps">sharps</label>
 *       <input type="checkbox"
 *              name="useSharps"
 *              checked={useSharps}
 *              onChange={() => dispatch(toggleSharps())}
 *       />
 *     </div>
 *   );
 * }
 * 
 * function FlatCheckbox() {
 *   const dispatch = useDispatch();
 *   const useFlats = useSelector((state: AppState) => state.noteOpts.useFlats);
 * 
 *   return (
 *     <div className="FlatCheckbox">
 *       <label htmlFor="useFlats">flats</label>
 *       <input type="checkbox"
 *         name="useFlats"
 *         checked={useFlats}
 *         onChange={() => dispatch(toggleFlats())}
 *       />
 *     </div>
 *   );
 * }
 * 
 * function DoubleSharpCheckbox() {
 *   const dispatch = useDispatch();
 *   const useFlats = useSelector((state: AppState) => state.noteOpts.useDoubleSharps);
 * 
 *   return (
 *     <div className="DoubleSharpCheckbox">
 *       <label htmlFor="useDoubleSharps">double-sharps</label>
 *       <input type="checkbox"
 *         name="useDoubleSharps"
 *         checked={useFlats}
 *         onChange={() => dispatch(toggleDoubleSharps())}
 *       />
 *     </div>
 *   );
 * }
 * 
 * function DoubleFlatCheckbox() {
 *   const dispatch = useDispatch();
 *   const useDoubleFlats = useSelector((state: AppState) => state.noteOpts.useDoubleFlats);
 * 
 *   return (
 *     <div className="DoubleFlatCheckbox">
 *       <label htmlFor="useDoubleFlats">double-flats</label>
 *       <input type="checkbox"
 *         name="useDoubleFlats"
 *         checked={useDoubleFlats}
 *         onChange={() => dispatch(toggleDoubleFlats())}
 *       />
 *     </div>
 *   );
 * } */

export function AccidentalSelect(props: any) {
  return (
    <div className="AccidentalSelect">
      <p>Accidentals</p>
      <div className="accidental-checkboxes">
        {/* <SharpCheckbox />
            <FlatCheckbox />
            <DoubleSharpCheckbox />
            <DoubleFlatCheckbox /> */}
      </div>
    </div>
  )
}
