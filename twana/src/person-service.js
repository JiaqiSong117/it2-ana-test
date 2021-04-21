var personService = (function () {
  function showProgressBar() {
    document.querySelector('#progress').classList.add('active');
  }

  function clearProgressBar() {
    document.querySelector('#progress').classList.remove('active');
  }
  return {
    getPersonInfoByName: function (name) {
      return new Promise((resolve, reject) => {
        showProgressBar();
        axios
          .get(
            "https://filterbubbleflask.azurewebsites.net/api/tasks/CombinedSearch/?1=" + name
          )
          .then(function (response) {
            var result = response.data || [];
            result = JSON.parse(result);
            if (result.length) {
              resolve(result);
            } else {
              window.alert("empty result!");
            }
            clearProgressBar();
          })
          .catch(function (error) {
            window.alert("wrong search!");
            clearProgressBar();
          });
      });

    }
  };
})();
