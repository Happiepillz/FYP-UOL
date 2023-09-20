import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { apiKey } from '../keys/weatherAPIKey';
import * as Location from 'expo-location';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Weather = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [temperature, setTemperature] = useState(0);
    const [locationName, setLocationName] = useState(null);
    const [feelslike, setFeelsLike] = useState(null);
    const [weatherCondition, setWeatherCondition] = useState(null);
    const [country, setCountry] = useState(null);
    const [error, setError] = useState(null);

    const temperatureTextColor = temperature > 30 ? 'red' : '#189ad3';
    const weatherIcons = {
        Rain: 'weather-rainy',
        Clear: 'weather-sunny',
        Clouds: 'weather-cloudy',
        Thunderstorm: 'weather-lightning-rainy',
        // Add more mappings for other weather conditions
      };
    
    const weatherIconName = weatherIcons[weatherCondition] || 'weather-sunny';

    useEffect(() => {
        getLocationAndFetchWeather();
      }, []);
    

      const getLocationAndFetchWeather = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setError('Permission to access location was denied');
            return;
          }
    
          const location = await Location.getCurrentPositionAsync({});
          fetchWeather(location.coords.latitude, location.coords.longitude);
        } catch (error) {
          setError('Error retrieving weather conditions!');
        }
      };

      const fetchWeather = async (lat = 25, lon = 25) => {
        try {
          const response = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${apiKey}&units=metric`
          );
          const json = await response.json();
          console.log(json);
          setTemperature(json.main.temp);
          setWeatherCondition(json.weather[0].main);
          setLocationName(json.name);
          setFeelsLike(json.main.feels_like);
          setCountry(json.sys.country);
          setIsLoading(false);
        } catch (error) {
          setError('Error fetching weather data');
        }
      };

  return (
    <View style={styles.weatherContainer}>
        <View style={styles.headerContainer}>
            <Text style={[styles.tempText, { color: temperatureTextColor }]}>{temperature}˚c</Text>
            
        </View>
        <View style={styles.bodyContainer}>
            <Text style={styles.subtitle}>{locationName}, {country}</Text>
            <View >
            <Text style={styles.subtitle}>{weatherCondition}</Text>
            <MaterialCommunityIcons size={16} name={weatherIconName} color={'#000'} />
            </View>
            <Text style={styles.subtitle}>Feels like: {feelslike}˚</Text>
        </View>
        
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    top: 10,
  },
  tempText: {
    fontSize: 36,
    alignItems: 'center',
    
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    bottom: 1,
  },
  title: {
    fontSize: 8,
    color: 'black'
  },
  subtitle: {
    fontSize: 12,
    color: 'black'
  },
  icon:{
    flexdirection: 'row',
  },
});

export default Weather;