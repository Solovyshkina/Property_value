import pickle
import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, mean_squared_error
import matplotlib.pyplot as plt

def show_graf():
    plt.plot(history.history['mae'],
            label='Средняя абсолютная ошибка на обучающем наборе')
    plt.plot(history.history['val_mae'],
            label='Средняя абсолютная ошибка на проверочном наборе')
    plt.xlabel('Эпоха обучения')
    plt.ylabel('Средняя абсолютная ошибка')
    plt.legend()
    plt.show()

x = pd.read_csv('encoding_data/x_clean.csv')
y = pd.read_csv('encoding_data/y_clean.csv')
x = x.drop('Unnamed: 0', axis=1)
y = y.drop('Unnamed: 0', axis=1)

y_log = np.log(y)
x_drop = x.copy()
x_drop = x_drop.drop(['rooms', 'floor 1', 'living_area',
                      'hospital_info', 'eat_info', 'school_info', 'average_time', 'elevators', 'service lift',
                      'type_апартаменты',
                      'type_квартира',
                      'mortgage_No',
                      'mortgage_возможна', 'window_view_Во двор', 'window_view_На улицу',
                      'window_view_На улицу и двор',

                      'parking_No', 'terms_of_transaction_альтернатива', 'terms_of_transaction_переуступка',
                      'terms_of_transaction_свободная продажа',
                      'parking_Многоуровневая', 'parking_Наземная', 'parking_Открытая',
                      'parking_Подземная'], axis=1)


X_train, X_test, y_train, y_test = train_test_split(x_drop, y_log, test_size=0.3, random_state=64)

X_train = X_train.values
X_test = X_test.values
y_train = y_train.values
y_test = y_test.values


model = Sequential()
model.add(Dense(20, input_dim=32, activation='relu'))
model.add(Dense(1, activation='linear'))

model.compile(loss='mse', optimizer='adam', metrics=['mse', 'mae'])
#fit and visual
history = model.fit(X_train, y_train, batch_size=10, epochs=200, validation_split=0.1)
show_graf()


test_predictions = model.predict(X_test)
trai_predictions = model.predict(X_train)
predictions = model.predict(x_drop)

mse = mean_squared_error(y_log, predictions)
sigma = np.sqrt(mse)
sse = np.sum((test_predictions - y_test )**2) + np.sum((trai_predictions - y_train )**2)

print("MSE: {}".format(mse))
print("SSE: {}".format(sse))
print("sigma: {}".format(sigma))

# save model
pickle.dump(model, open('model_neural.sav', 'wb'))

# test saved model
x_ser = x_drop.values
model = pickle.load(open('model_neural.sav', 'rb'))
predict = model.predict(x_ser)
mse = mean_squared_error(y_log, predict)
print(mse)


