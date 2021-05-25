import { RefObject, useEffect, useContext } from 'react';
import { throttle } from 'lodash';
import { videoPlayer } from '../../../services/video-player';
import { Caption } from '../../../models';
import VideoContext from '../VideoContext';
import VideoTimingContext from '../VideoTimingContext';

const UPDATE_TIMESTAMP_THROTTLING = 250;
const UPDATE_CUE_THROTTLING = 1000;

export const useVideoActions = () => {
  const {
    videoState: { captions },
    updateVideoState,
  } = useContext(VideoContext);

  const seek = (currentTime: number) => {
    videoPlayer.seekTo(currentTime);
  };

  const setSelectedCaption = (caption: Caption) => {
    seek(caption.startTime);
  };

  const play = () => {
    videoPlayer.play();
    updateVideoState({ isPlaying: true });
  };

  const pause = () => {
    videoPlayer.pause();
    updateVideoState({ isPlaying: false });
  };

  const updateCaption = ({ id, text }: { id: string; text: string }) => {
    const trackElement = videoPlayer.getTrackRef();

    const { track } = trackElement;
    const { cues } = track;

    if (cues) {
      const targetCue = Array.from(cues).find(({ id: cueId }) => cueId === id);

      if (targetCue) {
        track.removeCue(targetCue);

        const newCue = new VTTCue(targetCue.startTime, targetCue.endTime, text);
        newCue.id = targetCue.id;
        track.addCue(newCue);

        updateVideoState({
          captions: Object.keys(captions).reduce(
            (acc, captionId: string) => ({
              ...acc,
              [captionId]:
                captionId === id
                  ? { ...captions[captionId], text }
                  : captions[captionId],
            }),
            {}
          ),
        });
      }
    }
  };

  return {
    seek,
    setSelectedCaption,
    play,
    pause,
    updateCaption,
  };
};

export const useInitialize = ({
  videoRef,
  trackRef,
}: {
  videoRef: RefObject<HTMLVideoElement>;
  trackRef: RefObject<HTMLTrackElement>;
}) => {
  const { videoState, updateVideoState } = useContext(VideoContext);
  const { setCurrentTime } = useContext(VideoTimingContext);

  const { activeCuesIds } = videoState;

  const onCueChange = throttle((e: Event) => {
    const { target } = e as Event & { target: HTMLTrackElement };

    const cues = target.track.activeCues;

    if (cues && cues.length) {
      const cuesIds = Array.from(cues).map(({ id }) => id);

      if (
        cuesIds.some(
          (id) => !activeCuesIds.find((activeCueId) => activeCueId === id)
        )
      ) {
        updateVideoState({ activeCuesIds: cuesIds });
      }
    }
  }, UPDATE_CUE_THROTTLING);

  const onTimeUpdate = throttle((e: Event) => {
    const { target } = e as Event & { target: HTMLVideoElement };

    setCurrentTime(target.currentTime);
  }, UPDATE_TIMESTAMP_THROTTLING);

  useEffect(() => {
    if (videoRef.current) {
      videoPlayer.setVideoRef(videoRef.current);
    }

    if (trackRef.current) {
      videoPlayer.setTrackRef(trackRef.current);
    }
  }, [videoRef, trackRef]);

  useEffect(() => {
    const video = videoPlayer.getVideoRef();
    if (video) {
      video.addEventListener('loadedmetadata', (e: Event) => {
        const { target } = e as Event & { target: HTMLVideoElement };

        const firstTrack: TextTrack = target.textTracks[0];

        let stateForUpdate = {};

        if (firstTrack && firstTrack.cues) {
          const captions: Record<string, Caption> = Array.from(
            firstTrack.cues
          ).reduce(
            (acc, { id, text, startTime, endTime }: any, index) => ({
              ...acc,
              [id]: {
                id,
                index,
                text,
                startTime,
                endTime,
              },
            }),
            {}
          );
          stateForUpdate = { captions };
        }

        updateVideoState({
          ...stateForUpdate,
          isReady: true,
          duration: video.duration,
        });
      });

      video.addEventListener('timeupdate', onTimeUpdate);
    }
    return () => {
      if (videoPlayer.getVideoRef()) {
        videoPlayer
          .getVideoRef()
          .removeEventListener('timeupdate', onTimeUpdate);
      }
    };
  }, [updateVideoState, setCurrentTime, onTimeUpdate]);

  useEffect(() => {
    if (videoPlayer.getTrackRef()) {
      videoPlayer.getTrackRef().addEventListener('cuechange', onCueChange);
    }
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (videoPlayer.getTrackRef()) {
        videoPlayer.getTrackRef().removeEventListener('cuechange', onCueChange);
      }
    };
  });

  return [videoState];
};
