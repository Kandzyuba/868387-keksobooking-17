'use strict';

// Модуль по созданию объектов на странице (пины, всплывающие попапы, карточки)
(function () {
  var map = document.querySelector('.map');
  var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();
  var similarPinElement = document.querySelector('.map__pins');

  // Создание DOM элемента нового пина
  var createPin = function (dataArr) {
    var newPin = mapTemplate.cloneNode(true);

    newPin.querySelector('img').src = dataArr.author.avatar;
    newPin.style.left = dataArr.location.x + 'px';
    newPin.style.top = dataArr.location.y + 'px';
    newPin.querySelector('img').alt = dataArr.offer.type;
    // var mapPin = document.querySelector('.map__pin:not(.map__pin--main)');

    newPin.addEventListener('click', function () {
      if (map.lastChild !== map.querySelector('.map__card')) {
        window.createCard(dataArr);
        newPin.classList.add('map__pin--active');
      }
      // else {
      //   var cardElement = document.querySelector('.map__card');
      //   var mapPin = document.querySelector('.map__pin');
      //   cardElement.remove();
      //   mapPin.classList.remove('map__pin--active');
      //   window.createCard(dataArr);
      //   newPin.classList.add('map__pin--active');
      // }


      var close = document.querySelector('.popup__close');
      close.addEventListener('click', function () {
        var cardElement = document.querySelector('.map__card');
        cardElement.remove();
        newPin.classList.remove('map__pin--active');
      });
    });

    return newPin;
  };

  // Заполнение блока новыми пинами
  window.renderPins = function (data) {
    for (var i = 0; i < data.slice(0, 5).length; i++) {
      fragment.appendChild(createPin(data[i]));
    }

    similarPinElement.appendChild(fragment);
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

  var cardDetails = function (it) {
    var type = '';
    if (it === 'bungalo') {
      type = 'Бунгало';
    } else if (it === 'flat') {
      type = 'Квартира';
    } else if (it === 'house') {
      type = 'Дом';
    } else if (it === 'palace') {
      type = 'Дворец';
    }
    return type;
  };

  // Создание и заполнение DOM элемента карточки
  window.createCard = function (dataArr) {
    var cardElement = document.querySelector('#card').content.querySelector('.map__card');
    var newCard = cardElement.cloneNode(true);
    newCard.querySelector('img').src = dataArr.author.avatar;
    newCard.querySelector('.popup__title').textContent = dataArr.offer.title;
    newCard.querySelector('.popup__text--address').textContent = dataArr.offer.address;
    newCard.querySelector('.popup__text--price').textContent = dataArr.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = cardDetails(dataArr.offer.type);
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataArr.offer.checkin + ' выезд до ' + dataArr.offer.checkout;
    // newCard.querySelector('.popup__features') = dataArr.offer.features;
    newCard.querySelector('.popup__text--capacity').textContent = dataArr.offer.rooms + ' комнаты для ' + dataArr.offer.guests + ' гостей';
    newCard.querySelector('.popup__description').textContent = dataArr.offer.description;
    // newCard.querySelector('popup__photo').src = dataArr.offer.photos;
    fragment.appendChild(newCard);
    map.appendChild(fragment);
    console.log(dataArr);
    console.log(dataArr.offer.features);
    console.log(dataArr.offer.checkin);
  };
})();
