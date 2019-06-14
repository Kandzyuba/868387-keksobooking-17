'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');

var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var MOCK = {
  arrowPin: {
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
  var arrowPin = [];

  for (var i = 1; i < 9; i++) {
    arrowPin[i] = {
      author: {
        avatar: MOCK.arrowPin.author.avatar + i + '.png',
      },
      offer: {
        type: MOCK.arrowPin.offer.type[Math.floor(Math.random() * ((MOCK.arrowPin.offer.type.length - 1) - 0 + 1))],
      },
      location: {
        x: getRandomInRange(MOCK.arrowPin.location.x.min, MOCK.arrowPin.location.x.max),
        y: getRandomInRange(MOCK.arrowPin.location.y.min, MOCK.arrowPin.location.y.max)
      },
    };
  }

  return arrowPin;
};

var data = generateData();

// Создание DOM элемента
var createPin = function (arrowPin) {
  var mapElement = mapTemplate.cloneNode(true);

  mapElement.querySelector('img').src = arrowPin.author.avatar;
  mapElement.style.left = arrowPin.location.x + 'px';
  mapElement.style.top = arrowPin.location.y + 'px';
  mapElement.querySelector('img').alt = arrowPin.offer.type;

  return mapElement;
};

// Заполнение блока элементами
var appendPin = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 1; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }
  similarListElement.appendChild(fragment);
};

appendPin();
