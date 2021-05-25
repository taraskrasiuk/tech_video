import React from 'react';

import './App.css';
import { VideoContextProviderComponent } from './features/video-player/VideoContextProviderComponent';
import { VideoTimingContextProvider } from './features/video-player/VideoTimingContextProvider';
import { Content } from './features/content/Content';
import { AppVideoControlPane } from './features/app-video-contol-pane/AppVideoControlPane';

const App = () => (
  <div className="app">
    <div className="leftSideBar" />
    <div className="main-content">
      <VideoContextProviderComponent>
        <VideoTimingContextProvider>
          <>
            <Content />
            <AppVideoControlPane />
          </>
        </VideoTimingContextProvider>
      </VideoContextProviderComponent>
    </div>
  </div>
);

export default App;
