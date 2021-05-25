import { createContext } from 'react';

export default createContext({
  currentTime: 0,
  setCurrentTime: (_: number) => {},
});
