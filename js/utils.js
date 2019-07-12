'use strict';

(function () {
  // Функции добавления/удаления атрибута элементов формы
  var addAttr = function (formElements, name, value) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute(name, value);
    }
  };

  var removeAttr = function (formElements, name) {
    for (var i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute(name);
    }
  };

  window.utils = {
    addAttr: addAttr,
    removeAttr: removeAttr
  };
})();
