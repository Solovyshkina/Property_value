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
    // function logValue(value) {
    //     console.log(value);
    // }

    // Обработчик события для изменения значения в инпуте при перемещении ползунка
    slider.addEventListener("input", function() {
        var value = this.value;
        input.value = value;
        sliderValue.textContent = value;
        updateSliderValuePosition();
        console.log(value); // Вызываем функцию вывода значения в консоль
    });

    // Обработчик события для изменения значения ползунка при вводе значения в инпут
    input.addEventListener("input", function() {
        var value = parseFloat(this.value);
        if (!isNaN(value)) {
            var val = Math.min(1500, Math.max(15, value));
            slider.value = val;
            sliderValue.textContent = val;
            updateSliderValuePosition();
            console.log(val); // Вызываем функцию вывода значения в консоль
        } else {
            slider.value = 15;
            sliderValue.textContent = 15;
            updateSliderValuePosition();
            console.log(15); // Вызываем функцию вывода значения в консоль
        }
    });

    // Обновляем позицию значения над ползунком при загрузке страницы
    updateSliderValuePosition();

    // Создаем глобальную переменную для хранения списка выбранных элементов
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    // Обработчик события для кнопки "Далее"
    var nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', function() {
        // Получаем значение площади квартиры из инпута
        selectedSquere = input.value;
        console.log(selectedSquere); // Выводим значение в консоль
        // Проверяем, была ли указана площадь квартиры
        if (selectedSquere !== '') {
            // Добавляем выбранную площадь квартиры в список
            selectedItems.push(selectedSquere);
            // Сохраняем обновленный список выбранных элементов в localStorage
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            // Переходим на следующую страницу
            window.location.href = "balcony.html";
            // Запуск функции прогресса
            progress();
        } else {
            // Выводим сообщение, если площадь квартиры не указана
            alert("Пожалуйста, укажите площадь квартиры.");
        }
    });
  
    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = "lift.html"; // Переход на страницу index2.html
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
