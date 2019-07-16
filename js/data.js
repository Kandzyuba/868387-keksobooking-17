'use strict';

// Модуль по работе с данными (загрузка с сервера, отправка данных формы на сервер)
(function () {
  var formPopupSuccess = document.querySelector('#success').content.querySelector('.success');

  // Загрузка данных с сервера
  var load = function (onSuccess, onError) {
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

  var adForm = document.querySelector('.ad-form');

  adForm.addEventListener('submit', function (evt) {
    upload(new FormData(adForm), function () {
      window.objects.createPopup(formPopupSuccess);

      window.success = document.querySelector('.success');
    });

    evt.preventDefault();
  });

  document.addEventListener('keydown', function (evt) {
    var pinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var mapPin = document.querySelectorAll('.map__pin');
    var main = document.querySelector('main');
    if (evt.keyCode === 27 && map.lastChild === map.querySelector('.map__card')) {
      var cardElement = document.querySelector('.map__card');
      cardElement.remove();


      Array.from(mapPin).filter(function (el) {
        return el.classList.contains('map__pin--active') ? el.classList.remove('map__pin--active') : false;
      });

    } else if (window.success.parentNode === main && evt.keyCode === 27) {
      window.success.remove();
      // document.querySelector('.map__card').remove();
      window.form.inactivePage();
      window.objects.removePins();
      adForm.reset();
      pinMain.addEventListener('click', window.form.activationPage);
    }
  });

  window.data = {
    load: load,
    upload: upload,
  };
})();
