let mainwrapperPost = document.getElementById("post-wrapperBlock");
let postOverlay = document.getElementById("overlay");
let overlayContent = document.getElementById("postcontent");
let overlayClose = document.getElementById("close");
let postAdd = document.getElementById("add");
let addOverlay = document.getElementById("postOverlay");
let form = document.getElementById("form");
let inpute = document.getElementById("title");

function ajax(url, callback) {
  let requestPost = new XMLHttpRequest();
  requestPost.open("GET", url);
  requestPost.addEventListener("load", function () {
    let dataResponse = JSON.parse(requestPost.responseText);
    callback(dataResponse);
  });
  requestPost.send();
}
function createPostRenderLogic(item) {
  const divWrapper = document.createElement("div");
  divWrapper.classList.add("posts");
  divWrapper.setAttribute("data-id", item.id);

  const h3Post = document.createElement("h3");
  h3Post.innerText = item.id;

  const h2Post = document.createElement("h2");
  h2Post.innerText = item.title;

  const deletebutton = document.createElement("button");
  deletebutton.textContent = "Delete this post";
  deletebutton.setAttribute("data-id", item.id);

  divWrapper.appendChild(h3Post);
  divWrapper.appendChild(h2Post);
  divWrapper.appendChild(deletebutton);

  divWrapper.addEventListener("click", function (event) {
    const id = event.target.getAttribute("data-id");
    postOverlay.classList.add("activeoverlay");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    ajax(url, function (dataResponse) {
      let p = document.createElement("p");
      p.classList.add("posttext");
      p.innerText = item.body;
      overlayContent.appendChild(p);
    });
  });
  deletebutton.addEventListener("click", function (event) {
    event.stopPropagation();
    const id = event.target.getAttribute("data-id");
    let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    fetch(url, {
      method: "DELETE",
    }).then(() => divWrapper.remove());
  });
  mainwrapperPost.appendChild(divWrapper);
}
postAdd.addEventListener("click", function (event) {
  addOverlay.classList.add("activeadd");
  inpute.value = " ";
});
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let formData = {
    title: event.target[0].value,
  };
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((newPost) => {
      createPostRenderLogic(newPost);
      addOverlay.classList.remove("activeadd");
    });
});
overlayClose.addEventListener("click", function () {
  postOverlay.classList.remove("activeoverlay");
  overlayContent.innerHTML = " ";
});
ajax("https://jsonplaceholder.typicode.com/posts", function (dataResponse) {
  dataResponse.forEach((item) => {
    createPostRenderLogic(item);
  });
});

// slider
let data = [
  {
    id: 1,
    imageUrl: "https://wallpapercave.com/wp/wp2089967.jpg",
    title: "slide title 1",
  },
  {
    id: 2,
    imageUrl: "https://wallpapercave.com/wp/wp2089908.jpg",
    title: "slide title 2",
  },
  {
    id: 3,
    imageUrl: "https://wallpapercave.com/wp/wp2089896.jpg",
    title: "slide title 3",
  },
  {
    id: 4,
    imageUrl: "https://wallpapercave.com/wp/wp2089938.jpg",
    title: "slide title 4",
  },
];

const arrowleft = document.getElementById("arrowleft");
const arrowright = document.getElementById("arrowright");
const sliderContent = document.getElementById("slider-content");
let sliderIndex = 0;

function createDivTag(item) {
  const divtag = document.createElement("div");
  divtag.classList.add("slide");
  return divtag;
}
function createImgTag(item) {
  // const tagImage = document.createElement("img");
  // tagImage.classList.add("image-slider");
  // tagImage.setAttribute("src", item.imageUrl);
  // tagImage.setAttribute("alt", item.title);
  // return tagImage;

  const bgImage = document.createElement("div");
  bgImage.style.backgroundImage = `url(${item.imageUrl})`;
  bgImage.classList.add("bgImagest");
  return bgImage;
}
function createH3Tag(item) {
  const h3Title = document.createElement("h3");
  h3Title.innerText = item.title;
  return h3Title;
}

function createDots() {
  const dots = document.createElement("div");
  dots.classList.add("dots-parent");
  data.forEach((element) => {
    const childDots = document.createElement("div");
    childDots.classList.add("child");
    childDots.setAttribute("data-id", element.id - 1);

    dots.appendChild(childDots);

    childDots.addEventListener("click", function (event) {
      let id = event.target.getAttribute("data-id");
      sliderIndex = id;
      setSlide()

    });
  });
  return dots;
}
function setSlide() {
  sliderContent.innerHTML = " ";
  const slideItem = createDivTag(data[sliderIndex]);
  const imgTag = createImgTag(data[sliderIndex]);
  const titleSlider = createH3Tag(data[sliderIndex]);
  const dots = createDots();

  slideItem.appendChild(imgTag);
  slideItem.appendChild(titleSlider);
  sliderContent.appendChild(slideItem);
  sliderContent.appendChild(dots);
}

function arrowLeftClick() {
  if (sliderIndex == 0) {
    sliderIndex = data.length - 1;
    setSlide();
    return;
  }
  sliderIndex -= 1;
  setSlide();
}

function arrowRightClick() {
  if (sliderIndex == data.length - 1) {
    sliderIndex = 0;
    setSlide();
    return;
  }
  sliderIndex += 1;
  setSlide();
}
arrowleft.addEventListener("click", arrowLeftClick);
arrowright.addEventListener("click", arrowRightClick);

setInterval(() => {
  arrowRightClick();
}, 5000);
setSlide();
