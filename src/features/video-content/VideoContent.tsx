import React, { useRef } from 'react';

import './styles.css';
import { useInitialize } from '../video-player/hooks/useVideoPlayer';
import { secondsToMls, toTimestamp } from '../../utils/time';
import { Caption } from '../../models';

const VIDEO_FILE_PATH = '/test.mp4';
const WEBVTT_FILE_PATH = '/test.vtt';

const ActiveCaptions = ({
  captions,
  activeCuesIds,
}: {
  captions: Record<string, Caption>;
  activeCuesIds: string[];
}) => {
  const activeCaptionIndexes = activeCuesIds
    .map((id) => captions[id].index)
    .join('-');

  const fullDuration = toTimestamp(
    secondsToMls(
      activeCuesIds.reduce(
        (acc, cueId) =>
          acc + (captions[cueId].endTime - captions[cueId].startTime),
        0
      )
    )
  );
  return (
    <div className="about-caption-block">
      <p>
        <span>Caption</span>
        <span>{activeCaptionIndexes}</span>
      </p>
      <p>
        <span>Duration</span>
        <span>{fullDuration}</span>
      </p>
    </div>
  );
};

// eslint-disable-next-line import/prefer-default-export
export const VideoContent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);

  const [{ activeCuesIds, captions }] = useInitialize({ videoRef, trackRef });

  const hasActiveCaptions = activeCuesIds.length > 0;

  return (
    <div className="video-content">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <video ref={videoRef} preload="metadata">
        <source src={VIDEO_FILE_PATH} />
        <track
          ref={trackRef}
          label="English"
          kind="captions"
          srcLang="en"
          src={WEBVTT_FILE_PATH}
          default
        />
      </video>

      {hasActiveCaptions && (
        <ActiveCaptions captions={captions} activeCuesIds={activeCuesIds} />
      )}
    </div>
  );
};
