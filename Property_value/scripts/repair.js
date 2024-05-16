document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.card');
    var selectedRepair = ''; // Переменная для хранения выбранного типа дома
    let selectedItemsResult = []
    cards.forEach(function(card) {
        card.addEventListener('click', function() {
            // Удаляем класс 'selected' у всех карточек
            cards.forEach(function(c) {
                c.classList.remove('selected');
            });

            // Добавляем класс 'selected' только к выбранной карточке
            this.classList.add('selected');

            // Получаем тип дома из атрибута 'data-type' выбранной карточки
            selectedRepair = this.getAttribute('data-type');
            console.log('Выбранный тип дома:', selectedRepair);

            // На других страницах, где вам нужно загрузить список
            // Загружаем список из localStorage
            var selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
            selectedItems.push(selectedRepair);
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
            console.log(selectedItems);
            selectedItemsResult=[selectedItems[4], selectedItems[7], selectedItems[1], selectedItems[6], selectedItems[5], selectedItems[8], selectedItems[2]]
            // console.log(selectedItems);
            // Выводим значение переменной района в консоль
            console.log(selectedItemsResult);
            progress()
        });
    });
  
    // // Обработчик события для кнопки "Далее"
    // var nextButton = document.querySelector('.next-button');
    // nextButton.addEventListener('click', function() {
    //     window.location.href = "?.html"; // Переход на страницу index5.html
    // });
  
    // Обработчик события для кнопки "Назад"
    var backButton = document.querySelector('.back-button');
    backButton.addEventListener('click', function() {
        window.location.href = "floor.html"; // Переход на страницу index3.html
    });
  });
  
function progress() {
    var totalPages = 11; // Общее количество страниц
    var currentPage = 11; // Текущая страница
    var elem = document.querySelector(".progress-bar");
    var width = 100;
  
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
  