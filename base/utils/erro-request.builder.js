const ErrorRequest = function (errorMessage, error) {
    this.errorMessage = errorMessage;
    this.error = error;
  };
  
  exports.ErrorRequestBuilder = function () {
    return {
      setErrorMessage: function (errorMessage) {
        this.errorMessage = errorMessage;
        return this;
      },
      setError: function (error) {
        this.error = error.toString();
        return this;
      },
      build: function () {
        return new ErrorRequest(this.errorMessage, this.error);
      },
    };
  };