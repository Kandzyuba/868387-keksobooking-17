'use strict';

var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var similarListElement = map.querySelector('.map__pins');
var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

// Неактивное состояние формы
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = map.querySelectorAll('.map__filter');

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

// Подготовка МОКОв
var MOCK = {
  dataArr: {
    author: {
      avatar: 'img/avatars/user0',
    },
    offer: {
      type: ['palace', 'flat', 'house', 'bungalo'],
    },
    location: {
      x: {
        min: 150,
        max: 1000
      },
      y: {
        min: 300,
        max: 630
      }
    }
  },
};

var getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Функция генерации данных для пина
var generateData = function () {
  var dataArr = [];

  for (var i = 1; i < 9; i++) {
    dataArr[i] = {
      author: {
        avatar: MOCK.dataArr.author.avatar + i + '.png',
      },
      offer: {
        type: MOCK.dataArr.offer.type[getRandomInRange(0, MOCK.dataArr.offer.type.length - 1)]
      },
      location: {
        x: getRandomInRange(MOCK.dataArr.location.x.min, MOCK.dataArr.location.x.max),
        y: getRandomInRange(MOCK.dataArr.location.y.min, MOCK.dataArr.location.y.max)
      },
    };
  }

  return dataArr;
};

var data = generateData();

// Создание DOM элемента
var createPin = function (dataArr) {
  var mapElement = mapTemplate.cloneNode(true);

  mapElement.querySelector('img').src = dataArr.author.avatar;
  mapElement.style.left = dataArr.location.x + 'px';
  mapElement.style.top = dataArr.location.y + 'px';
  mapElement.querySelector('img').alt = dataArr.offer.type;

  return mapElement;
};

// Заполнение блока элементами
var fragment = document.createDocumentFragment();

for (var i = 1; i < data.length; i++) {
  fragment.appendChild(createPin(data[i]));
}

var renderPins = function (node, elements) {
  node.appendChild(elements);
};

// Активация формы
var pinMain = map.querySelector('.map__pin--main');
var address = adForm.querySelector('#address');
var pinPosition = {
  x: parseInt(pinMain.style.left, 10),
  y: parseInt(pinMain.style.top, 10)
};

var addAdressValue = function (x, y) {
  address.value = x + ', ' + y;
};

addAdressValue(pinPosition.x, pinPosition.y);

var activePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  removeAttr(adFormFieldsets, 'disabled');
  removeAttr(mapFilters, 'disabled');
  renderPins(similarListElement, fragment);
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

// перемещение диалога
pinMain.addEventListener('mousedown', function (evt) {
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  activePage();

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var positionY = pinMain.offsetTop - shift.y;
    var positionX = pinMain.offsetLeft - shift.x;

    var OFFSET_X_MAX = 1135;
    var OFFSET_Y_MIN = 130;
    var OFFSET_Y_MAX = 630;

    positionX = positionX < 0 ? 0 : positionX;
    positionX = positionX > OFFSET_X_MAX ? OFFSET_X_MAX : positionX;

    positionY = positionY < OFFSET_Y_MIN ? OFFSET_Y_MIN : positionY;
    positionY = positionY > OFFSET_Y_MAX ? OFFSET_Y_MAX : positionY;

    addAdressValue(positionX, positionY);

    pinMain.style.top = positionY + 'px';
    pinMain.style.left = positionX + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    addAdressValue(parseInt(pinMain.style.left, 10), parseInt(pinMain.style.top, 10));

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
