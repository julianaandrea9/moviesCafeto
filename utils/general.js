
async function returnResponse (code, response, error, EsExitoso, res) {
    return res.status(code).json({
      Errors: [error],
      Result: JSON.stringify(response),
      IsSuccessful: EsExitoso
    })
  }
  
  module.exports = {
    returnResponse
  }