'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var formPopupError = document.querySelector('#error').content.querySelector('.error');

  // Неактивное состояние формы
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = map.querySelectorAll('.map__filter');
  var adressValue = adForm.querySelector('#address');

  adressValue.value = '570, 375';

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

  window.inactivePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    addAttr(adFormFieldsets, 'disabled', true);
    addAttr(mapFilters, 'disabled', true);
  };

  window.inactivePage();

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
    pinMain.addEventListener('click', window.activePage);
  });

  // Активация страницы
  window.activePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeAttr(adFormFieldsets, 'disabled');
    removeAttr(mapFilters, 'disabled');

    window.load(window.renderPins, onError);

    pinMain.removeEventListener('click', window.activePage);
  };

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

})();
