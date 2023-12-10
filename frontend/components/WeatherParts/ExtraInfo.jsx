function ExtraInfo(props) {
    const styles = props.styles;
    const extraInfo = props.weatherData.extra_info;
    const units = props.weatherData.units;

    return (
        <>
        <div className={styles.extraInfo}>
            <div className={styles.info}>
                <span className={styles.label}>Feels like:</span>
                <span className={styles.value}>{extraInfo.feels_like_temperature}</span>
                <span className={styles.unit}>{units.temperature_symbol}</span>
            </div>

            <div className={styles.info}>
                <span className={styles.label}>Min:</span>
                <span className={styles.value}>{extraInfo.minimum_temperature}</span>
                <span className={styles.unit}>{units.temperature_symbol}</span>
            </div>

            <div className={styles.info}>
                <span className={styles.label}>Max:</span>
                <span className={styles.value}>{extraInfo.maximum_temperature}</span>
                <span className={styles.unit}>{units.temperature_symbol}</span>
            </div>

            <div className={styles.info}>
                <span className={styles.label}>Wind:</span>
                <span className={styles.value}>{extraInfo.wind_speed}</span>
                <span className={styles.unit}>{units.speed}</span>
            </div>

            <div className={styles.info}>
                <span className={styles.label}>Humidity:</span>
                <span className={styles.value}>{extraInfo.humidity_percentage}</span>
                <span className={styles.unit}>{units.humidity}</span>
            </div>

            <div className={styles.info}>
                <span className={styles.label}>Sunrise:</span>
                <span className={styles.value}>{extraInfo.sunrise_time.hour}:{extraInfo.sunrise_time.minutes}</span>
            </div>

            <div className={styles.info}>
                <span className={styles.label}>Sunset:</span>
                <span className={styles.value}>{extraInfo.sunset_time.hour}:{extraInfo.sunset_time.minutes}</span>
            </div>
        </div>
        </>
    );
  }

export default ExtraInfo;