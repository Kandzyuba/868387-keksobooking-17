'use strict';

(function () {
  // Подготовка МОКОв
  var MOCK = {
    dataArr: {
      author: {
        avatar: 'img/avatars/user0',
      },
      offer: {
        type: ['palace', 'flat', 'house', 'bungalo'],
      },
      location: {
        x: {
          min: 150,
          max: 1000
        },
        y: {
          min: 300,
          max: 630
        }
      }
    },
  };

  var getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Функция генерации данных для пина
  window.generateData = function () {
    var dataArr = [];

    for (var i = 1; i < 9; i++) {
      dataArr[i] = {
        author: {
          avatar: MOCK.dataArr.author.avatar + i + '.png',
        },
        offer: {
          type: MOCK.dataArr.offer.type[getRandomInRange(0, MOCK.dataArr.offer.type.length - 1)]
        },
        location: {
          x: getRandomInRange(MOCK.dataArr.location.x.min, MOCK.dataArr.location.x.max),
          y: getRandomInRange(MOCK.dataArr.location.y.min, MOCK.dataArr.location.y.max)
        },
      };
    }

    return dataArr;
  };
})();
