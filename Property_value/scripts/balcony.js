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

    // Обработчик события для изменения значения в инпуте при перемещении ползунка
    slider.addEventListener("input", function() {
        var value = this.value;
        input.value = value;
        sliderValue.textContent = value;
        updateSliderValuePosition();
        logValue(value); // Вызываем функцию вывода значения в консоль
    });

    // Обработчик события для изменения значения ползунка при вводе значения в инпут
    input.addEventListener("input", function() {
        var value = parseFloat(this.value);
        if (!isNaN(value)) {
            var val = Math.min(10, Math.max(1, value));
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
        selectedBalcony = input.value;
        console.log(selectedBalcony); // Выводим значение в консоль
        // Проверяем, было ли указано количество балконов
        if (selectedBalcony !== '') {
            // Добавляем выбранное количество балконов в список
            selectedItems.push(selectedBalcony);
            // Сохраняем обновленный список выбранных элементов в localStorage
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            // Переходим на следующую страницу
            window.location.href = "view.html";
            // Запуск функции прогресса
            progress();
        } else {
            selectedItems.push('0');
            // Сохраняем обновленный список выбранных элементов в localStorage
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            // Переходим на следующую страницу
            window.location.href = "view.html";
        }
    });

    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = "squere.html"; // Переход на страницу index2.html
    });
});
  
function progress() {
    var totalPages = 11; // Общее количество страниц
    var currentPage = 3; // Текущая страница
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
