'use strict';

// Создание объектов на странице (пины, всплывающие попапы, карточки)
(function () {
  var similarPinElement = document.querySelector('.map__pins');
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
    for (var i = 1; i < data.length; i++) {
      fragment.appendChild(createPin(data[i]));
    }

    similarPinElement.appendChild(fragment);
  };

  // Создание и заполнение DOM элемента всплывающего окна

  var similarPopupElement = document.querySelector('main');

  window.createPopup = function (typePopup) {
    var newPopup = typePopup.cloneNode(true);
    fragment.appendChild(newPopup);
    similarPopupElement.appendChild(fragment);
  };
})();
