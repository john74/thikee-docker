import {
    WeeklyForecast, HourlyForecast
} from './';


function Forecasts(props) {

    return (
        <>
        {props.weatherData.forecast_type == "weekly"
            ? <WeeklyForecast {...props} />
            : <HourlyForecast {...props} />}
        </>
    );
  }

export default Forecasts;