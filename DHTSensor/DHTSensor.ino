#include <DHT.h>
#include <Adafruit_Sensor.h>
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#define DHTPIN 5
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

WiFiClient client;    
 
const char *ssid =  "Guyro";     // Keep your Wi-Fi Username
const char *pass =  "rafey2000";     // Keep your Wi-Fi Password

//Firebase settings
#define FIREBASE_HOST "iot-project-183-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "PqlYOSHG7pVeJpOa7eoOy4aA8ycHFnv4m8bKvmRs"

FirebaseData firebaseData;


void setup(void)
{
  Serial.begin(9600);

  //Setting up WiFi
  Serial.print("Connecting");
  Serial.print("WiFi...");
  delay(2000);
  Serial.println("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, pass);

  //Setting up Firebase
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

  //Setting up DHT sendor
  dht.begin();
}
void loop(void)
{
  float tempC = dht.readTemperature();
  float humidity = dht.readHumidity();

  Serial.print("Temperature C: ");
  Serial.print(tempC);
  Serial.println();

  Serial.print("Humidity: ");
  Serial.print(humidity);Serial.print("%");
  Firebase.pushInt(firebaseData, "/Temperature", tempC);
  Firebase.pushInt(firebaseData, "/Humidity", humidity);
  Serial.println();

  delay(500);
}
