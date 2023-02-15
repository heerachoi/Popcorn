import axios from 'axios';

interface getDetailWeatherData {
  lat: string;
  lon: string;
  api: string;
}

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5';

export const getDetailData = async () => {
  const { data } = await axios.get('http://localhost:3010/Store');
  return data;
};

export const getDetailWeatherData = async ({
  lat,
  lon,
  api,
}: getDetailWeatherData) => {
  const { data } = await axios.get(
    `${OPENWEATHER_URL}/weather?lat=${lat}&lon=${lon}&appid=${api}&lang=kr&units=metric`,
  );
  return data;
};

export const getDetailAirPollutionData = async ({
  lat,
  lon,
  api,
}: getDetailWeatherData) => {
  const { data } = await axios.get(
    `${OPENWEATHER_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${api}`,
  );
  return data;
};
