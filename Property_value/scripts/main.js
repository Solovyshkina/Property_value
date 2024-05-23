document.addEventListener("DOMContentLoaded", function() {
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', function() {
        window.open('area.html', '_blank');
    });
});

// function slideLeft() {
//     var content = document.querySelector('.content'); // Получаем элемент с классом "content"
//     content.style.transition = 'transform 0.5s ease'; // Добавляем анимацию сдвига
//     content.style.transform = 'translateX(-100%)'; // Сдвигаем его влево на 100% от его собственной ширины

//     var overlay = document.querySelector('.overlaynew'); // Получаем элемент с классом "overlay"
//     overlay.style.transition = 'opacity 0.5s ease'; // Добавляем анимацию изменения прозрачности
//     overlay.style.opacity = '1'; // Устанавливаем прозрачность на 1 (делаем белый фон видимым)

//     setTimeout(function() {
//         window.location.href = document.getElementById('next-page').href; // Переходим на новую страницу после завершения анимации
//     }, 500);
// }
