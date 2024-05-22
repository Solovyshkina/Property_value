import pickle
import numpy as np
import pandas as pd
from sklearn.preprocessing import PolynomialFeatures

def open_model(file):
    return pickle.load(open(file, 'rb'))

def predict_range(model, data):
    sigma = 0.25
    result = model.predict(data)
    result_upper_bound = result[0][0] + (1 * sigma)
    result_lower_bound = result[0][0] - (1 * sigma)
    return result_lower_bound, result_upper_bound, result

def encoding(data):

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

    list_repair = ['repair _Без ремонта', 'repair _Дизайнерский', 'repair _Евроремонт', 'repair _Косметический']
    for item in list_repair:
        item_1, item_2 = item.split(' _')
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

    x_encoding = x_encoding.values
    return x_encoding

if __name__ == '__main__':

    path = 'model_neural.sav'
    # path = 'regr_model.sav'
    model = open_model(path)

    data = [['70', '18', '2010', '1', '1', 'Евроремонт', 'Блочный', 'Красносельский'],
            ['50', '20', '1999', '2', '1', 'Без ремонта', 'Кирпичный', 'Калининский'],
            ['30', '5', '2020', '1', '1', 'Евроремонт', 'Блочный', 'Красносельский'],
            ['150', '2', '2023', '3', '2', 'Дизайнерский', 'Монолитный', 'Петроградский'],
            ['100', '10', '2007', '2', '1', 'Косметический', 'Блочный', 'Невский'],
            ['100', '10', '2007', '2', '1', 'Косметический', 'Блочный', 'Невский'],
            ['40', '5', '1899', '1', '0', 'Косметический', 'Старый фонд', 'Невский'], ]

    for i in data:

        enc_data = encoding(i)

        # for polynom
        # polynom_2 = PolynomialFeatures(2, include_bias=False)
        # x_poly_2 = polynom_2.fit_transform(enc_data)

        res = predict_range(model, enc_data)
        print(res[0], res[1], res[2])
        print(np.power(np.e, res[0]), np.power(np.e, res[1]), np.power(np.e, res[2]))





