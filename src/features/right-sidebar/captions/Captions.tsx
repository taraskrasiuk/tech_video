import React, { memo, useContext } from 'react';

import VideoContext from '../../video-player/VideoContext';

import { CaptionItem } from './caption-item/CaptionItem';

import './styles.css';
import CaptionEditContext from '../../caption-edit/CaptionEditContext';

// eslint-disable-next-line import/prefer-default-export
export const Captions = memo(
  ({ setEditableCaption }: { setEditableCaption: (id: string) => void }) => {
    const {
      videoState: { isReady, captions, activeCuesIds },
    } = useContext(VideoContext);
    const editableCaption = useContext(CaptionEditContext);

    const onSelect = (id: string) => {
      setEditableCaption(id);
    };

    return (
      <div className="captions">
        <div className="captions-items">
          {isReady
            ? Object.keys(captions).map((id) => (
                <CaptionItem
                  key={id}
                  id={id}
                  text={captions[id].text}
                  startTime={captions[id].startTime}
                  endTime={captions[id].endTime}
                  index={captions[id].index}
                  onSelect={onSelect}
                  isActive={activeCuesIds.some((activeId) => activeId === id)}
                  isSelected={editableCaption === id}
                />
              ))
            : 'Loading ...'}
          {}
        </div>
      </div>
    );
  }
);
