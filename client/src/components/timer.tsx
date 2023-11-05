import { useEffect, useState } from 'react';
import format from 'format-duration';

interface TimerProps {
  isStopped: boolean;
}
const Timer = ({ isStopped }: TimerProps) => {
  const start = Date.now();
  let [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now() - start), 1000);
    if (isStopped) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isStopped]);

  return (
    <div className={`timer ${isStopped ? 'text-4xl text-fuchsia-500 font-bold' : ''}`}>{format(time)}</div>
  );
};

export default Timer;
