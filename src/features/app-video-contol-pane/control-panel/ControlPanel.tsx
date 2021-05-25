import React, { PropsWithChildren } from 'react';

const BtnAction = ({
  size = 'sm',
  children,
}: PropsWithChildren<{ size: 'sm' | 'md' }>) => (
  <button className={`btn-action ${size}`}>{children}</button>
);

// eslint-disable-next-line import/prefer-default-export
export const ControlPanel = () => {
  return (
    <div className="control-panel">
      <div className="control-panel__video_section">
        <BtnAction size={'md'}>Play</BtnAction>
      </div>
      <div className="control-panel__video_timestamp">1</div>
    </div>
  );
};
