// Счетчики --------------------
const firstCounterValue = document.getElementById("counter1-value");
const firstIncrementBtn = document.getElementById("increment1-btn");
const firstDecrementBtn = document.getElementById("decrement1-btn");

const secondCounterValue = document.getElementById("counter2-value");
const secondIncrementBtn = document.getElementById("increment2-btn");
const secondDecrementBtn = document.getElementById("decrement2-btn");

const thirdCounterValue = document.getElementById("counter3-value");
const thirdIncrementBtn = document.getElementById("increment3-btn");
const thirdDecrementBtn = document.getElementById("decrement3-btn");

let firstCounter = 0;
let secondCounter = 0;
let thirdCounter = 0;

firstIncrementBtn.addEventListener("click", () => {
  firstCounter++;
  firstCounterValue.innerText = firstCounter;
  localStorage.setItem("firstCounter", firstCounter);
});

firstDecrementBtn.addEventListener("click", () => {
  firstCounter--;
  firstCounterValue.innerText = firstCounter;
  localStorage.setItem("firstCounter", firstCounter);
});

secondIncrementBtn.addEventListener("click", () => {
  secondCounter++;
  secondCounterValue.innerText = secondCounter;
  localStorage.setItem("secondCounter", secondCounter);
});

secondDecrementBtn.addEventListener("click", () => {
  secondCounter--;
  secondCounterValue.innerText = secondCounter;
  localStorage.setItem("secondCounter", secondCounter);
});

thirdIncrementBtn.addEventListener("click", () => {
  thirdCounter++;
  thirdCounterValue.innerText = thirdCounter;
  localStorage.setItem("thirdCounter", thirdCounter);
});

thirdDecrementBtn.addEventListener("click", () => {
  thirdCounter--;
  thirdCounterValue.innerText = thirdCounter;
  localStorage.setItem("thirdCounter", thirdCounter);
});

// Получение значений счетчиков из local storage при загрузке страницы
if (localStorage.getItem("firstCounter")) {
  firstCounter = parseInt(localStorage.getItem("firstCounter"));
  firstCounterValue.innerText = firstCounter;
}

if (localStorage.getItem("secondCounter")) {
  secondCounter = parseInt(localStorage.getItem("secondCounter"));
  secondCounterValue.innerText = secondCounter;
}

if (localStorage.getItem("thirdCounter")) {
  thirdCounter = parseInt(localStorage.getItem("thirdCounter"));
  thirdCounterValue.innerText = thirdCounter;
}

// Список в разделе "ЧТО ПОНАДОБИТСЯ В ДИЗАЙН ПРОЕКТЕ" --------------------
const cardList = document.querySelector('#cards-list');
const check = cardList.querySelectorAll('li input[id="option"]');

// Добавление id каждому чекбоксу
check.forEach((checkbox, index) => {
  const id = `option-${index + 1}`;
  checkbox.id = id;
  checkbox.closest('.input-group').querySelector('.label').setAttribute('for', id);
});

// Загрузка начального состояния из локального хранилища
function loadFromLS() {
  check.forEach((checkbox) => {
    const isChecked = localStorage.getItem(checkbox.id) === 'true';
    checkbox.checked = isChecked;
    if (isChecked) {
      checkbox.closest('.input-group').classList.add('checked');
    }
  });
}

// Сохранение состояния в локальное хранилище
function updateLS() {
  check.forEach((checkbox) => {
    localStorage.setItem(checkbox.id, checkbox.checked);
  });
}

loadFromLS(); 

cardList.addEventListener("change", (event) => {
  if (event.target.type === "checkbox") {
    const parentNode = event.target.closest(".input-group");
    parentNode.classList.toggle("checked");
    updateLS();
  }
});

// Чекбоксы в разделе доп. услуг --------------------
const checkboxes = document.querySelectorAll(".add-services-check");
const metreSumNode = document.querySelector(".js-banner-area-sum");
const sumNode = document.querySelector(".js-banner-price-sum");

let price = 1000;

//добавление id чекбоксу.
checkboxes.forEach((checkbox, i) => {
  checkbox.id = i;
});

function loadFromLocalStorage() {
  checkboxes.forEach((checkbox) => {
    const isChecked = localStorage.getItem(checkbox.id) === 'true';
    checkbox.checked = isChecked;
    if (isChecked) {
      checkbox.closest('.add-services-item').classList.add('checked');
    }
  });
  id_range.value = localStorage.getItem('id_range.value') || 0;
}

function updateLocalStorage() {
  checkboxes.forEach((checkbox) => {
    localStorage.setItem(checkbox.id, checkbox.checked);
  });
  localStorage.setItem('id_range.value', id_range.value);
}

const metres = function () {
  let sum = 0;
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const price = parseInt(checkbox.value);
      sum += price;
    }
  });
  sum += price * parseInt(id_range.value);
  sumNode.innerHTML = sum;
  send_result.innerHTML = id_range.value;
};

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", metres);
});

loadFromLocalStorage(); 
metres();

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    checkbox.closest('.add-services-item').classList.toggle("checked");
    updateLocalStorage();
    metres();
  });
});

id_range.value.addEventListener("input", () => {
  updateLocalStorage();
  metres();
});