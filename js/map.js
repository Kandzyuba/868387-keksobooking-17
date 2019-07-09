'use strict';

// Модуль по работе с картой (перемещение пина)
(function () {
  // перемещение пина
  var pinMain = document.querySelector('.map__pin--main');

  pinMain.addEventListener('click', window.inicializationApp);
  pinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var adress = document.querySelector('#address');

    var addAdressValue = function (x, y) {
      adress.value = x + ', ' + y;
    };

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
})();
