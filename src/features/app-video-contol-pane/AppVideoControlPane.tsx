import React, { memo, useContext } from 'react';

import './styles.css';

import { Progress } from '../progress/Progress';
import VideoTimingContext from '../video-player/VideoTimingContext';
import VideoContext from '../video-player/VideoContext';
import { useVideoActions } from '../video-player/hooks/useVideoPlayer';
import { secondsToMls, toTimestamp } from '../../utils/time';
import { ActionButton } from '../../components/ActionButton';

// eslint-disable-next-line import/prefer-default-export
export const AppVideoControlPane = memo(() => {
  const {
    videoState: { duration, isReady, isPlaying, captions },
  } = useContext(VideoContext);
  const { currentTime } = useContext(VideoTimingContext);
  const { seek, play, pause } = useVideoActions();

  const onSeek = (time: number) => {
    seek(time);
  };

  const timestamp = toTimestamp(secondsToMls(currentTime));
  const videoDuration = toTimestamp(secondsToMls(duration));

  const [hh, mm, ss] = timestamp.split(':');
  const [dHh, dMm, dSs] = videoDuration.split(':');

  return (
    <div className="app-video-control-pane">
      <Progress duration={duration} onSeek={onSeek} />
      <div className="controls-pane-actions">
        <div>
          {isReady && isPlaying && Object.keys(captions).length ? (
            <ActionButton onClick={pause} size="lg">
              <img src="/003-pause-button.png" alt="pause" />
            </ActionButton>
          ) : (
            <ActionButton onClick={play} size="lg">
              <img src="/002-play.png" alt="play" />
            </ActionButton>
          )}
        </div>
        <div className="timestamp_block">
          <div className="control-panel__timestamp">
            <div className="control-panel__timestamp_col">
              <span className="control-panel__timestamp__head">HH</span>
              <span className="control-panel__timestamp__val">{`${hh} :`}</span>
            </div>
            <div className="control-panel__timestamp_col">
              <span className="control-panel__timestamp__head">MM</span>
              <span className="control-panel__timestamp__val">{`${mm} :`}</span>
            </div>
            <div className="control-panel__timestamp_col">
              <span className="control-panel__timestamp__head">SS</span>
              <span className="control-panel__timestamp__val">{ss}</span>
            </div>
          </div>
          <span> - </span>
          <div className="timestamp_duration_block">
            <div className="control-panel__timestamp">
              <div className="control-panel__timestamp_col">
                <span className="control-panel__timestamp__head">HH</span>
                <span className="control-panel__timestamp__val">{`${dHh} :`}</span>
              </div>
              <div className="control-panel__timestamp_col">
                <span className="control-panel__timestamp__head">MM</span>
                <span className="control-panel__timestamp__val">{`${dMm} :`}</span>
              </div>
              <div className="control-panel__timestamp_col">
                <span className="control-panel__timestamp__head">SS</span>
                <span className="control-panel__timestamp__val">{dSs}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
