import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    //console.log(error.response);

    const { config, status, data } = error.response;

    const URLS = ['/auth/local/register', '/auth/local'];
    if (URLS.includes(config.url) || status === 400) {
      const errorList = data.data || [];
      const firstError = errorList.length > 0 ? errorList[0] : {};
      const messageList = firstError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;

// ---------------------------------axios client -------------------------------------------

// import axios from 'axios';
// import queryString from 'query-string';
// import firebase from 'firebase';

// // const getFirebaseToken = async () => {
// //   const currentUser = firebase.auth().currentUser;
// //   if(currentUser) return currentUser.getIdToken();
// // };

// const axiosClient = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,
//   headers: {
//     'content-type': 'application/json',
//   },
//   paramsSerializer: (params) => queryString.stringify(params),
// });

// axiosClient.interceptors.request.use(async (config) => {
//   // Handle token here ...
//   const currentUser = firebase.auth().currentUser;
//   if (currentUser) {
//     const token = await currentUser.getIdToken();
//     config.headers.Authorrization = `Bearer ${token}`;
//   }

//   // const token = await getFirebaseToken();
//   // if (token) {
//   //   config.headers.Authorrization = `Bearer ${token}`;
//   // }

//   return config;
// });

// axiosClient.interceptors.response.use(
//   (response) => {
//     if (response && response.data) {
//       return response.data;
//     }
//     return response;
//   },
//   (error) => {
//     // Handle errors
//     throw error;
//   }
// );

// export default axiosClient;
