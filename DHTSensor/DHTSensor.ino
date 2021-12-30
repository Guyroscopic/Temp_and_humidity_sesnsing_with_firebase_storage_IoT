#include <FirebaseESP8266.h>
#include <Adafruit_Sensor.h>
#include <ESP8266WiFi.h>
#include <DHT.h>

//DHT11 sensor Settings
#define DHTPIN 5
#define DHTTYPE DHT11

//Firebase Settings
#define FIREBASE_HOST "iot-project-183-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "PqlYOSHG7pVeJpOa7eoOy4aA8ycHFnv4m8bKvmRs"

//Defining DHT, WiFi and Firebase objects
DHT dht(DHTPIN, DHTTYPE);
WiFiClient client;
FirebaseData firebaseData;   


//Getway WiFi Credentials
const char *ssid =  "Guyro";         //Wi-Fi Username
const char *pass =  "rafey2000";     //Wi-Fi Password


void setup(void)
{
  Serial.begin(9600);

  //Initializing up WiFi
  Serial.print("Connecting");
  Serial.print("WiFi...");
  delay(2000);
  Serial.println("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);

  //Initializing up Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  delay(2000);
  Serial.println("Initializing...");

  //Initializing up DHT sensor
  dht.begin();
}

void loop(void)
{

  //Reading temp and humidity from DHT sensor
  float tempC    = dht.readTemperature();
  float humidity = dht.readHumidity();

  //Printing on Serial monitor
  Serial.print("Temperature C: ");
  Serial.print(tempC);
  Serial.println();

  Serial.print("Humidity: ");
  Serial.print(humidity);Serial.print("%");

  //Sending data to Firebase real-time data storage
//  Firebase.pushInt(firebaseData, "/Temperature", tempC);
//  Firebase.pushInt(firebaseData, "/Humidity"   , humidity);

  Firebase.pushFloat(firebaseData, "/Temperature", tempC);
  Firebase.pushFloat(firebaseData, "/Humidity"   , humidity);
  
  Serial.println();

  //Wating 1 secind before taking next reading
  delay(1000);
}
