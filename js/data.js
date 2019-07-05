'use strict';

// Модуль по работе с данными (загрузка с сервера, отправка данных формы на сервер)
(function () {
  var formPopupSuccess = document.querySelector('#success').content.querySelector('.success');

  // Загрузка данных с сервера
  window.load = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
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
  window.upload = function (data, onSuccess) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  var adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      window.createPopup(formPopupSuccess);
    });

    evt.preventDefault();
  });
})();
