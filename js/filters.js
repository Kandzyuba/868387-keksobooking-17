'use strict';

// Фильтрация по типу жилья/стоимости/числа комнат/числа гостей/услуг
(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input');

  var Price = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
    MIN: 10000,
    MAX: 50000
  };

  var getHousingType = function (element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  var getHousingPrice = function (element) {
    switch (housingPrice.value) {
      case Price.LOW: return element.offer.price <= Price.MIN;
      case Price.MIDDLE: return element.offer.price >= Price.MIN && element.offer.price <= Price.MAX;
      case Price.HIGH: return element.offer.price >= Price.MAX;
      default: return true;
    }
  };

  var getHousingRooms = function (element) {
    return housingRooms.value === 'any' ? true : parseInt(housingRooms.value, 10) === element.offer.rooms;
  };

  var getHousingGuests = function (element) {
    return housingGuests.value === 'any' ? true : parseInt(housingGuests.value, 10) === element.offer.guests;
  };

  var getHousingFeatures = function (element) {
    var checkedFeatures = Array.from(housingFeatures).filter(function (el) {
      return el.checked;
    }).map(function (el) {
      return el.value;
    });

    return checkedFeatures.every(function (val) {
      return element.offer.features.indexOf(val) !== -1;
    });
  };

  window.pinFilter = function (data) {
    var map = document.querySelector('.map');

    if (map.lastChild === document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }

    return data.filter(function (el) {
      return getHousingType(el) &&
             getHousingPrice(el) &&
             getHousingRooms(el) &&
             getHousingGuests(el) &&
             getHousingFeatures(el);
    }).slice(0, 5);
  };
})();
