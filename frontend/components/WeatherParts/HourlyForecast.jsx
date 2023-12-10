function HourlyForecast(props) {
    const styles = props.styles;
    const forecasts = props.weatherData.forecasts.hourly;
    const units = props.weatherData.units;

    return (
        <>
        <div className={styles.hourly}>
            {forecasts.length ? (
                forecasts.map((forecast, index) => (
                    <div className={styles.forecast} key={`hourly-${index}`}>
                        <div className={styles.hours}>{`${forecast.hours}:${forecast.minutes}`}</div>
                        <div className={styles.degrees}>
                            <span className={styles.value}>{forecast.temperature}</span>
                            <span className={styles.unit}>{units.temperature_symbol}</span>
                        </div>
                        <div className={styles.description}>{forecast.description}</div>
                    </div>
                ))
            ) : (
                <p className={styles.message}>No forecasts to display</p>
            )}
        </div>
        </>
    );
  }

export default HourlyForecast;