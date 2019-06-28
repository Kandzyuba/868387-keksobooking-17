'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

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

  var inactivePage = function () {
    addAttr(adFormFieldsets, 'disabled', true);
    addAttr(mapFilters, 'disabled', true);
  };

  inactivePage();

  window.activePage = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    removeAttr(adFormFieldsets, 'disabled');
    removeAttr(mapFilters, 'disabled');
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
