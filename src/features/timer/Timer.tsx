import { useState } from 'react';
import ticking from './ticking.mp3';

function padTwo(number: number) {
    return `${number}`.padStart(2, '0');
}

function formatMinutesSeconds(millisecondsSpan: number) {
    const totalSeconds = millisecondsSpan / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${padTwo(minutes)}:${padTwo(seconds)}`;
}

const audio = new Audio(ticking);
audio.loop = true;

export function Timer() {
    const [timeLeftInRound, setTimeLeftInRound] = useState(25 * 60 * 1000);
    const [runningStartTime, setRunningStartTime] = useState(0);
    const [runningEndTime, setRunningEndTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalID, setIntervalID] = useState(0);
    // const [roundsCompleted, setRoundsCompleted] = useState(0);
    // const [isOnBreak, setIsOnBreak] = useState(false);

    function getTimeLeftInRound(newRunningEndTime: number) {
        return timeLeftInRound - (newRunningEndTime - runningStartTime);
    }

    return (
        <div>
            <span>{formatMinutesSeconds(getTimeLeftInRound(runningEndTime))}</span>
            {isRunning
                ? (
                    <button onClick={() => {
                        window.clearInterval(intervalID);
                        setIsRunning(false);
                        setTimeLeftInRound(timeLeftInRound - (Date.now() - runningStartTime))
                        setRunningStartTime(0);
                        setRunningEndTime(0);
                        audio.pause();
                    }}>
                        Pause
                    </button>
                )
                : (
                    <button onClick={async () => {
                        setRunningStartTime(Date.now());
                        setRunningEndTime(Date.now());
                        setIsRunning(true);
                        setIntervalID(window.setInterval(() => {
                            setRunningEndTime(Date.now());
                        }, 1000));
                        await audio.play();
                    }}>
                        Start
                    </button>
                )
            }
        </div>
    );
}
