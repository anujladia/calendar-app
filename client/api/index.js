import axios from 'axios';

const handleError = (err) => {
  if (err?.response?.data) {
    const data = err.response.data;

    if (data?.message) {
      return {
        status: data.status,
        error_code: data.error_code,
        message: data?.message
      };
    } else if (data?.error_code) {
      return {
        status: data.status,
        error_code: data.error_code,
        message: `Returned with error code ${data.error_code}`
      };
    } else {
      return {
        status: data.status,
        message: `Request failed with status code ${data.status}`
      };
    }
  } else {
    return err;
  }
}

const handleData = (response) => {
  if (response?.data) {
    const data = response.data;
    return data;
  } else {
    throw new Error(`Request failed with status code ${responses.status}`);
  }
}
 
export const bookMeeting = (data) => {
  return new Promise((resolve, reject) => {
    const { date, duration } = data;

    axios.put(`/api/event/book/${date}/${duration}`)
      .then((response) => {
        const data = handleData(response);
        resolve(data);
      })
      .catch((err) => {
        reject(handleError(err));
      });
  });
};

export const fetchFreeSlots = (data) => {
  return new Promise((resolve, reject) => {
    const { date, timezone } = data;

    axios.get(`/api/event/free/${date}/${timezone}`)
      .then((response) => {
        const data = handleData(response);
        resolve(data);
      })
      .catch((err) => {
        reject(handleError(err));
      });
  });
};