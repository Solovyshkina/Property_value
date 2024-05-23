document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.card');
    var selectedType = ''; // Переменная для хранения выбранного типа дома

    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Удаляем класс 'selected' у всех карточек
            cards.forEach(function(c) {
                c.classList.remove('selected');
            });

            // Добавляем класс 'selected' только к выбранной карточке
            this.classList.add('selected');

            // Получаем тип дома из атрибута 'data-type' выбранной карточки
            selectedType = this.getAttribute('data-type');
            console.log('Выбранный тип дома:', selectedType);
            

        });
    });

    var nextButton = document.querySelector('.next-button');
    nextButton.addEventListener('click', function() {
        if (selectedType !== '') {
            // Загружаем список из localStorage
            var selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
            selectedItems.push(selectedType);
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            // Выводим значение переменной района в консоль
            console.log(selectedItems);
            window.location.href = "metro.html";
            progress();
        } else {
            alert("Пожалуйста, сначала выберите тип дома.");
        }
    });

    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = "year.html";
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
