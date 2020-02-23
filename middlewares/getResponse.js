module.exports = {
  getResponse: function getResponse(data, status, statusText, message) {
    return {
      data: data,
      status: status || 200,
      statusText: statusText || 'success',
      message: message || ''
    }
  }
}