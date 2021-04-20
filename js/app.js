'use strict';
let filterArrayOptions = [];
function Image(item) {
  this.title = item.title;
  this.image_url = item.image_url;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
}

Image.prototype.render = function () {
  let hornClone = $('#photo-template').clone();
  hornClone.find('h2').text(this.title);
  hornClone.find('p').text(this.description);
  hornClone.find('img').attr({
    src: this.image_url,
    alt: this.title,
  });
  hornClone.attr('class', this.keyword);
  $('main').append(hornClone);
};

/*-----start read from json file---- */
function renderKeywords() {
  const ajaxSetting = {
    method: 'get',
    datatype: 'json',
  };

  $.ajax('data/page-1.json', ajaxSetting).then(doStuff);
}
renderKeywords();

/*-----end read from json file---- */
function doStuff(HornData) {
  HornData.forEach(item => {
    let newImage = new Image(item);
    newImage.render();

    if (!filterArrayOptions.includes(newImage.keyword))
      filterArrayOptions.push(item.keyword);
  });
  filterSelection();
  $('#photo-template').remove();
}

$('select').on('change', filter_Function_Event);

/*--------------filter----------------*/
function filterSelection() {
  filterArrayOptions.forEach((item, i) => {
    let $keyword = $('.option').clone();
    $keyword.text(item);
    $('select').append($keyword);
    $keyword.attr('value', item);
    $keyword.removeClass('option');
  });
}

function filter_Function_Event() {
  let select = $(this).val();
  $('div').hide();
  $(`.${select}`).show();
}
