module.exports = {
  getResponse: function getResponse(data, status, statusText, message) {
    return {
      data: data,
      status: status,
      statusText: statusText,
      message: message
    }
  }
}