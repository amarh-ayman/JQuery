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
  $('main').append($photo);
  $photo.find('h2').text(this.title);
  $photo.find('img').attr('src', this.img);
  $photo.find('p').text(this.description);
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
Image.prototype.filter = function () {
  let $keyword = $('select').clone();
  $('header').append($keyword);
  $keyword.find('option').text(this.title);
};
