import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';

import CaptionEditContext from '../../caption-edit/CaptionEditContext';
import VideoContext from '../../video-player/VideoContext';
import { useVideoActions } from '../../video-player/hooks/useVideoPlayer';

import './styles.css';
import { ActionButton } from '../../../components/ActionButton';

interface ActionsProps {
  editing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

const Actions = ({ editing, onSave, onCancel, onEdit }: ActionsProps) => {
  const handleOnEdit = (e: SyntheticEvent) => {
    e.preventDefault();
    onEdit();
  };

  const handleOnSave = (e: SyntheticEvent) => {
    e.preventDefault();
    onSave();
  };

  const handleOnCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="formatting-controls__actions">
      {!editing ? (
        <ActionButton onClick={handleOnEdit} size="sm">
          <img alt="edit-icon" src="/002-pen.png" />
        </ActionButton>
      ) : (
        <>
          <ActionButton onClick={handleOnCancel} size="sm">
            <img alt="cancel-icon" src="003-close.png" />
          </ActionButton>
          <ActionButton onClick={handleOnSave} size="sm">
            <img alt="save-icon" src="/001-floppy-disk.png" />
          </ActionButton>
        </>
      )}
    </div>
  );
};

const EditableTextArea = ({
  editable,
  text,
  onChange,
}: {
  editable: boolean;
  text: string;
  onChange: (value: string) => void;
}) => {
  const handleOnChange = (e: SyntheticEvent) => {
    const { value } = e.target as any;

    if (value && value !== text) {
      onChange(value);
    }
  };

  const handleOnTextAreClick = (e: SyntheticEvent) => {
    e.stopPropagation();
  };

  return (
    <textarea
      className="formatting-controls__textarea"
      value={text}
      onClick={handleOnTextAreClick}
      onChange={handleOnChange}
      rows={3}
      disabled={!editable}
    />
  );
};

// eslint-disable-next-line import/prefer-default-export
export const FormattingControls = () => {
  const editableCaption = useContext(CaptionEditContext);
  const {
    videoState: { captions },
  } = useContext(VideoContext);
  const { updateCaption } = useVideoActions();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(
    captions[editableCaption]?.text || ''
  );

  useEffect(() => {
    if (!isEditing && editableCaption) {
      if (updatedText !== captions[editableCaption].text) {
        setUpdatedText(captions[editableCaption].text);
      }
    }
  }, [isEditing, editableCaption, captions, setUpdatedText, updatedText]);

  const onEditChange = (value: string) => {
    setUpdatedText(value);
  };

  const onEdit = () => {
    setIsEditing(true);
  };

  const onSave = () => {
    setIsEditing(false);

    updateCaption({ id: editableCaption, text: updatedText });
  };

  const onCancel = () => {
    setIsEditing(false);
    setUpdatedText(captions[editableCaption].text);
  };

  return (
    <div className="formatting-controls">
      {editableCaption && (
        <div>
          <EditableTextArea
            text={updatedText}
            onChange={onEditChange}
            editable={isEditing}
          />
          <Actions
            editing={isEditing}
            onSave={onSave}
            onCancel={onCancel}
            onEdit={onEdit}
          />
        </div>
      )}
      {!editableCaption && <span>No caption for editing</span>}
    </div>
  );
};
