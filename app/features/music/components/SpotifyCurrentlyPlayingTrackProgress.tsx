import Icons from "@/features/icons/icons";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { type ReactElement, useEffect, useState } from "react";
import formatDuration from "../utils/formatDuration";

export type SpotifyCurrentlyPlayingTrackProgressType =
  | "time"
  | "bar"
  | "combined"
  | "combinedTextTop"
  | "combinedTextBottom";

type Props = {
  type: SpotifyCurrentlyPlayingTrackProgressType;
  isPlaying: boolean;
  initialProgress: number;
  duration: number;
  refreshOnEnd?: boolean;
};

export const SpotifyCurrentTrackProgress = ({
  type,
  isPlaying,
  initialProgress,
  duration,
  refreshOnEnd,
}: Props): ReactElement => {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(initialProgress);

  // Update progress every second
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Clamp to duration (make sure bar or timer never overflows)
          const clampedProgress = Math.min(prev + 1000, duration);

          // Stop updating once progress >= duration
          if (clampedProgress >= duration) clearInterval(interval);

          // Return new progress
          return clampedProgress;
        });
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [duration, isPlaying]);

  // Invalidate query on track end
  useEffect(() => {
    if (refreshOnEnd && progress >= duration) {
      queryClient.invalidateQueries({
        queryKey: ["music", "currentlyPlayingTrack"],
      });
    }
  }, [duration, refreshOnEnd, progress, queryClient.invalidateQueries]);

  if (type === "time") {
    return (
      <span className="text-right text-sm ml-2 text-neutral-700 max-[380px]:hidden dark:text-neutral-300">
        {isPlaying ? formatDuration(progress) : <PauseIcon />} / {formatDuration(duration)}
      </span>
    );
  }

  if (type === "bar") {
    return <ProgressBar progress={progress} duration={duration} showPauseIcon={!isPlaying} />;
  }

  if (type === "combined") {
    return (
      <div className="flex items-center gap-2 tabular-nums">
        <span className={"ms-1 w-[40px] inline-flex justify-end text-sm text-neutral-700 dark:text-neutral-300"}>
          {isPlaying ? formatDuration(progress) : <PauseIcon />}
        </span>

        <ProgressBar progress={progress} duration={duration} style={{ flex: "1 1 0%" }} />

        <span className="me-1 w-[40px] text-left text-sm text-neutral-700 dark:text-neutral-300">
          {formatDuration(duration)}
        </span>
      </div>
    );
  }

  if (type === "combinedTextTop") {
    return (
      <div>
        <div className="mx-1 flex items-center justify-between tabular-nums">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {isPlaying ? formatDuration(progress) : <PauseIcon />}
          </span>
          <span className="text-sm text-neutral-700 dark:text-neutral-300">{formatDuration(duration)}</span>
        </div>
        <ProgressBar progress={progress} duration={duration} />
      </div>
    );
  }

  if (type === "combinedTextBottom") {
    return (
      <div>
        <ProgressBar progress={progress} duration={duration} />
        <div className="mx-1 flex items-center justify-between tabular-nums">
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {isPlaying ? formatDuration(progress) : <PauseIcon />}
          </span>
          <span className="text-sm text-neutral-700 dark:text-neutral-300">{formatDuration(duration)}</span>
        </div>
      </div>
    );
  }

  return <ProgressBar progress={progress} duration={duration} />;
};

const ProgressBar = ({
  progress,
  duration,
  showPauseIcon,
  style,
}: {
  progress: number;
  duration: number;
  showPauseIcon?: boolean;
  style?: React.CSSProperties;
}) => {
  const progressDecimal = Number.isNaN(progress / duration) ? 0 : (progress / duration) * 100;

  return (
    <div className={"relative h-1 bg-neutral-400 dark:bg-[#4d4d4d]"} style={style}>
      <div
        className={classNames("h-full bg-neutral-700 dark:bg-white")}
        style={{ width: showPauseIcon ? 0 : `${progressDecimal.toFixed(2)}%` }}
      />

      {/* Pause icon */}
      {showPauseIcon && duration !== 0 && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-transparent"
          style={{ pointerEvents: "none" }}
        >
          <PauseIcon />
        </div>
      )}
    </div>
  );
};

const PauseIcon = () => <Icons.pause className="size-4" />;
