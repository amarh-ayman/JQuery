"use strict";
/*-----read from json file---- */
let keyWords = [];
let dataArray = [];
let selectedFilter = 0;
function Image(item) {
  this.title = item.title;
  this.image_url = item.image_url;
  this.description = item.description;
  this.keyword = item.keyword;
  this.horns = item.horns;
  dataArray.push(this);
}

Image.prototype.render = function () {
  let template = $("#imageTemplate").html();
  let imageMergedTemplate = Mustache.render(template, this);
  $("#images_section_main").append(imageMergedTemplate);
};

function readJson(number) {
  const ajaxSetting = {
    method: "get",
    datatype: "json",
  };
  if (number === 1) {
    dataArray = [];
    $("#images_section_main").children().remove();
    $.ajax(`data/page-1.json`, ajaxSetting).then(doStuff);
  }
  if (number === 2) {
    dataArray = [];
    $("#images_section_main").children().remove();
    $.ajax(`data/page-2.json`, ajaxSetting).then(doStuff);
  }
}
readJson(1);

function doStuff(HornData) {
  keyWords = [];
  sort(HornData);
  // console.log(dataArray);
  HornData.forEach((item) => {
    let newImage = new Image(item);
    newImage.render();

    if (!keyWords.includes(newImage.keyword)) {
      keyWords.push(newImage.keyword);
    }
  });

  renderKeywords();
}

/*--------------filter----------------*/
function renderKeywords() {
  $("#filter").children().remove();
  let template = $("#filterTemplate").html();
  $("#filter").append("<option value='default'>Default</option>");
  keyWords.forEach((item) => {
    let x = { y: item };
    let filterMergedTemplate = Mustache.render(template, x);
    $("#filter").append(filterMergedTemplate);
  });
}

// events functions
function filterFunction() {
  let select = $(this).val();
  selectedFilter = select;

  if (select == "default") {
    $("div").show();
  } else {
    $("div").hide();
    $(`.${select}`).show();
  }
}

// events
$("#filter").on("change", filterFunction);

///////// buttons
function page1Handler() {
  readJson(1);
}
function page2Handler() {
  readJson(2);
}

$("#page1").click(page1Handler);
$("#page2").on("click", page2Handler);

//////////// sort
function sortHandler() {
  let select = $(this).val();
  if (select === "title") {
    dataArray.sort((a, b) => {
      let aTitle = a.title;
      let bTitle = b.title;
      if (aTitle < bTitle) {
        return -1;
      }
      if (aTitle > bTitle) {
        return 1;
      }
    });
  }
  if (select === "horns") {
    dataArray.sort((a, b) => {
      let aHorns = a.horns;
      let bHorns = b.horns;
      if (aHorns < bHorns) {
        return -1;
      }
      if (aHorns > bHorns) {
        return 1;
      }
    });
  }
  $("#images_section_main").children().remove();
  dataArray.forEach((element) => {
    element.render();
  });
  if (selectedFilter) {
    if (selectedFilter === "default") {
      $("div").show();
    } else {
      $("div").hide();
      console.log(selectedFilter);
      $(`.${selectedFilter}`).show();
    }
  }
}

$("#sort").on("change", sortHandler);
function sort(dataArray) {
  dataArray.sort((a, b) => {
    let aTitle = a.title;
    let bTitle = b.title;
    if (aTitle < bTitle) {
      return -1;
    }
    if (aTitle > bTitle) {
      return 1;
    }
  });
}

$(".heading").click(function (params) {
  location.reload();
});
