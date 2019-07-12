'use strict';

// Фильтрация по типу жилья/стоимости/числа комнат/числа гостей/услуг
(function () {
  var mapFilters = document.querySelector('.map__filters');

  var housingFilter = function (data) {
    var housingType = document.querySelector('#housing-type');
    var selectedHouse = housingType.options.selectedIndex;

    var houseArr = data.filter(function (elem) {
      if (housingType.value === 'any') {
        return elem.offer.type;
      }
      return elem.offer.type === housingType.options[selectedHouse].value;
    });
    console.log(houseArr);
    return houseArr;
  };

  var priceFilter = function (data) {
    var housingPrice = document.querySelector('#housing-price');
    var selectedPrice = housingPrice.options.selectedIndex;
    console.log(housingPrice.options[2].value);
    var typeArr = data.filter(function (elem) {
      if (housingPrice.value === 'any') {
        return elem.offer.price;
      }
      console.log(elem.offer.price);
      return elem.offer.price === housingPrice.options[selectedPrice].value;
    });
    console.log(typeArr);
    return typeArr;
  };

  var roomFilter = function (data) {
    var roomType = document.querySelector('#housing-rooms');
    var selectedRooms = roomType.options.selectedIndex;

    var roomsArr = data.filter(function (elem) {
      if (roomType.value === 'any') {
        return elem.offer.rooms;
      }
      // Вынужден добавить не строгую проверку, т.к. разные типы из данных и значения. Иначе не работает
      return elem.offer.rooms == roomType.options[selectedRooms].value;
    });

    return roomsArr;
  };

  var guestsFilter = function (data) {
    var guestsType = document.querySelector('#housing-guests');
    var selectedGuests = guestsType.options.selectedIndex;

    var guestsArr = data.filter(function (elem) {
      if (guestsType.value === 'any') {
        return elem.offer.guests;
      }

      return elem.offer.guests == guestsType.options[selectedGuests].value;
    });

    return guestsArr;
  };

  var featuresFilter = function (data) {
    var featuresType = document.querySelector('#housing-features');
    var selectedFeatures = featuresType.querySelector('input').checked;

    var featuresArr = data.filter(function (elem) {

      elem.offer.features.forEach(function (item) {
        if (selectedFeatures.value == item) {
          featuresArr.push(item);
        }

      });
      return elem.offer.features;

    });

    return featuresArr;
  };
  // Привет, Вить. Чтобы проверить работособность можешь раскомментировать любую строчку из ф-и ниже. (пока что работает только при раскомментированной только одной ф-и). featuresFilter и priceFilter не работают.
  var generalFilter = function () {
    window.objects.removePins();
    // window.objects.renderPins(housingFilter(window.dataCard));
    // window.objects.renderPins(priceFilter(window.dataCard));
    // window.objects.renderPins(roomFilter(window.dataCard));
    // window.objects.renderPins(guestsFilter(window.dataCard));
    window.objects.renderPins(featuresFilter(window.dataCard));
  };

  mapFilters.addEventListener('change', generalFilter);

  window.filters = {
    mapFilters: mapFilters,
    generalFilter: generalFilter
  };
})();
