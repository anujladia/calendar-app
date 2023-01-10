const sendData = (res, status, data) => {
  res.status(status).send(data);
};

module.exports = sendData;
