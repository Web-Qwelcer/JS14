let $gallery = document.querySelector(".gallery"),
  $slider = document.querySelector(".slider"),
  $list = document.querySelector(".list"),
  $imageList = document.querySelector(".image-list");

const url = "https://pixabay.com/api/?key=20933966-c5d73f550f2c4778aed1a5857&q=girl&image_type=photo";

let $leftBigArrow = document.createElement("SPAN"),
  $rightBigArrow = document.createElement("SPAN"),
  $leftSmallArrow = document.createElement("SPAN"),
  $rightSmallArrow = document.createElement("SPAN");

$leftBigArrow.classList.add("left-big-arrow");
$leftBigArrow.innerHTML = "&#10148;";
$rightBigArrow.classList.add("right-big-arrow");
$rightBigArrow.innerHTML = "&#10148;";
$slider.appendChild($leftBigArrow);
$slider.appendChild($rightBigArrow);

$leftSmallArrow.classList.add("left-small-arrow");
$leftSmallArrow.innerHTML = "&#10148;";
$rightSmallArrow.classList.add("right-small-arrow");
$rightSmallArrow.innerHTML = "&#10148;";
$list.appendChild($leftSmallArrow);
$list.appendChild($rightSmallArrow);

function load() {
  let GET_Server = new XMLHttpRequest();
  GET_Server.open("GET", url);
  GET_Server.send();
  GET_Server.onload = function () {
    if (GET_Server.status != 200) {
      console.log("Error");
    } else {
      let data = JSON.parse(GET_Server.response).hits;
      createList(data);
    }
  };
}

function createList(images) {
  let prev = -1;

  for (image of images) {
    const $LI = document.createElement("LI");
    $LI.style.backgroundImage = `url(${image.webformatURL})`;
    $imageList.appendChild($LI);
  }

  let $images = document.querySelectorAll(".image-list li"),
    img_width = $images[0].getBoundingClientRect().width;

  $list.style.width = img_width * 5 + "px";
  $gallery.style.width = $list.style.width;
  imageListPosition = 0;
  imageListWidth = img_width * $images.length;

  $rightBigArrow.addEventListener("click", () => {
    if (prev >= $images.length - 1) {
      prev = -1;
    }

    activeImage(prev + 1, $images);
    imageListPosition = -(prev * img_width);
    
    if (imageListPosition > -imageListWidth + img_width * 4) {
      $imageList.style.left = imageListPosition + "px";
    }
  });

  $leftBigArrow.addEventListener("click", () => {
    if (prev <= 0) {
      prev = 0;
      activeImage( $images.length -1, $images);
    }

    else {
      activeImage(prev -1, $images)
    }

    imageListPosition = -(prev * img_width);

    if (imageListPosition > -imageListWidth && imageListPosition < -imageListWidth + img_width*5) {
      imageListPosition = -imageListWidth + img_width*5
      $imageList.style.left = imageListPosition + "px";
    }

    if (imageListPosition > -imageListWidth + img_width*5){
      $imageList.style.left = imageListPosition + "px";
    }
  });

  $rightSmallArrow.addEventListener("click", () => {
    imageListPosition = imageListPosition - img_width;
    
    if (imageListPosition < -(imageListWidth - img_width * 5)) {
      imageListPosition = 0;
    }

    $imageList.style.left = imageListPosition + "px";
  });

  $leftSmallArrow.addEventListener("click", () => {
    imageListPosition = imageListPosition + img_width;

    if (imageListPosition > 0) {
      imageListPosition = -(imageListWidth - img_width * 5);
    }

    $imageList.style.left = imageListPosition + "px";
  });

  activeImage(0, $images);

  for (let i = 0; i < $images.length; i++) {
    $images[i].addEventListener("click", () => {
      activeImage(i, $images);
    });
  }

  function activeImage(index, list) {
    $slider.style.backgroundImage = list[index].style.backgroundImage;
    list[index].classList.add("active");

    if ((prev >= 0 && prev != index)) {
      list[prev].classList.remove("active");
    }
    
    prev = index;
  }
}

load();
