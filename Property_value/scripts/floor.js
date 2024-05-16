document.addEventListener("DOMContentLoaded", function() {
    var slider = document.getElementById("myRange");
    var input = document.querySelector(".squere-value input[type='number']");
    var sliderValue = document.querySelector(".slider-value");

    // Обновление позиции значения над ползунком
    function updateSliderValuePosition() {
        var sliderRect = slider.getBoundingClientRect();

        var sliderMin = parseFloat(slider.min);
        var sliderMax = parseFloat(slider.max);
        var sliderValueNormalized = (parseFloat(slider.value) - sliderMin) / (sliderMax - sliderMin);

        var newPosition = (sliderValueNormalized * sliderRect.width) + sliderRect.left - (sliderValue.offsetWidth / 2) - 129; // добавлено смещение влево на 6px

        sliderValue.style.left = newPosition + "px";
    }

    // Функция для вывода значения в консоль
    function logValue(value) {
        console.log(value);
    }

    slider.addEventListener("input", function() {
        input.value = this.value;
        sliderValue.textContent = this.value;
        updateSliderValuePosition();
        logValue(this.value); // Вызываем функцию вывода значения в консоль
    });
    

    input.addEventListener("input", function() {
        var value = parseFloat(this.value);
        if (!isNaN(value)) {
            var val = Math.min(35, Math.max(1, value));
            slider.value = val;
            sliderValue.textContent = val;
            updateSliderValuePosition();
            logValue(val); // Вызываем функцию вывода значения в консоль
        } else {
            slider.value = 1;
            sliderValue.textContent = 1;
            updateSliderValuePosition();
            logValue(1); // Вызываем функцию вывода значения в консоль
        }
    });

    // Обновляем позицию значения над ползунком при загрузке страницы
    updateSliderValuePosition();

    // Создаем глобальную переменную для хранения списка выбранных элементов
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    // Обработчик события для кнопки "Далее"
    var nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', function() {
        // Получаем значение количества балконов из инпута
        selectedFloor = input.value;
        console.log(selectedFloor); // Выводим значение в консоль
        // Проверяем, было ли указано количество балконов
        if (selectedFloor !== '') {
            // Добавляем выбранное количество балконов в список
            selectedItems.push(selectedFloor);
            // Сохраняем обновленный список выбранных элементов в localStorage
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            // Переходим на следующую страницу
            window.location.href = "repair.html";
            // Запуск функции прогресса
            progress();
        } else {
            // Выводим сообщение, если количество балконов не указано
            alert("Пожалуйста, укажите на каком этаже находится квартира.");
        }
    });
  
    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = "bathroom.html"; // Переход на страницу index2.html
    });
});
  
function progress() {
    var totalPages = 11; // Общее количество страниц
    var currentPage = 10; // Текущая страница
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
  