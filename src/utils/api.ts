import axios from "axios";

const tokenAuth = localStorage.getItem("token");

const headers = {};

if (tokenAuth) {
  Object.assign(headers, { Authorization: `Bearer ${tokenAuth}` });
}

export const apiFetch = axios.create({
  baseURL: import.meta.env.API_URL || "https://take-home-test-api.nutech-integrasi.com",
  headers: headers,
});

export const setAuthToken = (token: string | null) => {
  console.log(token);
  if (token) {
    apiFetch.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // const dataToken = decodeJwt(token);
    // localStorage.setItem("user", JSON.stringify(dataToken));
    localStorage.setItem("token", token);
  } else {
    delete apiFetch.defaults.headers.common["Authorization"];
    localStorage.clear();
    window.location.replace("/login");
  }

  
};
