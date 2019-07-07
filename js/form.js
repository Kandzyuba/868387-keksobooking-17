'use strict';

// Модуль по работе с формой (состояния, сброс, валидация)
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var formPopupError = document.querySelector('#error').content.querySelector('.error');


  // Функции добавления/удаления атрибута элементов формы
  var addAttr = function (formElements, name, value) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute(name, value);
    }
  };

  var removeAttr = function (formElements, name) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute(name);
    }
  };

  // Неактивное состояние страницы
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = map.querySelectorAll('.map__filter');
  var adressValue = adForm.querySelector('#address');

  window.inactivePage = function () {
    adressValue.value = '570, 375';
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    addAttr(adFormFieldsets, 'disabled', true);
    addAttr(mapFilters, 'disabled', true);
    pinMain.addEventListener('click', window.inicializationApp);
    pinMain.style.top = 375 + 'px';
    pinMain.style.left = 570 + 'px';
  };

  window.inactivePage();

  // Активация страницы
  window.inicializationApp = function () {
    activeScreen();
    window.load(window.activationPage, onError);
  };

  var activeScreen = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeAttr(adFormFieldsets, 'disabled');
    removeAttr(mapFilters, 'disabled');
    pinMain.removeEventListener('click', window.inicializationApp);
  };

  window.activationPage = function (data) {
    window.dataCard = data;
    window.renderPins(data);
  };

  // Логика работы попапа при ошибке запроса
  var onError = function () {
    window.createPopup(formPopupError);

    var error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    errorButton.addEventListener('click', function () {
      document.querySelector('main').removeChild(error);
    });
  };

  // Сброс формы
  var resetButton = adForm.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function () {
    adForm.reset();
    window.inactivePage();
    window.removePins();
    pinMain.addEventListener('click', window.activationPage);
  });

  // Валидация формы
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var minCost = ['0', '1000', '5000', '10000'];

  type.addEventListener('change', function () {
    var typeIndex = type.options.selectedIndex;

    var nightPrice = function (index) {
      price.placeholder = minCost[index];
      price.min = minCost[index];
    };

    nightPrice(typeIndex);
  });

  // Валидация времени прибытия/отбытия
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  var time = function (node, index) {
    node.options[index].selected = true;
  };

  timein.addEventListener('change', function () {
    var timeinIndex = timein.options.selectedIndex;

    time(timeout, timeinIndex);
  });

  timeout.addEventListener('change', function () {
    var timeoutIndex = timeout.options.selectedIndex;

    time(timein, timeoutIndex);
  });

  // Валидация + синхронизация полей с кол-вом комнат и постояльцев
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  rooms.addEventListener('change', function () {
    var roomsIndex = rooms.options.selectedIndex;
    if (roomsIndex === 0) {
      capacity.options[2].selected = true;
    } else if (roomsIndex === 1) {
      capacity.options[1].selected = true;
    } else if (roomsIndex === 2) {
      capacity.options[0].selected = true;
    } else if (roomsIndex === 3) {
      capacity.options[3].selected = true;
    }
  });

  capacity.addEventListener('change', function () {

    if ((capacity.value <= rooms.value && (rooms.value < 100 && capacity.value > 0)) || (rooms.value === 100 && capacity.value === 0)) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
    }
  });

})();
