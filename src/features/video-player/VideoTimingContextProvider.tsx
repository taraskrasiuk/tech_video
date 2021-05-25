import React, { PropsWithChildren, useState } from 'react';
import VideoTimingContext from './VideoTimingContext';

// eslint-disable-next-line import/prefer-default-export
export const VideoTimingContextProvider = ({
  children,
}: PropsWithChildren<any>) => {
  const [currentTime, setCurrentTime] = useState(0);

  console.log('ctime', currentTime);
  return (
    <VideoTimingContext.Provider
      value={{
        currentTime,
        setCurrentTime: (t: number) => setCurrentTime(t),
      }}
    >
      {children}
    </VideoTimingContext.Provider>
  );
};
