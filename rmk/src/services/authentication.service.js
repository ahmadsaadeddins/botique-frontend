import axios from "axios";
import { api } from "../api";
import { history } from "../helpers";

const authAxios = axios.create();

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

authAxios.interceptors.request.use((config) => {
  const newConfig = config;
  const token = localStorage.getItem("token");

  newConfig.headers = {
    Authorization: `Token ${token}`,
  };
  return newConfig;
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return (
    token !== null &&
    token !== undefined &&
    token !== "8683b89959046a6de8fa269f387753196ff8217d"
  );
}

function signup(username, email, password1, password2) {
  return axios
    .post(api.auth.register, {
      username,
      email,
      password1,
      password2,
    })
    .then((res) => {
      localStorage.setItem("token", res.data.key);
      return res;
    });
}

function login(username, email, password) {
  const csrftoken = getCookie("csrftoken");
  return axios
    .post(api.auth.login, {
      username,
      email,
      password,
      headers: {
        "X-CSRFToken": csrftoken,
      },
    })
    .then((res) => {
      localStorage.setItem("token", res.data.key);
      return res;
    });
}

function logout() {
  localStorage.removeItem("token");
  history.push("/");
}

const authenticationService = {
  isAuthenticated: isAuthenticated(),
  logout,
  login,
  signup,
};

export { getCookie, authAxios, authenticationService };
