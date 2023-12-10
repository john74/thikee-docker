"use client";
import { useEffect, useState } from "react";


function CurrentData(props) {
    const styles = props.styles;
    const currentData = props.weatherData.current;
    const units = props.weatherData.units;

    function getCurrentDateTime() {
        const now = new Date();
        const weekDay = now.toLocaleString('en-US', { weekday: 'long' });
        const monthDay = now.getDate();
        const month = now.toLocaleString('en-US', { month: 'long' });
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return {
            "weekDay": weekDay,
            "monthDay": monthDay,
            "month": month,
            "year": year,
            "hours": hours,
            "minutes": minutes,
        }
      }

    const currentDate = props.currentDate;
    const weekDay = currentDate.toLocaleString('en-US', { weekday: 'long' });
    const monthDay = currentDate.getDate();
    const month = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const [currentDateTime, setCurrentDateTime] = useState({
        "weekDay": weekDay,
        "monthDay": monthDay,
        "month": month,
        "year": year,
        "hours": hours,
        "minutes": minutes,
    });

    useEffect(() => {
        /*
            Calculate the time remaining until the next minute from the moment the page is first rendered.
            If there are, for example, 20 seconds remaining in the current minute,
            we don't need to wait a full 60 seconds to update the time.
            This interval adjusts for the remaining seconds, ensuring accurate and timely updates.
        */
        const interval = 60000 - new Date().getSeconds() * 1000;
        const intervalId = setInterval(() => {
            setCurrentDateTime(getCurrentDateTime());
        }, interval);

        return () => clearInterval(intervalId);
    }, [currentDateTime]);

    return (
        <>
        <div className={styles.currentData}>
            <div className={`${styles.group} ${styles.date}`}>
                <span className={styles.weekDay}>{currentDateTime.weekDay}</span>
                <span className={styles.monthDay}>{currentDateTime.monthDay}</span>
                <span className={styles.month}>{currentDateTime.month}</span>
                <span className={styles.year}>{currentDateTime.year}</span>
            </div>

            <div className={`${styles.group} ${styles.time}`}>
                <span className={styles.hour} suppressHydrationWarning={true}>{`${currentDateTime.hours}:${currentDateTime.minutes}`}</span>
            </div>

            <div className={`${styles.group} ${styles.location}`}>
                <span className={styles.city}>{currentData.city_name}</span>
                <span className={styles.countryCode}>{currentData.country_code}</span>
            </div>

            <div className={`${styles.group} ${styles.temperature}`}>
                <span className={styles.degrees}>{currentData.temp}</span>
                <span className={styles.unit}>{units.temperature_symbol}</span>
                <span className={styles.description}>{currentData.description}</span>
            </div>
        </div>
        </>
    );
  }

export default CurrentData;