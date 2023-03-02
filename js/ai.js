const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => displayData(data.data.tools));
};
const displayData = (datas) => {
  const cardContainer = document.getElementById("card-container");
  datas.forEach((data) => {
    console.log(data.features.length);
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
        <li>${data.features[0]}</li>
        <li>${data.features[1]}</li>
        <li>${data.features[2]}</li>
      </ul>
      <hr>
      <h2 class="card-title font-bold">${data.name}</h2>
      <div class="flex justify-between">
        <div><i class="fa-solid fa-calendar-days mx-2"></i>${data.published_in}</div>
        <div>
        <button onclick="document.getElementById('my-modal-3').checked = true;">
        <i class="fa-solid fa-circle-arrow-right text-2xl"></i></button>

        </div>
      </div>
    </div>
  </div>
  
    `;
    spinner.classList.add('hidden')
  });
};






const spinner = document.getElementById('spinner');
spinner.classList.remove('hidden')
loadData();
