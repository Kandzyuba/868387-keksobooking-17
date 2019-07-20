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

    newPin.addEventListener('click', function () {
      if (map.lastChild !== map.querySelector('.map__card')) {
        createCard(dataArr);
        newPin.classList.add('map__pin--active');
      } else {
        var cardElement = document.querySelector('.map__card');
        var mapPin = document.querySelectorAll('.map__pin');

        Array.from(mapPin).filter(function (el) {
          return el.classList.contains('map__pin--active') ? el.classList.remove('map__pin--active') : false;
        });

        cardElement.remove();
        createCard(dataArr);
        newPin.classList.add('map__pin--active');
      }

      var close = document.querySelector('.popup__close');
      close.addEventListener('click', function () {
        cardElement = document.querySelector('.map__card');
        cardElement.remove();
        newPin.classList.remove('map__pin--active');
      });
    });

    return newPin;
  };

  // Заполнение блока новыми пинами
  var renderPins = function (data) {
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(createPin(data[i]));
    }

    similarPinElement.appendChild(fragment);
  };

  // Удаление пинов
  var removePins = function () {
    var existingPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    existingPins.forEach(function (it) {
      it.remove();
    });
  };

  // Создание и заполнение DOM элемента всплывающего окна
  var similarPopupElement = document.querySelector('main');

  var createPopup = function (typePopup) {
    var newPopup = typePopup.cloneNode(true);
    fragment.appendChild(newPopup);
    similarPopupElement.appendChild(fragment);
  };

  var getHotelType = function (it) {
    switch (it) {
      case 'bungalo': return 'Бунгало';
      case 'flat': return 'Квартира';
      case 'house': return 'Дом';
      case 'palace': return 'Дворец';
      default: return true;
    }
  };

  // Создание и заполнение DOM элемента карточки
  var createCard = function (dataArr) {
    var cardElement = document.querySelector('#card').content.querySelector('.map__card');
    var newCard = cardElement.cloneNode(true);
    newCard.querySelector('img').src = dataArr.author.avatar;
    newCard.querySelector('.popup__title').textContent = dataArr.offer.title;
    newCard.querySelector('.popup__text--address').textContent = dataArr.offer.address;
    newCard.querySelector('.popup__text--price').textContent = dataArr.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = getHotelType(dataArr.offer.type);
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataArr.offer.checkin + ' выезд до ' + dataArr.offer.checkout;


    for (var i = 1; i < 7; i++) {
      newCard.querySelector('.popup__features').removeChild(newCard.querySelector('.popup__feature:first-child'));
    }

    dataArr.offer.features.forEach(function (item) {
      var cloneFeatureElement = document.createElement('li');
      cloneFeatureElement.classList.add('popup__feature');
      cloneFeatureElement.classList.add('popup__feature--' + item);
      newCard.querySelector('.popup__features').appendChild(cloneFeatureElement);
    });

    newCard.querySelector('.popup__text--capacity').textContent = dataArr.offer.rooms + ' комнаты для ' + dataArr.offer.guests + ' гостей';
    newCard.querySelector('.popup__description').textContent = dataArr.offer.description;

    dataArr.offer.photos.forEach(function (item) {
      newCard.querySelector('.popup__photo').src = item;
      var photoHouse = newCard.querySelector('.popup__photo');
      var clonePhotoElement = photoHouse.cloneNode(false);
      newCard.querySelector('.popup__photos').appendChild(clonePhotoElement);
    });

    newCard.querySelector('.popup__photos').removeChild(newCard.querySelector('.popup__photo:last-child'));

    fragment.appendChild(newCard);
    map.appendChild(fragment);
  };

  window.objects = {
    renderPins: renderPins,
    removePins: removePins,
    createPopup: createPopup,
    createCard: createCard
  };
})();
