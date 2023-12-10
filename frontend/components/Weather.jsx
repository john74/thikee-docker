import styles from '../styles/Weather.module.css';
import {
    Actions, ExtraInfo, CurrentData,
    Forecasts,
} from './WeatherParts';


function Weather(props) {
    return (
        <>
        <div className={styles.weather}>
            <Actions styles={styles} {...props} />
            <div className={styles.data}>
                <ExtraInfo styles={styles} {...props} />
                <CurrentData styles={styles} {...props} />
                <Forecasts styles={styles} {...props} />
            </div>
        </div>
        </>
    );
  }

export default Weather;