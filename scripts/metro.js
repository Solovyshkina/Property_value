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

    // Обработчик события для изменения значения в инпуте при перемещении ползунка
    slider.addEventListener("input", function() {
        input.value = this.value;
        sliderValue.textContent = this.value;
        updateSliderValuePosition();
    });

    // Обработчик события для изменения значения ползунка при вводе значения в инпут
    input.addEventListener("input", function() {
        if (!isNaN(parseFloat(this.value))) {
            var val = Math.min(30, Math.max(0, parseFloat(this.value)));
            slider.value = val;
            sliderValue.textContent = val;
            updateSliderValuePosition();
        }
        else {
            slider.value = 0;
            sliderValue.textContent = 0;
            updateSliderValuePosition();
        }
    });

    // Обновляем позицию значения над ползунком при загрузке страницы
    updateSliderValuePosition();

    // Обработчик события для кнопки "Далее"
    var nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', function() {
    // Получаем значение года из инпута
    selectedMetro = input.value;

    // Проверяем, был ли выбран год
    if (selectedMetro !== '') {
        // Переходим на следующую страницу
        window.location.href = "room.html";
        // Запуск функции прогресса
        progress();
    } else {
        // Выводим сообщение, если год не выбран
        alert("Пожалуйста, укажите расстояние до ближайшей станции метро.");
    }
});
  
    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = "type.html"; // Переход на страницу index2.html
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
  