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

pinMain.addEventListener('click', function () {
  activePage();
});

pinMain.addEventListener('mouseup', function () {
  addAdressValue(pinPosition.x, pinPosition.y);
});
