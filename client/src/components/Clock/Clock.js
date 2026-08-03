import { useEffect, useState } from "react";
import "./clock.css";

export default function Clock() {
    const [time, setTime] = useState(() => new Date());

    useEffect(() => {
        // Updates frequently for a smoother second hand
        const timer = window.setInterval(() => {
            setTime(new Date());
        }, 50);

        return () => window.clearInterval(timer);
    }, []);

    const milliseconds = time.getMilliseconds();
    const seconds = time.getSeconds() + milliseconds / 1000;
    const minutes = time.getMinutes() + seconds / 60;
    const hours = (time.getHours() % 12) + minutes / 60;

    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6;
    const hourAngle = hours * 30;

    return (
        <div
            className="clock"
            role="img"
            aria-label={`Current time: ${time.toLocaleTimeString()}`}
        >
            {Array.from({ length: 12 }, (_, index) => (
                <div
                    className="hour-mark"
                    key={index}
                    style={{ transform: `rotate(${index * 30}deg)`}}
                >
                    <span />
                </div>
            ))}

            <div
                className="hand hour-hand"
                style={{ transform: `rotate(${hourAngle}deg)` }}
            />

            <div
                className="hand minute-hand"
                style={{ transform: `rotate(${minuteAngle}deg)` }}
            />

            <div
                className="hand second-hand"
                style={{ transform: `rotate(${secondAngle}deg)` }}
            />

            <div className="clock-center" />
        </div>
    );
}