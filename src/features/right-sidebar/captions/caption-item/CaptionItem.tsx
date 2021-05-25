import React, { memo, useCallback, useMemo } from 'react';

import { Caption } from '../../../../models';

import { useVideoActions } from '../../../video-player/hooks/useVideoPlayer';
import { secondsToMls, toTimestamp } from '../../../../utils/time';

import './styles.css';

export interface CaptionItemProps extends Caption {
  isActive: boolean;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const CaptionItem = memo(
  ({
    id,
    text,
    startTime,
    endTime,
    index,
    isActive,
    isSelected,
    onSelect,
  }: CaptionItemProps) => {
    const { setSelectedCaption } = useVideoActions();

    const cssClass = useMemo(
      () =>
        `caption-item ${isSelected ? 'caption-item_selected' : ''} ${
          isActive ? 'caption-item_active' : ''
        }`,
      [isSelected, isActive]
    );

    const onCaptionClick = useCallback(() => {
      onSelect(id);
    }, [onSelect, id]);

    const onDbCaptionClick = useCallback(() => {
      setSelectedCaption({
        id,
        text,
        startTime,
        endTime,
        index,
      });
    }, [setSelectedCaption, id, text, startTime, endTime, index]);

    return (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus,jsx-a11y/click-events-have-key-events
      <div
        role="button"
        className={cssClass}
        onClick={onCaptionClick}
        onDoubleClick={onDbCaptionClick}
      >
        <div className="caption-item__section-top">
          <span>{index}</span>
        </div>
        <div className="caption-item__section-center">{text}</div>
        <div className="caption-item__section-bottom">
          <span className="caption-item__startTime">
            {toTimestamp(secondsToMls(startTime))}
          </span>
          <span className="caption-item__endTime">
            {toTimestamp(secondsToMls(endTime))}
          </span>
        </div>
      </div>
    );
  }
);
