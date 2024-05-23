from flask import Flask, request, jsonify
import json
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS
#площадь, этаж, год, туалет, балкон, вид ремонта, тип дома, район

app = Flask(__name__)
CORS(app)
path = 'model_neural.sav'
# path = 'regr_model.sav'


def open_model(file):
    return pickle.load(open(file, 'rb'))


def read_json(file):
    with open(file) as f:
        data = json.load(f)
    item_list = []
    for item in data:
        item_list.append(item)

    return np.array(item_list)


def encoding_data(data):
    x = pd.Series(data)
    x_encoding = pd.DataFrame()
    x_encoding['meters'] = [(float(x[0]) - 24) / (314 - 24)]
    x_encoding['floor 2'] = [(float(x[1]) - 2) / (29 - 2)]
    x_encoding['year_at_home'] = [(float(x[2]) - 1756) / (2024 - 1756)]
    x_encoding['toilet'] = [(float(x[3]) - 1) / (5 - 1)]
    x_encoding['balcony'] = [(float(x[4]) - 0) / (4 - 0)]

    list_district = ['district_р-н Адмиралтейский', 'district_р-н Василеостровский',
                     'district_р-н Выборгский', 'district_р-н Калининский',
                     'district_р-н Кировский', 'district_р-н Колпинский',
                     'district_р-н Красногвардейский', 'district_р-н Красносельский',
                     'district_р-н Курортный', 'district_р-н Московский',
                     'district_р-н Невский', 'district_р-н Петроградский',
                     'district_р-н Петродворцовый', 'district_р-н Приморский',
                     'district_р-н Пушкинский', 'district_р-н Фрунзенский',
                     'district_р-н Центральный']
    for item in list_district:
        item_1, item_2 = item.split(' ')
        if item_2 == x[7]:
            x_encoding[item] = 1
        else:
            x_encoding[item] = 0

    list_repair = ['repair_Без ремонта', 'repair_Дизайнерский', 'repair_Евроремонт', 'repair_Косметический']
    for item in list_repair:
        item_1, item_2 = item.split('_')
        if item_2 == x[5]:
            x_encoding[item] = 1
        else:
            x_encoding[item] = 0

    list_type_of_house = ['type_of_house_Блочный', 'type_of_house_Кирпичный', 'type_of_house_Монолитно-кирпичный',
                          'type_of_house_Монолитный',
                          'type_of_house_Панельный', 'type_of_house_Старый фонд']
    for item in list_type_of_house:
        item_1, item_2 = item.split('house_')
        if item_2 == x[6]:
            x_encoding[item] = 1
        else:
            x_encoding[item] = 0

    x_list = x_encoding.values
    return x_list


def predict_range(model, data):
    sigma = 0.25
    result = model.predict(data)
    print('RESULT', result, type(result))
    result_upper_bound = result[0][0] + sigma

    print('RESULT_UPPER_BOUND', result_upper_bound, type(result_upper_bound))
    result_upper_bound = np.power(np.e, result_upper_bound)

    print('RESULT_UPPER_BOUND', result_upper_bound, type(result_upper_bound))
    result_lower_bound = result[0][0] - sigma
    result_lower_bound = np.power(np.e, result_lower_bound)

    result_upper_bound_str = str(result_upper_bound).split('.')[0]
    result_lower_bound_str = str(result_lower_bound).split('.')[0]

    if len(result_upper_bound_str) > 6:
        result_upper_bound_redused = result_upper_bound_str[:-6] + '.' + result_upper_bound_str[-6:-3]
    else:
        result_upper_bound_redused = '0.' + result_upper_bound_str[-6:-3]

    if len(result_lower_bound_str) > 6:
        result_lower_bound_redused = result_lower_bound_str[:-6] + '.' + result_lower_bound_str[-6:-3]
    else:
        result_lower_bound_redused = '0.' + result_lower_bound_str[-6:-3]

    return result_lower_bound_redused, result_upper_bound_redused


@app.route('/predict', methods=['POST'])
def predict():
    data = request.json['data']  # Получаем данные JSON непосредственно из запроса
    model = open_model(path)
    encoded_data = encoding_data(data)
    result = predict_range(model, encoded_data)

    response = {
        'result_lower_bound': result[0],
        'result_upper_bound': result[1]
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)



