const dropInput = document.querySelector('input.drop');
const dropList = document.querySelector('ul.drop');
dropInput.addEventListener('focus', show, false);
dropInput.addEventListener('blur', hide, false);
dropList.addEventListener('click', dropSelect, false);

// Создаем глобальную переменную для хранения списка выбранных элементов
let selectedItems = [];
// Переменная для хранения окончательного выбора района
let selectedDistrict = '';

// Обработчик выбора района из списка
function dropSelect(e) {
  selectedDistrict = e.target.textContent.trim(); // Сохраняем выбранный район
  dropInput.value = selectedDistrict; // Устанавливаем значение в input
  hide(); // Скрываем список

  // Добавляем выбранный район в список выбранных элементов
  selectedItems.push(selectedDistrict);

  // Выводим значение переменной района в консоль
  console.log(selectedItems);

  // На первой странице, когда список выбранных элементов создан
  // Сохраняем список в localStorage
  localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
}


// Обработчик события для кнопки "Далее"
var nextButton = document.querySelector('.next-button');
nextButton.addEventListener('click', function() {
    // Проверяем, был ли сделан выбор района
    if (selectedDistrict !== '') {
        // Переходим на следующую страницу только если выбор сделан
        window.location.href = "year.html";
        progress();
    } else {
        // В противном случае выводим сообщение или предпринимаем другие действия
        alert("Пожалуйста, сначала выберите район.");
    }
});


// Обработчик события для кнопки "Назад"
var backButton = document.querySelector('.back-button');
backButton.addEventListener('click', function() {
    window.location.href = "main.html"; // Переход на страницу index10.html
});

function hide(){
  setTimeout(() =>
    dropList.classList.remove('visible'),
  300);
}
function show(){
  setTimeout(() =>
    dropList.classList.add('visible'),
  300);  
}


const districts = document.querySelectorAll('ul.drop li');

dropInput.addEventListener('input', filterDistricts);

function filterDistricts() {
  const inputText = dropInput.value.toLowerCase(); // Преобразуем введенный текст в нижний регистр для удобства сравнения
  districts.forEach(district => {
      const districtName = district.textContent.toLowerCase(); // Получаем текст района и преобразуем его в нижний регистр
      if (districtName.startsWith(inputText)) {
          district.style.display = 'block'; // Отображаем район, если текст района начинается с введенного текста
      } else {
          district.style.display = 'none'; // Скрываем район, если текст района не начинается с введенного текста
      }
  });
}


const addressInput = document.querySelector('input.address-input');
const addressList = document.querySelector('ul.address-drop');

function hideAddressList() {
    setTimeout(() =>
        addressList.classList.remove('visible'),
        300);
}

function showAddressList() {
    setTimeout(() =>
        addressList.classList.add('visible'),
        300);
}

function selectAddress(e) {
    addressInput.value = e.target.textContent
    hideAddressList();
}

function progress() {
  var totalPages = 11; // Общее количество страниц
  var currentPage = 1; // Текущая страница
  var elem = document.querySelector(".progress-bar");
  var width = 0;

  // Вычисляем количество процентов, на которое нужно увеличить прогресс на каждой странице
  var percentIncrease = 100 / totalPages;

  // Устанавливаем начальную ширину в 0%
  elem.style.width = width + "%";
  elem.innerHTML = Math.round(width) + "%";

  // Начинаем увеличивать прогресс
  var id = setInterval(function() {
      if (currentPage >= totalPages) {
          clearInterval(id);
      } else {
          width += percentIncrease;
          elem.style.width = width + "%";
          elem.innerHTML = Math.round(width) + "%";
          currentPage++;
      }
  }, 10);
}


