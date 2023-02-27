import axios from 'axios';

interface getDetailWeatherData {
  lat: string;
  lon: string;
  api: string;
}

const OPENWEATHER_URL = 'https://api.openweathermap.org/data/2.5';

export const JSON_API = 'http://localhost:3010';
export const WEB_API = 'http://localhost:3000';

export const getPopupData = async () => {
  const { data } = await axios.get(`${JSON_API}/Store`);  
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
  console.log('api', lat, lon, api);
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

export const getNewStoreReport = async () => {
  const { data } = await axios.get(`${JSON_API}/newStores`);
  return data;
};

export const getInfoErrReport = async () => {
  const { data } = await axios.get(
    `${JSON_API}/infoErrModifiContents`,
  );
  return data;
};

export const getUser = async () => {
  const { data: userInfos } = await axios.get(`${JSON_API}/users`);
  return userInfos;
};

export const getLikeHate = async () => {
  const { data} = await axios.get(`${JSON_API}/likeHate`)
  return data
}

export const getFaq = async () => {
  const { data} = await axios.get(`${JSON_API}/FAQ`)
  return data
}