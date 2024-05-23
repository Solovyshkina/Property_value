document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('propertyForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const selected = document.querySelector('input[name="propertyType"]:checked');
        alert(`Вы выбрали: ${selected ? selected.value : 'ничего'}`);
    });
});
