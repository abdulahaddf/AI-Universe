const loadData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((response) => response.json())
    .then((data) => displayData(data.data.tools));
};
const displayData = (datas) => {
  const cardContainer = document.getElementById("card-container");
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
        <li>3.${data.features[2]}</li>
      </ul>
      <hr>
      <h2 class="card-title font-bold">${data.name}</h2>
      <div class="flex justify-between">
        <div><i class="fa-solid fa-calendar-days mx-2"></i>${data.published_in}</div>
        <div>
        <button onclick="loadModal('${data.id}') ">
        <i class="fa-solid fa-circle-arrow-right text-2xl"></i></button>

        </div>
      </div>
    </div>
  </div>
  
    `;
    spinner.classList.add('hidden')
  });
};

const loadModal = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch (url)
    .then((response) => response.json())
    .then((data) => modalContent(data.data));
    document.getElementById('my-modal-3').checked = true;
};
const modalContent = (data) =>{
console.log(data.input_output_examples[0].input
    );

document.getElementById('description').innerText = data.description;
document.getElementById('price1').innerText = `${data.pricing[0].price}
${data.pricing[0].plan}`;
document.getElementById('price2').innerText = `${data.pricing[1].price}
${data.pricing[1].plan}`;
document.getElementById('price3').innerText = `${data.pricing[2].price}
${data.pricing[2].plan}`;
document.getElementById('features').innerText= `${data.features[1].feature_name}
${data.features[2].feature_name}
${data.features[3].feature_name}
`;
document.getElementById('intg').innerText= `
${data.integrations[0]}
${data.integrations[1]}
${data.integrations[2]}
`;
const imgContainter = document.getElementById('img-container');
imgContainter.innerHTML = "";
imgContainter.innerHTML += `
<div class="relative"><img src="${data.image_link[0]}" alt="">
<div class ="absolute right-2 top-1"><button class="btn  btn-xs ">${data.accuracy.score*100}%accuracy</button></div></div>
            <div>
            <h3 class="text-xl font-bold">${data.input_output_examples[0].input}</h3>
            <p>${data.input_output_examples[0].output}</p>
            
            </div>
`;



};




const spinner = document.getElementById('spinner');
spinner.classList.remove('hidden')
loadData();
