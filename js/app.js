'use strict';
/*-----read from json file---- */
let My_array = [];
let arr = [];
function Image(url, title, description, keyword, horns) {
  this.title = title;
  this.img = url;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  arr.push(this);
}

Image.prototype.render = function () {
  let $photo = $(
    `<div id="photo-template" class=${this.keyword}></div>`
  ).clone(); ///array

  $photo.append($(`<h2>${this.title}</h2>`));
  $photo.append($(`<img src=${this.img}></img>`));
  $photo.append($(`<p>${this.description}</p>`));
  $('main').append($photo);
};

Image.readJson = () => {
  const ajaxSetting = {
    method: 'get',
    datatype: 'json',
  };

  $.ajax('./data/page-1.json', ajaxSetting).then(doStuff);
};

function doStuff(data) {
  data.forEach((item, i) => {
    let { image_url, title, description, keyword, horns } = item;
    new Image(image_url, title, description, keyword, horns).render();

    // arr.push(item);
    if (!My_array.includes(keyword)) My_array.push(keyword);
  });
  filterr();
  // console.log(arr[0]);
}

Image.readJson();
/*--------------filter----------------*/
function filterr() {
  $('select').on('change', filterFunction);

  My_array.forEach((item, i) => {
    let $keyword = $('.option').clone();
    $keyword.text(item);
    $('select').append($keyword);
    $keyword.attr('id', i);
    $keyword.attr('value', item);
    $keyword.removeClass('option');
  });
}
function filterFunction() {
  // console.log(arr[0]);
  let select = $(this).children('option:selected').val();
  $('main').children().addClass('hide');
  $(`.${select}`).removeClass('hide');
}
