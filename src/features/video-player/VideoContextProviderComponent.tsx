import React, { PropsWithChildren, useState } from 'react';

import VideoContext from './VideoContext';
import { VideoPlayerState } from '../../models';

const defaultState = {
  isReady: false,
  isPlaying: false,
  duration: 0,

  activeCuesIds: [],
  captions: {},
};

// eslint-disable-next-line import/prefer-default-export
export const VideoContextProviderComponent = ({
  children,
}: PropsWithChildren<any>) => {
  const [videoState, setState] = useState<VideoPlayerState>(defaultState);

  const updateVideoState = (partialState: Partial<VideoPlayerState>) => {
    setState({
      ...videoState,
      ...partialState,
    });
  };

  return (
    <VideoContext.Provider value={{ videoState, updateVideoState }}>
      {children}
    </VideoContext.Provider>
  );
};
