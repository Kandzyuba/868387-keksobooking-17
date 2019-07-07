'use strict';

// Модуль по созданию объектов на странице (пины, всплывающие попапы, карточки)
(function () {
  var similarPinElement = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  // Создание DOM элемента нового пина
  var createPin = function (dataArr) {
    var newPin = mapTemplate.cloneNode(true);

    newPin.querySelector('img').src = dataArr.author.avatar;
    newPin.style.left = dataArr.location.x + 'px';
    newPin.style.top = dataArr.location.y + 'px';
    newPin.querySelector('img').alt = dataArr.offer.type;

    return newPin;
  };

  // Заполнение блока новыми пинами
  window.renderPins = function (data) {
    for (var i = 0; i < data.slice(0, 5).length; i++) {
      fragment.appendChild(createPin(data[i]));
    }

    similarPinElement.appendChild(fragment);
    var mapPin = document.querySelector('.map__pin:not(.map__pin--main)');
    mapPin.addEventListener('click', function () {
      window.createCard();
      mapPin.classList.add('map__pin--active');

      var close = document.querySelector('.popup__close');
      close.addEventListener('click', function () {
        var cardElement = document.querySelector('.map__card');
        cardElement.remove();
        mapPin.classList.remove('map__pin--active');
      });
    });
  };

  // Удаление пинов
  window.removePins = function () {
    var existingPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    existingPins.forEach(function (it) {
      it.remove();
    });
  };

  // Создание и заполнение DOM элемента всплывающего окна
  var similarPopupElement = document.querySelector('main');

  window.createPopup = function (typePopup) {
    var newPopup = typePopup.cloneNode(true);
    fragment.appendChild(newPopup);
    similarPopupElement.appendChild(fragment);
  };

  // Создание и заполнение DOM элемента карточки
  window.createCard = function () {
    var cardElement = document.querySelector('#card').content.querySelector('.map__card');
    var newCard = cardElement.cloneNode(true);
    fragment.appendChild(newCard);
    map.appendChild(fragment);
  };
})();
