'use client';
import { useEffect, useState } from "react";
import TextTransition, { presets } from "react-text-transition";

export const RotatingTitle = ({titles, timeMs = 5000}: {timeMs?: number, titles: string[]}) => {
  const [descriptorIndex, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () =>
        setIndex(
          (descriptorIndex) => (descriptorIndex + 1) % titles.length,
        ),
      timeMs, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, [titles, timeMs]);

  return (
    <TextTransition springConfig={presets.wobbly}>
      {titles[descriptorIndex % titles.length]}
    </TextTransition>
  );
};

export default RotatingTitle;
