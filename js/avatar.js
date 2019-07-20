'use strict';

// Модуль по загрузке изображений
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  window.avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesChooser = document.querySelector('#images');
  var imagesPreviewContainer = document.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var fileAvatar = avatarChooser.files[0];
    var fileName = fileAvatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(fileAvatar);
    }
  });

  var onFileSelect = function (evt) {
    var files = evt.target.files;
    imagesPreviewContainer.remove();

    for (var i = 0; i < files.length; i++) {
      var f = files[i];

      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      var photoContainer = document.querySelector('.ad-form__photo-container');

      reader.onload = (function (theFile) {
        return function (el) {

          var divEl = document.createElement('div');
          divEl.classList.add('ad-form__photo');

          divEl.innerHTML = ['<img class="thumb" width="80%" width="80%" src="', el.target.result, '" title="', escape(theFile.name), '"/>'].join('');
          photoContainer.insertBefore(divEl, null);
        };
      })(f);

      reader.readAsDataURL(f);
    }
  };

  imagesChooser.addEventListener('change', onFileSelect, false);
})();
