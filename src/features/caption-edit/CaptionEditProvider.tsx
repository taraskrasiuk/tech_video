import React, { useState, PropsWithChildren } from 'react';

import CaptionEditContext from './CaptionEditContext';

// eslint-disable-next-line import/prefer-default-export
export const CaptionEditProvider = ({ children }: PropsWithChildren<any>) => {
  const [editableCaption, setEditableCaption] = useState('');

  return (
    <CaptionEditContext.Provider value={editableCaption}>
      {children({ setEditableCaption })}
    </CaptionEditContext.Provider>
  );
};
