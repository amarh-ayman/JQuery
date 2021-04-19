'use strict';
/*-----read from json file---- */
function Image(url, title, description, keyword, horns) {
  this.title = title;
  this.img = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

Image.prototype.render = function () {
  let $photo = $('#photo-template').clone(); ///array
  $photo.find('h2').text(this.title);
  $photo.find('img').attr('src', this.img);
  $photo.find('p').text(this.description);
  $('main').append($photo);
};

Image.readJson = () => {
  const ajaxSetting = {
    method: 'get',
    datatype: 'json',
  };

  $.ajax('data/page-1.json', ajaxSetting).then(doStuff);
};

function doStuff(data) {
  data.forEach(item => {
    let { image_url, title, description, keyword, horns } = item;
    let animal = new Image(image_url, title, description, keyword, horns);
    console.log(animal);

    animal.render();
  });
}

$(() => Image.readJson());
/*--------------filter----------------*/
let filterr = function () {
  let a = 3;
  while (a > 0) {
    let $keyword = $('.option').clone();
    $keyword.text(a);
    $keyword.removeClass('option');
    $('select').append($keyword);

    console.log($keyword + '   ' + a);
    a--;
  }
};
filterr();
