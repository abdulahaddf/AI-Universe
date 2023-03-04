const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => {
      const slicedData = data.data.tools.slice(0, 6); // slice the first 6 items
      displayData(slicedData);
    });
};
const displayData = (datas) => {
  // const datas = datass.slice(0, 6);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  datas.forEach((data) => {
    // console.log(data.features);
    cardContainer.innerHTML += `
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure>
      <img
        src="${data.image}"
        alt="Shoes"/>
    </figure>
    <div class="card-body">
      <p class="text-xl font-bold">Features</p>
      <ul>
        <li>1.${data.features[0]}</li>
        <li>2.${data.features[1]}</li>
        <li>3.${data.features[2] ? data.features[2] : ""} </li>  
      </ul>
      <hr>
      <h2 class="card-title font-bold">${data.name}</h2>
      <div class="flex justify-between">
        <div><i class="fa-solid fa-calendar-days mx-2"></i>${
          data.published_in
        }</div>
        <div>
        <button onclick="loadModal('${data.id}') ">
        <i class="fa-solid fa-circle-arrow-right text-2xl"></i></button>

        </div>
      </div>
    </div>
  </div>
  
    `;
    spinner.classList.add("hidden");
  });
};

const loadModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => modalContent(data.data))
    .catch((error) => console.log(error));
  document.getElementById("my-modal-3").checked = true;
};

const modalContent = (data) => {
  // console.log(data.pricing);

  document.getElementById("description").innerText = data.description;
  document.getElementById("price1").innerText = `${
    data.pricing && data.pricing[0]
      ? `${data.pricing[0].price}/${data.pricing[0].plan}`
      : "Free of Cost / Basic "
  } `;
  document.getElementById("price2").innerText = `${
    data.pricing && data.pricing[1]
      ? `${data.pricing[1].price}/${data.pricing[1].plan}`
      : "Free of Cost /Pro "
  }`;
  document.getElementById("price3").innerText = `${
    data.pricing && data.pricing[2]
      ? `${data.pricing[2].price}/${data.pricing[2].plan}`
      : "Free of Cost / Enterprise "
  }`;
  document.getElementById("features").innerText = `${
    data.features && data.features[0] ? data.features[0].feature_name : ""
  } ${
    data.features && data.features[1]
      ? "\n" + data.features[1].feature_name
      : ""
  } ${
    data.features && data.features[2]
      ? "\n" + data.features[2].feature_name
      : ""
  }`;

  document.getElementById("intg").innerText = `${
    data.integrations && data.integrations[0]
      ? data.integrations[0]
      : "No data Found"
  }${
    data.integrations && data.integrations[1]
      ? "\n " + data.integrations[1]
      : ""
  }${
    data.integrations && data.integrations[2] ? "\n" + data.integrations[2] : ""
  }`;

  const imgContainer = document.getElementById("img-container");
  imgContainer.innerHTML = "";

  const accuracyScore = data.accuracy.score * 100;
  const hideAccuracyBtn = accuracyScore === 0;

  imgContainer.innerHTML += `
    <div class="relative"><img class="" src="${data.image_link[0]}" alt="">
      <div class ="absolute right-2 top-1 id="accuracyBtn">
        <button class="btn btn-xs ${
          hideAccuracyBtn ? "hidden" : ""
        }">${accuracyScore}% accuracy</button>
      </div>
    </div>
    <div>
      <h3 class="text-xl font-bold">${
        data.input_output_examples &&
        data.input_output_examples[0] &&
        data.input_output_examples[0].input
          ? data.input_output_examples[0].input
          : "Can you give any Example?"
      }</h3>

      <p>${
        data.input_output_examples &&
        data.input_output_examples[0] &&
        data.input_output_examples[0].output
          ? data.input_output_examples[0].output
          : "No! Not Yet Take a break"
      }</p>
    </div>
  `;
};

// showing all data

const showAll = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => displayData(data.data.tools));
};
// sorting by date

const loadDataBYdate = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => {
      const displayDataBydates = data.data.tools;
      displayDataBydates.sort(
        (a, b) => new Date(b.published_in) - new Date(a.published_in)
      );
      displayData(displayDataBydates);
    });
};

const spinner = document.getElementById("spinner");
spinner.classList.remove("hidden");
loadData();
