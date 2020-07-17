import * as React from 'react';
import { UserScore } from './UserScore';
import { ResetButton } from './ResetButton';
import { ShowLeaderboard } from './Leaderboard';

export function RoundOverModal(props: any) {
  return (
    <div className="RoundOverModal">
      <UserScore />
      <ShowLeaderboard />
      <ResetButton />
    </div>
  )
}