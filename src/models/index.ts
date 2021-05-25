export interface Caption {
  id: string;
  index: number;
  text: string;
  startTime: number;
  endTime: number;
}

export interface VideoPlayerState {
  isReady: boolean;
  isPlaying: boolean;
  duration: number;

  activeCuesIds: string[];
  captions: Record<string, Caption>;
}
