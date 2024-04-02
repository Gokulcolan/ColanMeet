import axios from "axios";
import router from "next/router";
import { AUTH_BASE_URL, USER_BASE_URL } from "../../components/constants";

export const UserAPIService = async (method, url, body) => {
  // const userId =
  //   typeof window !== "undefined" ? sessionStorage.getItem("userId") : "";
  // const roles =
  //   typeof window !== "undefined" ? sessionStorage.getItem("roles") : "";
  const accessToken =
    typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";

  function userbaseurl() {
    return USER_BASE_URL;
  }

  return await axios({
    method: method,
    baseURL: userbaseurl(),
    url: url,
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: body,
  })
    .then((e) => {
      const { data } = e;
      if (data.status === 200) {
        return {
          status: "success",
          data: data,
        };
      } else {
        return {
          status: "error",
          message: data.message,
        };
      }
    })
    .catch((e) => {
      if (e.message === "Network Error") {
        router.push("/network-issue");
      }
      // const refreshToken =
      //   typeof window !== "undefined"
      //     ? sessionStorage.getItem("refreshToken")
      //     : "";
      // if (e.response.status === 401) {

      //   axios
      //     .post(`${baseUrl}/refreshtoken/${refreshToken}`)
      //     .then((token) => {
      //       const { data } = token;

      //       sessionStorage.setItem(
      //         "accessToken",
      //         "Bearer " + data.accessToken
      //       );
      //       sessionStorage.setItem("refreshToken", data.refreshToken);
      //       router.reload(window.location.pathname);
      //     });
      // }
      // if (userId === null || undefined || "") {
      //   router.push("/auth/login");
      // }
    });
};

export const AuthAPIService = async (method, url, body) => {
  // const userId =
  //   typeof window !== "undefined" ? sessionStorage.getItem("userId") : "";
  // const roles =
  //   typeof window !== "undefined" ? sessionStorage.getItem("roles") : "";
  
  const accessToken =
    typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";

  function authbaseurl() {
    return AUTH_BASE_URL;
  }
  return await axios({
    method: method,
    baseURL: authbaseurl(),
    url: url,
    headers: {
      Authorization: accessToken,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: body,
  })
    .then((e) => {
      const { data } = e;
      if (data.status === 200) {
        return {
          status: "success",
          data: data,
        };
      } else {
        return {
          status: "error",
          message: data.message,
        };
      }
    })
    .catch((e) => {
      if (e.message === "Network Error") {
        router.push("/network-issue");
      }
      // const refreshToken =
      //   typeof window !== "undefined"
      //     ? sessionStorage.getItem("refreshToken")
      //     : "";
      // if (e.response.status === 401) {

      //   axios
      //     .post(`${baseUrl}/refreshtoken/${refreshToken}`)
      //     .then((token) => {
      //       const { data } = token;

      //       sessionStorage.setItem(
      //         "accessToken",
      //         "Bearer " + data.accessToken
      //       );
      //       sessionStorage.setItem("refreshToken", data.refreshToken);
      //       router.reload(window.location.pathname);
      //     });
      // }
      // if (userId === null || undefined || "") {
      //   router.push("/auth/login");
      // }
    });
};
