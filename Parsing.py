import os
import time
from platform import system

import csv

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

service = Service(executable_path="C:/Users/1/Downloads/chromedriver-win64/chromedriver.exe")
driver = webdriver.Chrome(service=service)


# только для собственников и агентов (настройки в фильтрах)
driver.get("https://spb.cian.ru/cat.php?deal_type=sale&engine_version=2&offer_seller_type%5B0%5D=2&offer_seller_type%5B1%5D=3&offer_type=flat&region=2&room1=1&room2=1&room3=1&room4=1&room5=1&room6=1") #https://www.avito.ru/     https://spb.cian.ru/
url = webdriver.Chrome(service=service)

data = []

for i in range(1, 25, 2):

    # для блока с сылкой
    selector = f"#frontend-serp > div > div._93444fe79c--wrapper--W0WqH > div:nth-child({i}) > article > div._93444fe79c--card--ibP42 > a"

    try:
        block = driver.find_element(By.CSS_SELECTOR, selector)
        href = block.get_attribute("href")

        url.get(href)

        # кол-во
        # like 2-комн. квартира, 46,2 м²
        rooms, meters = url.find_element(By.CLASS_NAME, "a10a3f92e9--title--vlZwT").text.split(', ')

        # район
        district = url.find_element(By.CSS_SELECTOR, "#frontend-offer-card > div > div.a10a3f92e9--page--OYngf > div.a10a3f92e9--center--b3Pm0 > section > div > div > div:nth-child(2) > address > div > div > a:nth-child(2)").text

        # формирование массива с временем до метро
        try:
            time_list = []
            time_block = url.find_element(By.XPATH, '// *[ @ id = "frontend-offer-card"] / div / div[2] / div[2] / section / div / div / div[2] / address / ul[1]').find_elements(By.TAG_NAME, "li")

            for time_el in time_block:
                time = time_el.find_element(By.CLASS_NAME, "a10a3f92e9--underground_time--YvrcI").text
                time_list.append(time)

            if len(time_list) == 0:
                time_list = None

        except:
            time_list = None

        try:
            price = url.find_element(By.CLASS_NAME, "a10a3f92e9--amount--ON6i1").find_element(By.TAG_NAME, "span").text.replace(' ', '')

            # вернет массив с блоками, внутри забрать 2 span и распаковать в text
            price_block = url.find_elements(By.CLASS_NAME, "a10a3f92e9--item--iWTsg")
            price_info = []
            for item in price_block:

                first_block_span, second_block_span = item.find_elements(By.TAG_NAME, 'span')
                price_info.append(first_block_span.text)
                price_info.append(second_block_span.text)

            price_per_meter = ''
            mortgage = ''

            for item in range(len(price_info)):
                if price_info[item] == 'Цена за метр': price_per_meter = price_info[item+1]
                if price_info[item] == 'Ипотека': mortgage = price_info[item + 1]

            if len(price_per_meter) == 0:
                price_per_meter = None
            if len(mortgage) == 0:
                mortgage = None

        except:
            print('Exception. Price block')
            price = None
            price_per_meter = None
            mortgage = None



        # для определения и отлавливания отсутствующих значений None
        # информация о квартире и доме, которой может не быть
        try:
            # блок о квартире
            info_block = url.find_element(By.CLASS_NAME, 'a10a3f92e9--container--rGqFe')
            about_flat_block = info_block.find_element(By.CLASS_NAME, 'a10a3f92e9--group--K5ZqN')
            about_flat_info = about_flat_block.find_elements(By.TAG_NAME, 'p')

            flat_info_list = []
            for item in about_flat_info:
                flat_info_list.append(item.text)


            type_of_housing = ''
            living_area = ''
            toilet = ''
            window_view = ''
            balcony = ''
            repair = ''

            for i in range(len(flat_info_list)):
                if flat_info_list[i] == 'Тип жилья': type_of_housing = flat_info_list[i + 1]
                if flat_info_list[i] == 'Жилая площадь': living_area = flat_info_list[i + 1]
                if flat_info_list[i] == 'Санузел': toilet = flat_info_list[i + 1]
                if flat_info_list[i] == 'Вид из окон': window_view = flat_info_list[i + 1]
                if flat_info_list[i] == 'Балкон/лоджия': balcony = flat_info_list[i + 1]
                if flat_info_list[i] == 'Ремонт': repair = flat_info_list[i + 1]

            if len(type_of_housing) == 0:
                type_of_housing = None
            if len(living_area) == 0:
                living_area = None
            if len(toilet) == 0:
                toilet = None
            if len(window_view) == 0:
                window_view = None
            if len(balcony) == 0:
                balcony = None
            if len(repair) == 0:
                repair = None

        except:
            type_of_housing = None
            living_area = None
            toilet = None
            window_view = None
            balcony = None
            repair = None


        # данные о доме
        try:

            # данные о доме идут последовательно, при простом изменении итератора зависимо от строки
            # в about_house выбираются те теги, которые содержат информацию о доме


            info_block = url.find_element(By.CLASS_NAME, 'a10a3f92e9--container--rGqFe')
            about_house_block = info_block.find_element(By.CLASS_NAME, 'a10a3f92e9--right--_9uBM')
            about_house_info = about_house_block.find_elements(By.TAG_NAME, 'p')


            year_at_home = ''
            type_of_house = ''
            elevators = ''
            parking = ''
            house_info =[]

            for info in about_house_info:
                house_info.append(info.text)

            for i in range(len(house_info)):

                if house_info[i] == 'Год постройки': year_at_home = house_info[i+1]
                if house_info[i] == 'Тип дома': type_of_house = house_info[i+1]
                if house_info[i] == 'Количество лифтов': elevators = house_info[i+1]
                if house_info[i] == 'Парковка': parking = house_info[i+1]

             # инициализация пустых ячеек
            if len(year_at_home) == 0:
                year_at_home = None
            if len(type_of_house) == 0:
                type_of_house = None
            if len(elevators) == 0:
                elevators = None
            if len(parking) == 0:
                parking = None


        # если нет части с описанием дома
        except:

            year_at_home = None
            type_of_house = None
            elevators = None
            parking = None



        # формирование словаря для каждого объекта
        # добавление в массив data
        # data - массив, содержащий словари с данными

        dict_ = {'rooms': rooms,
                'meters': meters,
                'district': district,
                'time': time_list,
                'price': price,
                'price_per_meter': price_per_meter,
                'mortgage': mortgage,
                'type_of_housing' : type_of_housing,
                'living_area' : living_area,
                'toilet' : toilet,
                'window_view' : window_view,
                'balcony' : balcony,
                'repair ' : repair,
                'type_of_house': type_of_house,
                'year_at_home':  year_at_home,
                'elevators': elevators,
                'parking' : parking
                }


        data.append(dict_)


    except:
        pass


driver.close()
driver.quit()

print(data)