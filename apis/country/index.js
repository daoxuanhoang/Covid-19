import axios from "axios";

export function getCountries() {
  return axios({
    url: `https://api.covid19api.com/summary`,
    method: "get",
  }).then((res) => res.data);
}

export function getDetailByCountryCode(code) {
  return axios({
    url: `https://restcountries.com/v3.1/alpha?codes=${code}`,
    method: "get",
  }).then((res) => res.data);
}
