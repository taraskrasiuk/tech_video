import React from 'react';

import './styles.css';
import { VideoContent } from '../video-content/VideoContent';
import { RightSidebar } from '../right-sidebar/RightSidebar';

// eslint-disable-next-line import/prefer-default-export
export const Content = () => (
  <div className="content">
    <VideoContent />
    <RightSidebar />
  </div>
);
