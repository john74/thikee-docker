function Top(props) {
    const styles = props.styles;
    const forecast = props.forecast;

    return (
        <>
        <div className={styles.top}>
            <span>{forecast.week_day_short_name}</span>
            <div className={styles.month}>
                <span>{forecast.month_day}</span>
                <span>{forecast.month_short_name}</span>
            </div>
            <div className={styles.time}>
                <span>{forecast.earliest.hours}</span>
                <span className={styles.separator}>:</span>
                <span>{forecast.earliest.minutes}</span>
            </div>
        </div>
        </>
    );
  }

export default Top;