import React, { PropsWithChildren, SyntheticEvent } from 'react';

import './styles.css';

export interface ActionButtonProps {
  onClick: (e: SyntheticEvent) => void;
  size: 'sm' | 'md' | 'lg';
}
export const ActionButton = ({
  children,
  onClick,
  size,
}: PropsWithChildren<ActionButtonProps>) => (
  <button type="button" className={`action-button ${size}`} onClick={onClick}>
    {children}
  </button>
);
