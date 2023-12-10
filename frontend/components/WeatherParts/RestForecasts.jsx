function RestForecasts(props) {
    const styles = props.styles;
    const forecasts = props.forecast.rest;
    const units = props.weatherData.units;

    return (
        <>
        <div className={styles.restForecasts}>
        {forecasts.map((forecast, index) => (
            <div className={styles.forecast} key={`rest-${index}`}>
                <div>{`${forecast.hours}:${forecast.minutes}`}</div>
                <div>{forecast.temperature}</div>
                <div className={styles.unit}>{units.temperature_symbol}</div>
                <div>{forecast.description}</div>
            </div>
        ))}
        </div>
        </>
    );
  }

export default RestForecasts;