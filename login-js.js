const mail = document.getElementById("login-email");
const pass = document.getElementById("login-password");
const modal= document.getElementById("my-modal");
function signIn() {
console.log(mail.value, pass.value);
  if (mail.value=='nafisaIsCute@gmail.com' && pass.value=='senpaiIsCuteToo') {
    location.href = "index.html";
  } else {
    modal.style.display = "block";
    mail.value="";
    pass.value="";
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
          <h3 class="text-lg leading-6 font-medium text-gray-900">Error occured!</h3>
          <div class="mt-2 px-7 py-3">
              <p class="text-sm text-gray-500">
                  Wrong mail or password.
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
}
function closeModal(){
    modal.style.display="none";
}