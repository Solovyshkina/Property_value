import overpy           # to import the overpy module
import pandas as pd     # to import pandas library
from geopy.geocoders import Nominatim


def get_coordinates(adress):
	geolocator = Nominatim(user_agent="Tester")
	location = geolocator.geocode(adress) #Создаем переменную, которая состоит из нужного нам адреса
	return str(location.latitude), str(location.longitude) #И теперь возвращаем GPS-координаты нужного нам адреса


def get_hospital_query(user_input):
	prefix = """[out:json][timeout:50];("""	#this is string of syntex in 'Overpass QL' language
	hospital_node = """node["amenity"="hospital"](around:"""
	doctor_node = """node["amenity"="doctors"](around:"""
	clinic_node = """node["amenity"="clinic"](around:"""
	suffix = """);out body;>;out skel qt;"""	#this is string of syntex in 'Overpass QL' language
	q = user_input[0]+','+user_input[1]+','+user_input[2]	#(radius,latitude,longitude) in a string from the user input
	built_query = prefix + hospital_node + q + ');' + doctor_node + q + ');' + clinic_node + q + ');' + suffix	#arrange all above strings into a correct order to form complete query
	return built_query	#return the complete query to main function


def get_eat_query(user_input):
	prefix = """[out:json][timeout:50];("""		#this is string of syntex in 'Overpass QL' language
	cafe_node = """node["amenity"="cafe"](around:"""
	fastfood_node = """node["amenity"="fast_food"](around:"""
	food_court_node = """node["amenity"="food_court"](around:"""
	restaurant_node = """node["amenity"="restaurant"](around:"""
	suffix = """);out body;>;out skel qt;"""	#this is string of syntex in 'Overpass QL' language
	q = user_input[0]+','+user_input[1]+','+user_input[2]	#(radius,latitude,longitude) in a string from the user input
	built_query = prefix + cafe_node + q + ');' + fastfood_node + q + ');' + food_court_node + q + ');' + restaurant_node + q + ');' + suffix   #arrange all above strings into a correct order to form complete query
	return built_query


#this function arrenge user inputs to build the 'query'(in overpass QL language) for schools,college,university and returns the query
def get_school_query(user_input):
	prefix = """[out:json][timeout:50];("""		#this is string of syntex in 'Overpass QL' language
	school_node = """node["amenity"="school"](around:"""	#this is string of syntex in 'Overpass QL' language
	kindergarten_node = """node["amenity"="kindergarten"](around:"""	#this is string of syntex in 'Overpass QL' language
	suffix = """);out body;>;out skel qt;"""	#this is string of syntex in 'Overpass QL' language
	q = user_input[0]+','+user_input[1]+','+user_input[2]	#(radius,latitude,longitude) in a string form the user input
	built_query = prefix + school_node+ q + ');' + kindergarten_node+ q + ');' + suffix	#combine all the above strings in correct order to form a query
	return built_query


def data_from_OSM(built_query):
	api = overpy.Overpass()                       # creating a overpass API instance
	result = api.query(built_query)               # get result from API by sending the query to overpass servers
	list_of_node_tags = []                        # initializing empty list , we'll use it to form a dataframe .
	for node in result.nodes:                     # from each node , get the all tags information
		node.tags['latitude'] = node.lat
		node.tags['longitude'] = node.lon
		node.tags['id'] = node.id
		list_of_node_tags.append(node.tags)
	data_frame = pd.DataFrame(list_of_node_tags)  # forming a pandas dataframe using list of dictionaries
	data_frame.to_csv('output_data.csv')
	print("\nCSV file created- 'output_data.csv'. Check the file in current directory.")
	return data_frame                             # return data frame if you want to use it further in main function.


def count_data_osm(built_query):
	api = overpy.Overpass()  # creating a overpass API instance
	result = api.query(built_query)
	return len(result.nodes)


if __name__ == '__main__':  #main function to act accordingly to the user's input.

	adress = str(input('Введите адрес: \n'))  # Получаем интересующий нас адрес

	latitude, longitude = get_coordinates(adress)
	search_radius = '2000'

	user_data= [search_radius, str(latitude), str(longitude)]#(radius,latitude,longitude)
	school_query = get_school_query(user_data)
	hospital_query = get_hospital_query(user_data)
	eat_query = get_eat_query(user_data)

	data_from_OSM(hospital_query)
	data_from_OSM(eat_query)
	data_from_OSM(school_query)
	print(count_data_osm(school_query))
	print(count_data_osm(hospital_query))
	print(count_data_osm(eat_query))
