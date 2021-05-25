import React, { useContext } from 'react';

import VideoTimingContext from '../video-player/VideoTimingContext';

import './styles.css';

export interface ProgressProps {
  duration: number;
  onSeek: (time: number) => void;
}
export const Progress = ({ onSeek, duration }: ProgressProps) => {
  const { currentTime } = useContext(VideoTimingContext);

  const handleOnClick = (e: any) => {
    const percent =
      (e.clientX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth;

    e.target.value = Math.round(percent / 100);
    onSeek(percent * duration);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/interactive-supports-focus
    <div role="button" className="player-progress" onClick={handleOnClick}>
      <div
        className="player-progress__fill"
        style={{
          width: `${
            currentTime && duration
              ? Math.floor((100 / duration) * currentTime)
              : 0
          }%`,
        }}
      />
    </div>
  );
};
