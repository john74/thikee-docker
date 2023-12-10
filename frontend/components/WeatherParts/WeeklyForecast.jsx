import {
    Top, Bottom, RestForecasts,
} from './';


function WeeklyForecast(props) {
    const styles = props.styles;
    const forecasts = props.weatherData.forecasts.weekly;

    return (
        <>
        <div className={styles.weekly}>
        {forecasts.length ? (
            forecasts.map((forecast, index) => (
                <div className={styles.forecast} key={`weekly-${index}`}>
                    <Top forecast={forecast} {...props}/>
                    <Bottom forecast={forecast} {...props}/>
                    <RestForecasts forecast={forecast} {...props}/>
                </div>
            ))
        ) : (
            <p className={styles.message}>No forecasts to display</p>
        )}
        </div>
        </>
    );
  }

export default WeeklyForecast;