import { createContext } from 'react';
import { VideoPlayerState } from '../../models';

const context = createContext(
  {} as {
    videoState: VideoPlayerState;
    updateVideoState: (partialState: Partial<VideoPlayerState>) => void;
  }
);

export default context;
