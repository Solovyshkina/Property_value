document.addEventListener('DOMContentLoaded', function() {
    var predictionResult = JSON.parse(localStorage.getItem('predictionResult'));
    var selectedItems = JSON.parse(localStorage.getItem('selectedItems'));

    if (predictionResult && selectedItems) {
        var apartmentInfo = document.getElementById('apartment-info');
        var locationInfo = document.getElementById('location-info');
        var price = document.getElementById('price');

        apartmentInfo.textContent = "Санкт-Петербург · " + selectedItems[0] + " район";
        locationInfo.textContent = "Площадь квартиры: " + selectedItems[4] + " м²";
        console.log(predictionResult.result_lower_bound); // Обращаемся к свойству result_lower_bound
        price.textContent = `${predictionResult.result_lower_bound} - ${predictionResult.result_upper_bound} млн ₽`;
    }
});
