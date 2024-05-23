document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.card');

    var selectedRoom = ''; // Переменная для хранения выбранного типа дома

    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Удаляем класс 'selected' у всех карточек
            cards.forEach(function(c) {
                c.classList.remove('selected');
            });

            // Добавляем класс 'selected' только к выбранной карточке
            this.classList.add('selected');
            selectedRoom = this.getAttribute('data-type');
        });
    });

    // Обработчик события для кнопки "Далее"
    var nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', function() {
        if (selectedRoom !== '') {
            // Выводим значение переменной района в консоль
            window.location.href = "lift.html";
            progress();
        } else {
            // Выводим сообщение, если год не выбран
            alert("Пожалуйста, укажите количество комнат.");
        }
  });

    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = "metro.html"; // Переход на страницу main.html
    });
});

function progress() {
    var totalPages = 11; // Общее количество страниц
    var currentPage = 4; // Текущая страница
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
