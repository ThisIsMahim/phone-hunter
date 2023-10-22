const phoneContainer = document.getElementById("phones-container");
const spinner = document.getElementById("spinner");
const modal = document.getElementById("my-modal");
let btnClicked = false;

function loadPhone(searchText) {
  spinner.style.display = "flex";
  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.status == false) {
        modal.style.display = "block";
        searchBox.value='';
        modal.innerHTML = `
        <div
	class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
>
	<div class="mt-3 text-center">
		<div
			class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
		>
        <img src="jean_victor_balin_cross.svg" clas="h-6 w-6">
		</div>
		<h3 class="text-lg leading-6 font-medium text-gray-900">Item Not Found!</h3>
		<div class="mt-2 px-7 py-3">
			<p class="text-sm text-gray-500">
				There's no such item named <b>"${searchText}"</b> in the database
        <br>N.B: Please check if the search field is empty.
			</p>
		</div>
		<div class="items-center px-4 py-3">
			<button
            onclick="closeModal()"
				class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
			>
				Return
			</button>
		</div>
	</div>
</div>
        `;
      }
      let phones = data.data;
      phoneContainer.innerHTML = "";
      const showAllBtn = document.getElementById("show-all-btn");
      if (phones.length > 12 && !btnClicked) {
        phones = phones.slice(0, 12);
        showAllBtn.classList.remove("hidden");
      } else {
        showAllBtn.classList.add("hidden");
      }

      phones.forEach((phone) => {
        const phoneCard = document.createElement("div");
        phoneCard.classList =
          "max-w-xs rounded-lg shadow-lg bg-gray-50 text-gray-800 border-2 border-white hover:border-[#0D6EFD] z-0";
        phoneCard.setAttribute("data-aos", "fade-up");
        phoneCard.setAttribute("data-aos-duration", 300);
        phoneCard.innerHTML = `
        <div class="bg-[#0d6dfd0b] flex items-center justify-center w-full h-[300px] rounded-lg">
        <img src="${phone.image}" alt="" class=" object-center  rounded-t-md ">
    </div>
    <div class="flex flex-col justify-between p-6 space-y-8">
        <div class="space-y-2 flex flex-col items-center justify-center text-center">
            <h2 class="text-2xl font-bold ">${phone.phone_name}</h2>
            <p class="text-[#706F6F] ">There are many variations of<br> passages of available.</p>
            <h2 class="text-2xl font-semibold ">$999</h2>
        </div>
        <button id="show-details-btn" onclick="showDetails('${phone.slug}')" type="button" class="btn rounded bg-[#0D6EFD] text-white">Show Details</button>
    </div>
        `;
        phoneContainer.appendChild(phoneCard);
        spinner.style.display = "none";
      });
    });
}
const searchBox = document.getElementById("search-box");
searchBox.addEventListener("keyup", function(event){
  if(event.code==="Enter")
    searchPhone();
})
function searchPhone() {
  const searchText = searchBox.value;
  loadPhone(searchText);
}
function showAll() {
  btnClicked = true;
  searchPhone();
}

// showing modal
function showDetails(id) {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      modal.style.display = "block";
      modal.innerHTML = `
      <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
    >
      <div class="mt-3">
        <div
          class="mx-auto flex items-center justify-center h rounded-full bg-[#0D6EFD0D]"
        >
          <img src="${data.data.image}" alt="" class="w-auto h-auto" />
        </div>
        <div class="flex flex-col gap-5 mb-5 mt-4">
          <h3 class="text-lg leading-6 text-gray-900 font-bold">
            ${data.data.name}
          </h3>
          <p class="text-sm text-gray-500">
            It is a long established fact that a reader will be distracted
            by the readable content of a page when looking at its layout.
          </p>
          <p><span class="font-semibold text-black">Storage:</span> ${data.data.mainFeatures.storage}</p>
          <p><span class="font-semibold text-black">Display Size:</span> ${data.data.mainFeatures.displaySize}</p>
          <p><span class="font-semibold text-black">Chipset:</span> ${data.data.mainFeatures?.chipSet}</p>
          <p><span class="font-semibold text-black">Memory:</span> ${data.data.mainFeatures?.memory}</p>
          <p><span class="font-semibold text-black">Id:</span> ${data.data?.slug}</p>
          <p><span class="font-semibold text-black">Release Date:</span> ${data.data.releaseDate}</p>
          <p><span class="font-semibold text-black">Brand:</span> ${data.data.brand}</p>
          <p><span class="font-semibold text-black">GPS:</span> ${data.data.others?.GPS || "No GPS available"}</p>
        </div>
        <div class="items-center px-4 py-3">
          <button
            onclick="closeModal()"
            class="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
    `;
    });
}
function closeModal() {
  modal.style.display = "none";
  modal.innerHTML = "";
  spinner.style.display = "none";
}
function shopNow() {
  location.href = "#phones-container";
  searchBox.value = "iphone 13 pro max";
  loadPhone("iphone 13 pro max");
}
