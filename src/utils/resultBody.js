function resultBody(data, code = 200, message = "success") {
  return {
    code,
    message,
    data,
  };
}

module.exports = {
  resultBody,
};
