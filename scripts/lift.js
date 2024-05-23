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
        console.log(input.value); // Выводим значение в консоль при изменении значения
    });

    // Обработчик события для изменения значения ползунка при вводе значения в инпут
    input.addEventListener("input", function() {
        var val = parseFloat(this.value);
        if (!isNaN(val)) {
            var minValue = parseFloat(slider.min);
            var maxValue = parseFloat(slider.max);
            val = Math.min(maxValue, Math.max(minValue, val));
            slider.value = val;
            sliderValue.textContent = val;
            updateSliderValuePosition();
            console.log(val); // Выводим значение в консоль при изменении значения
        } else {
            console.log("Некорректное значение"); // Выводим сообщение об ошибке в консоль
        }
    });

    // Обновляем позицию значения над ползунком при загрузке страницы
    updateSliderValuePosition();

    // Создаем глобальную переменную для хранения списка выбранных элементов
    let selectedItems = JSON.parse(localStorage.getItem('selectedItems')) || [];

    // Обработчик события для кнопки "Далее"
    var nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', function() {
        // Получаем значение года из инпута
        selectedLift = input.value;
        console.log(selectedLift); // Выводим список в консоль после добавления года
        // Проверяем, был ли выбран год
        if (selectedLift !== '' || selectedLift == '') {
            // Добавляем выбранный год в список
            selectedItems.push(selectedLift);
            
            // Сохраняем обновленный список выбранных элементов в localStorage
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            // Переходим на следующую страницу
            window.location.href = "squere.html";
            // Запуск функции прогресса
            progress();
        } else {
            // Выводим сообщение, если год не выбран
            alert("Пожалуйста, укажите количество лифтов в доме.");
        }
    });
  
    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        // Удаляем последний выбранный элемент из списка
        if (selectedItems.length > 0) {
            selectedItems.pop();
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            console.log('Updated selectedItems:', selectedItems);
        }
        window.location.href = "room.html"; // Переход на страницу index9.html
    });
});
  
function progress() {
    var totalPages = 11; // Общее количество страниц
    var currentPage = 5; // Текущая страница
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