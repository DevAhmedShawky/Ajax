// Select For Element Of Navbar
let links = document.querySelectorAll(".nav-item .nav-link");
let inputSearch = document.querySelector("#search");
let search = [];
for (let i = 0; i < links.length; i++) {
  search.push(links[i].textContent);
}

inputSearch.addEventListener("blur", (e) => {
  for (let i = 0; i < search.length; i++) {
    if (search[i].includes(e.target.value)) {
      links[i].classList.add("active");
    } else {
      links[i].classList.remove("active");
    }
  }
  addApi(e.target.value);
  e.target.value = "";
});


// Adding Class Active When Click on This Navbar And Call Api
links.forEach((e) => {
  e.addEventListener("click", (e) => {
    links.forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    addApi(e.target.textContent);
  });
});

// for (let i = 0; i < links.length; i++) {
//   links[i].addEventListener("click", () => {
//     for (let i = 0; i < links.length; i++) {
//       links[i].classList.remove("active");
//     }
//     links[i].classList.add("active");
//     addApi(links[i].textContent);
//   });
// }

// Call Api
let result = [];
function addApi(x) {
  let myRequest = new XMLHttpRequest();
  myRequest.open("GET", `https://forkify-api.herokuapp.com/api/search?q=${x}`);
  myRequest.send();
  myRequest.addEventListener("readystatechange", () => {
    if (myRequest.readyState == 4 && myRequest.status == 200) {
      myRequest.response;
      result = JSON.parse(myRequest.response);
      result = result.recipes;
      dispalyData();
    }
  });
}

// Default Show Data Of API When This Window Open
addApi("salad");

// Funcition Display Data Of Api In Document************
let showData = document.querySelector("#show-data");
function dispalyData() {
  let data = "";
  for (let i = 0; i < result.length; i++) {
    let Price = result[i].social_rank;
    let priceToString = Price.toString().slice(0, 5);
    let numberPrice = Number(priceToString);
    data += `
<div class="col-md-6 col-lg-4 mb-3 item">
            <div class="rounded-2 overflow-hidden">
              <div class="image overflow-hidden">
                <img
                onclick="showModal(${result[i].recipe_id})"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                  class="w-100 photo"
                  src = "${result[i].image_url}"
                />
              </div>
              <div class="content bg-warning p-2">
                <div
                  class="item-info d-flex align-items-center justify-content-between pt-2"
                >
                  <p class="m-0 fw-bold">${result[i].publisher}</p>
                  <p class="mb-0 price rounded p-2 fw-bold">$${numberPrice}</p>
                </div>
                <hr />
                <div class="d-flex align-items-center justify-content-center">
                <h5 class="mt-3 text-center fw-bold text-light">
                ${result[i].title}
                </h5>
                </div>
              </div>
            </div>
          </div>
`;
    showData.innerHTML = data;
  }
}

// Function For Appi Of Modal
let modalOfArray = [];
function showModal(c) {
  let myReqOfModal = new XMLHttpRequest();
  myReqOfModal.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/get?rId=${c}`
  );
  myReqOfModal.send();
  myReqOfModal.addEventListener("readystatechange", () => {
    if (myReqOfModal.readyState == 4 && myReqOfModal.status == 200) {
      myReqOfModal.response;
      modalOfArray = JSON.parse(myReqOfModal.response);
      modalOfArray = modalOfArray.recipe;
      displayModl();
    }
  });
}

// Funcition Display Modal Of Api In Document************
let modalBody = document.querySelector(".show-modal");
let lists = document.createElement("ol");
lists.style.paddingTop = "16px";
function displayModl() {
  let details = modalOfArray.ingredients;
  for (let j = 0; j < details.length; j++) {
    let list = document.createElement("li");
    let detailsOfMeal = document.createTextNode(details[j]);
    list.appendChild(detailsOfMeal);
    lists.appendChild(list);
  }
  modalBody.innerHTML = `
<img class="w-100" src="${modalOfArray.image_url}">
`;
  modalBody.appendChild(lists);
}
