import React from 'react';
import { CaptionEditProvider } from '../caption-edit/CaptionEditProvider';

import { Captions } from './captions/Captions';
import { FormattingControls } from './formatting-controls/FormattingControls';

import './styles.css';

// eslint-disable-next-line import/prefer-default-export
export const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <CaptionEditProvider>
        {({ setEditableCaption }: any) => (
          <>
            <FormattingControls />
            <Captions setEditableCaption={setEditableCaption} />
          </>
        )}
      </CaptionEditProvider>
    </div>
  );
};
