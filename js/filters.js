'use strict';

// Фильтрация по типу жилья/стоимости/числа комнат/числа гостей/услуг
(function () {
  window.mapFilters = document.querySelector('.map__filters');

  var housingFilter = function (data) {
    var housingType = document.querySelector('#housing-type');
    var selectedHouse = housingType.options.selectedIndex;

    var houseArr = data.filter(function (elem) {
      if (housingType.value === 'any') {
        return elem.offer.type;
      }
      return elem.offer.type === housingType.options[selectedHouse].value;
    });
    return houseArr;
  };

  window.generalFilter = function () {
    window.removePins();
    window.renderPins(housingFilter(window.dataCard));
  };

  window.mapFilters.addEventListener('change', window.generalFilter);
})();
