'use strict';

// Модуль по работе с данными (загрузка с сервера, отправка данных формы на сервер)
(function () {
  var Code = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
  };

  // Загрузка данных с сервера
  var load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case Code.SUCCESS:
          onSuccess(xhr.response);
          break;
        case Code.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        case Code.UNAUTHORIZED:
          error = 'Пользователь не авторизован';
          break;
        case Code.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();
  };

  // Отправка данных формы на сервер
  var upload = function (data, onSuccess) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    load: load,
    upload: upload,
  };
})();
