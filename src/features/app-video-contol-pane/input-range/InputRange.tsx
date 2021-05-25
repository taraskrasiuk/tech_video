import React, { memo, ChangeEvent, useCallback } from 'react';
import { throttle } from 'lodash';

import './styles.css';

export interface InputRangeProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (nextCurrentTime: number) => void;
}

const DEBOUNCED_RANGE_CHANGE = 300;

export const InputRange = memo(
  ({
    onChange,
    min = 0,
    max = 5000,
    step = 1000,
    value = 0,
  }: InputRangeProps) => {
    // const [currentValue, setCurrentValue] = useState<number>(value);

    const throttledUpdate = throttle((newValue: number) => {
      if (newValue !== value) {
        onChange(newValue);
      }
    }, DEBOUNCED_RANGE_CHANGE);

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const nextCurrentTime = +(e.target.value || 0);

        throttledUpdate(nextCurrentTime);
      },
      [throttledUpdate]
    );

    return (
      <input
        type="range"
        className="input-range"
        onChange={onChangeHandler}
        min={min}
        max={max}
        step={step}
        value={value}
      />
    );
  }
);
