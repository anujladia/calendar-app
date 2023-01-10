const sendData = (res, status = 200, data) => {
  res.status(status).send(data);
};

const sendError = (res, status = 500, error) => {
  const errorObj = {};
  if (typeof error === "string") {
    Object.assign(errorObj, {
      error_code: status,
      message: error,
    });
  } else if (typeof error === "undefined") {
    Object.assign(errorObj, {
      error_code: status,
      message: "Unknown server issue",
    });
  } else {
    Object.assign(errorObj, {
      error_code: status,
      ...error      
    });
  }

  res.status(status).send(errorObj);
};

module.exports = { sendData, sendError };
