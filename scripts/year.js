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

        var newPosition = (sliderValueNormalized * sliderRect.width) + sliderRect.left - (sliderValue.offsetWidth / 2) - 129; // Изменено на 129

        sliderValue.style.left = newPosition + "px";
    }

    // Обработчик события для изменения значения в инпуте при перемещении ползунка
    slider.addEventListener("input", function() {
        input.value = this.value;
        sliderValue.textContent = this.value;
        selectedYear = input.value; // Обновляем значение selectedYear
        updateSliderValuePosition();
        console.log(selectedYear); // Выводим значение selectedYear в консоль
    });

    // Обработчик события для изменения значения ползунка при вводе значения в инпут
    input.addEventListener("input", function() {
        if (!isNaN(parseFloat(this.value))) {
            var val = Math.min(2024, Math.max(1750, parseFloat(this.value))); // Ограничиваем значение в пределах допустимого диапазона
            slider.value = val; // Устанавливаем значение ползунка
            sliderValue.textContent = val; // Обновляем текст над ползунком
            selectedYear = input.value; // Обновляем значение selectedYear
            updateSliderValuePosition(); // Обновляем позицию значения над ползунком на линии
            console.log(selectedYear); // Выводим значение selectedYear в консоль
        }
        else {
            slider.value = 1750; // Возвращаем значение по умолчанию
            sliderValue.textContent = 1750; // Обновляем текст над ползунком
            selectedYear = input.value; // Обновляем значение selectedYear
            updateSliderValuePosition(); // Обновляем позицию значения над ползунком на линии
            console.log(selectedYear); // Выводим значение selectedYear в консоль
        }
    });

    // Обновляем позицию значения над ползунком при загрузке страницы
    updateSliderValuePosition();

    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        // Удаляем последний выбранный элемент из списка
        if (selectedItems.length > 0) {
            selectedItems.pop();
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            console.log('Updated selectedItems:', selectedItems);
        }
        window.location.href = "area.html"; // Переход на страницу index5.html
    });

    // Создаем глобальную переменную для хранения списка выбранных элементов
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    // Обработчик события для кнопки "Далее"
    var nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', function() {
        // Получаем значение года из инпута
        selectedYear = input.value;

        // Проверяем, был ли выбран год
        if (selectedYear !== '') {
            // Добавляем выбранный год в список
            selectedItems.push(selectedYear);
            console.log(selectedItems); // Выводим список в консоль после добавления года
            // Сохраняем обновленный список выбранных элементов в localStorage
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            // Переходим на следующую страницу
            window.location.href = "type.html";
            // Запуск функции прогресса
            progress();
        } else {
            // Выводим сообщение, если год не выбран
            alert("Пожалуйста, укажите год постройки дома.");
        }
    });

    
});

function progress() {
    var totalPages = 11; // Общее количество страниц
    var currentPage = 2; // Текущая страница
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
