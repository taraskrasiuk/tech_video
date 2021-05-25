export interface VideoPlayer {
  setVideoRef(ref: HTMLVideoElement): void;
  getVideoRef(): HTMLVideoElement;
  setTrackRef(ref: HTMLTrackElement): void;
  getTrackRef(): HTMLTrackElement;

  play(): void;
  pause(): void;
  seekTo(time: number): void;
}

const createVideoPlayer = (): VideoPlayer => {
  let videoRef: HTMLVideoElement | null = null;
  let trackRef: HTMLTrackElement | null = null;

  const setVideoRef = (ref: HTMLVideoElement) => {
    videoRef = ref;
  };

  const getVideoRef = (): HTMLVideoElement => videoRef!;
  const getTrackRef = (): HTMLTrackElement => trackRef!;

  const setTrackRef = (ref: HTMLTrackElement) => {
    trackRef = ref;
  };

  const play = () => {
    videoRef?.play();
  };

  const pause = () => {
    videoRef?.pause();
  };

  const seekTo = (time: number) => {
    if (videoRef) {
      videoRef.currentTime = time;
    }
  };

  return {
    setVideoRef,
    getVideoRef,
    setTrackRef,
    getTrackRef,

    play,
    pause,
    seekTo,
  };
};

const videoPlayer: VideoPlayer = createVideoPlayer();

export { videoPlayer };
