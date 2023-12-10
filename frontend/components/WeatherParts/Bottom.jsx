function Bottom(props) {
    const styles = props.styles;
    const forecast = props.forecast;
    const units = props.weatherData.units;

    return (
        <>
        <div className={styles.bottom}>
            <div className={styles.degrees}>
                <span className={styles.value}>{forecast.earliest.temperature}</span>
                <span className={styles.unit}>{units.temperature_symbol}</span>
            </div>
            <div className={styles.description}>{forecast.earliest.description}</div>
        </div>
        </>
    );
  }

export default Bottom;