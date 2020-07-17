import UIfx from 'uifx';

const coinAudio = require('./audio/smb_coin.wav');
const bowserFallsAudio = require('./audio/smb_bowserfalls.wav');

export const coinSound = new UIfx(coinAudio);

export const bowserFallsSound = new UIfx(bowserFallsAudio);