import * as React from 'react';
import { UserScore } from './UserScore';
import { ResetButton } from './ResetButton';

export function RoundOverModal(props: any) {
  return (
    <div className="RoundOverModal">
      <UserScore />
      <ResetButton />
    </div>
  )
}