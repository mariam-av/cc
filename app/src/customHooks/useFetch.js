import useToken from "./useToken";
import useLoggedUser from "./useLoggedUser";
import { getBaseURL } from "../config";

let useFetch = () => {
  let config = {};

  const { token, setToken } = useToken();
  const { user, setUser } = useLoggedUser();
  let baseURL = getBaseURL();

  let originalRequest = async (url, config) => {
    url = `${baseURL}${url}`;
    let response = await fetch(url, config);
    let data = await response.json();
    return { response, data };
  };

  let refreshToken = async () => {
    let response = await fetch(`${baseURL}/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: token }),
    });
    let data = await response.json();
    setToken(data.token);
    setUser(data);
    return data.token;
  };

  let callFetch = async (url, method = "GET", body) => {
    const today = new Date();
    const isExpired =
      parseInt(
        (Math.abs(new Date(user.token.expired).getTime() - today.getTime()) /
          (1000 * 60)) %
          60
      ) < 2;
    if (isExpired) {
      await refreshToken();
    }

    config = {
      method,
      headers: { "x-auth": token, "Content-Type": "application/json" },
      body,
    };
    let { response, data } = await originalRequest(url, config);
    return { response, data };
  };

  return callFetch;
};

export default useFetch;
