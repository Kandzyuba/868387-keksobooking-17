'use strict';

(function () {
  var similarListElement = document.querySelector('.map__pins');
  var mapTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
  window.renderPins = function () {
    var data = window.generateData();
    var fragment = document.createDocumentFragment();
    var pinMain = document.querySelector('.map__pin--main');

    for (var i = 1; i < data.length; i++) {
      fragment.appendChild(createPin(data[i]));
    }

    similarListElement.appendChild(fragment);
    pinMain.removeEventListener('mouseup', window.renderPins);
  };
})();
