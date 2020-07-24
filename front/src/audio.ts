import UIfx from 'uifx';

// @ts-ignore
import coinAudio from './audio/smb_coin.wav';
// @ts-ignore
import bowserFallsAudio from './audio/smb_bowserfalls.wav';

export const correctSound = new UIfx(coinAudio);

export const incorrectSound = new UIfx(bowserFallsAudio);
