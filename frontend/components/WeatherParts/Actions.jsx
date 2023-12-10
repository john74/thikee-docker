import {
    useHandleProxyRequest,
} from '@hooks';


function Actions(props) {
    const refreshWeatherData = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const method = "GET";
        const targetEndpoint = "api/frontend/weather/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;

        const responseJSON = await useHandleProxyRequest(url, method);
        if (!responseJSON) return;

        props.setWeatherData(responseJSON);
    };

    const forecastType = props.weatherData.forecast_type;
    const updateForecastType = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        const forecastTypeSwitch = {
            "hourly": "weekly",
            "weekly": "hourly"
        }

        const newDefaultType = forecastTypeSwitch[forecastType];

        const method = "PUT";
        const targetEndpoint = "api/settings/update/";
        const url = `${props.baseUrl}/api/${method.toLowerCase()}/?targetEndpoint=${targetEndpoint}`;
        const body = {"forecast_type": newDefaultType};

        const responseJSON = await useHandleProxyRequest(url, method, body);
        if (!responseJSON) return;

        const settings = responseJSON.settings;
        const updatedWeatherData = { ...props.weatherData, forecast_type: settings.forecast_type };
        props.setWeatherData(updatedWeatherData);
    };

    const forecastActionTexts = {
        "hourly": "Weekly forecast",
        "weekly": "Hourly forecast"
    }

    const styles = props.styles;

    return (
        <>
        <div className={styles.actions}>
            <span className={styles.action} onClick={(event) => refreshWeatherData(event)}>Refresh data</span>
            <span className={styles.action} onClick={(event) => updateForecastType(event)}>{forecastActionTexts[forecastType]}</span>
        </div>
        </>
    );
  }

export default Actions;