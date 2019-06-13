'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = map.querySelector('.map__pins');

var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var POINT_WIDTH = 75;
var POINT_HEIGHT = 87;
// 75x65 + 10x22

var MOCK = {
  arrowPin: {
    author: {
      avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
    },
    offer: {
      type: ['palace', 'flat', 'house', 'bungalo'],
    },
    location: {
      x: Math.floor(Math.random() * (855 - POINT_WIDTH / 2) + POINT_WIDTH / 2),
      y: Math.floor(Math.random() * (631 - 130 + POINT_HEIGHT) + 130 + POINT_HEIGHT)
    }
  },
};

var generateArrow = function () {
  var arrowPin = [];

  for (var i = 1; i < 9; i++) {
    arrowPin[i] = {
      author: {
        avatar: MOCK.arrowPin.author.avatar[Math.floor(Math.random() * ((MOCK.arrowPin.author.avatar.length - 1) - 0 + 1))],
      },
      offer: {
        type: MOCK.arrowPin.offer.type[Math.floor(Math.random() * ((MOCK.arrowPin.offer.type.length - 1) - 0 + 1))],
      },
      location: {
        x: '"left: ' + Math.floor(Math.random() * (855 - POINT_WIDTH / 2) + POINT_WIDTH / 2) + 'px; ',
        y: 'top: ' + Math.floor(Math.random() * (631 - 130 + POINT_HEIGHT) + 130 + POINT_HEIGHT) + 'px;"'
      },
    }
  }

    return arrowPin;

};

var data = generateArrow();

// Создание DOM элемента
var createPin = function (arrowPin) {
  var mapElement = mapTemplate.cloneNode(true);

  mapElement.querySelector('img').src = arrowPin.author.avatar;
  mapElement.querySelector('.map__pin').style = arrowPin.location.x + arrowPin.location.y;
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
