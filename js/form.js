'use strict';

// Модуль по работе с формой (состояния, сброс, валидация)
(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var pinFilters = document.querySelector('.map__filters');
  var mapPin = document.querySelectorAll('.map__pin');
  var main = document.querySelector('main');
  var success = document.querySelector('.success');
  var error = document.querySelector('.error');
  var cardElement = document.querySelector('.map__card');

  // Функции обработчиков событий
  var formPopupError = document.querySelector('#error').content.querySelector('.error');

  var onError = function () {
    window.createPopup(formPopupError);
    error = document.querySelector('.error');
    var errorButton = error.querySelector('.error__button');

    errorButton.addEventListener('click', function () {
      document.querySelector('main').removeChild(error);
    });
  };

  var onClickSuccess = function () {
    main = document.querySelector('main');
    success = document.querySelector('.success');

    if (main.lastChild === success) {
      document.querySelector('main').removeChild(success);
      window.form.resetForm();
      window.form.inactiveScreen();
    }
  };

  var formPopupSuccess = document.querySelector('#success').content.querySelector('.success');

  var onSuccessUpload = function (evt) {
    window.data.upload(new FormData(adForm), function () {
      window.objects.createPopup(formPopupSuccess);
    });

    evt.preventDefault();

    document.addEventListener('click', onClickSuccess);
  };

  var onKeydownEsc = function (evt) {
    cardElement = document.querySelector('.map__card');
    success = document.querySelector('.success');
    error = document.querySelector('.error');
    mapPin = document.querySelectorAll('.map__pin');
    main = document.querySelector('main');

    if (evt.keyCode === 27 && main.lastChild === success) {
      window.form.resetForm();
      success.remove();
      window.form.inactiveScreen();

    } else if (evt.keyCode === 27 && main.lastChild === error) {
      window.form.resetForm();
      error.remove();
      window.form.inactiveScreen();

    } else if (evt.keyCode === 27 && map.lastChild === map.querySelector('.map__card')) {
      cardElement.remove();

      Array.from(mapPin).filter(function (el) {
        return el.classList.contains('map__pin--active') ? el.classList.remove('map__pin--active') : false;
      });
    }
  };

  var onChangeFilter = function () {
    window.objects.removePins();
    window.objects.renderPins(window.pinFilter(window.dataCard));
  };

  // Состояния страницы
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = map.querySelectorAll('.map__filter');
  var adressValue = adForm.querySelector('#address');

  var inactiveScreen = function () {
    adressValue.value = '570, 375';
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.utils.addAttr(adFormFieldsets, 'disabled', true);
    window.utils.addAttr(mapFilters, 'disabled', true);
    pinMain.style.top = 375 + 'px';
    pinMain.style.left = 570 + 'px';

    pinMain.addEventListener('click', inicializationApp);
  };

  var activeScreen = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.utils.removeAttr(adFormFieldsets, 'disabled');
    window.utils.removeAttr(mapFilters, 'disabled');

    pinMain.removeEventListener('click', inicializationApp);
  };

  // Функция активации страницы
  var activationPage = function (data) {
    window.dataCard = data;
    window.objects.renderPins(window.pinFilter(window.dataCard));

    adForm.addEventListener('submit', onSuccessUpload);
    pinFilters.addEventListener('change', onChangeFilter);
    document.addEventListener('keydown', onKeydownEsc);
  };

  // Действия с формой
  inactiveScreen();

  var inicializationApp = function () {
    activeScreen();
    window.data.load(activationPage, onError);
  };

  // Сброс формы
  var resetButton = adForm.querySelector('.ad-form__reset');

  var resetForm = function () {
    if (map.lastChild === map.querySelector('.map__card')) {
      map.querySelector('.map__card').remove();
    }
    adForm.reset();
    window.objects.removePins();
    pinMain.addEventListener('click', window.form.inicializationApp);

    document.removeEventListener('keydown', onKeydownEsc);
    pinFilters.removeEventListener('change', onChangeFilter);
    document.removeEventListener('click', onClickSuccess);
  };

  resetButton.addEventListener('click', function () {
    inactiveScreen();
    resetForm();
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

  var selectedCapacity = function (elementNumber) {
    capacity.options[elementNumber].selected = true;
  };

  rooms.addEventListener('change', function () {
    var roomsIndex = rooms.options.selectedIndex;

    switch (roomsIndex) {
      case 0: return selectedCapacity(2);
      case 1: return selectedCapacity(1);
      case 2: return selectedCapacity(0);
      case 3: return selectedCapacity(3);
      default: return true;
    }
  });

  capacity.addEventListener('change', function () {
    if (((rooms.value >= capacity.value) && rooms.value < 100 && capacity.value > 0) || (rooms.value > 99 && capacity.value < 1)) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('Количество гостей не должно превышать количество комнат');
    }
  });

  window.form = {
    inactiveScreen: inactiveScreen,
    inicializationApp: inicializationApp,
    activationPage: activationPage,
    resetForm: resetForm
  };
})();
