export type Time = {
  hh: number;
  mm: number;
  ss: number;
};

const mlsToTime = (timestamp: number): Time => {
  const ss = Math.ceil(Math.round(timestamp) / 1000) % 60;
  const hh = Math.floor(timestamp / 1000 / 60 / 60);
  const mm = Math.floor(timestamp / 1000 / 60) - hh * 60;

  return {
    hh,
    mm,
    ss,
  };
};

export const secondsToMls = (seconds: number) => seconds * 1000;

export const toTimestamp = (timestamp: number): string => {
  const { hh, mm, ss }: Time = mlsToTime(timestamp);

  const hToString = hh >= 10 ? hh : `0${hh}`;
  const mToString = mm >= 10 ? mm : `0${mm}`;
  const sToString = ss >= 10 ? ss : `0${ss}`;

  return `${hToString}:${mToString}:${sToString}`;
};
