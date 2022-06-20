//FirebaseESP8266.h must be included before ESP8266WiFi.h
#include <FirebaseESP8266.h>    // Install Firebase ESP8266 library
#include <ESP8266WiFi.h>
#include <DHT.h>                // Install DHT11 Library and Adafruit Unified Sensor Library


#define FIREBASE_HOST "project3-d50ab-default-rtdb.firebaseio.com"  // the project name address from firebase id
#define FIREBASE_AUTH "h67BuoIiitJ40PQGLDKYbocZhSQwLHIGs3uKQhgM"    // the secret key generated from firebase
#define WIFI_SSID "######"                                          // input your home or public wifi name 
#define WIFI_PASSWORD "######"                                      //password of wifi ssid
#define DHTPIN 5                                                    // Connect Data pin of DHT to D1
#define DHTTYPE    DHT11
DHT dht(DHTPIN, DHTTYPE);

//Define FirebaseESP8266 data object
FirebaseData firebaseData;
FirebaseJson json;

float vref = 3.3;
float resolution = vref/1023;

void setup()
{
    Serial.begin(115200);
    dht.begin();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();
    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.reconnectWiFi(true);
}

void sensorUpdate()
{
    float h = dht.readHumidity();
    // Read temperature as Celsius (the default)
    float t = dht.readTemperature();
    // Read temperature as Fahrenheit (isFahrenheit = true)
    float f = dht.readTemperature(true);
    // Check if any reads failed
    if (isnan(h) || isnan(t) || isnan(f))
    {
        Serial.println(F("Failed to read from DHT sensor!"));
        return;
    }
    
    Serial.print(F("Humidity: "));
    Serial.print(h);
    Serial.print(F("%  Temperature: "));
    Serial.print(t);
    Serial.print(F("C  ,"));
    Serial.print(f);
    Serial.println(F("F  "));
    String st = String(t) + String("°C");
    String sh = String(h) + String("%");
    
    Serial.println(" ====== LM35 SENSOR ====== ");
    float temp = analogRead(A0);
    temp = (temp*resolution);
    temp = temp*100;
    Serial.print(" Temperature LM35: ");
    Serial.print(temp);
    Serial.println("°C ");
    Serial.println(" ========================== ");
    String temp2 = String(temp) + String("°C");
    
    if (Firebase.setString(firebaseData, "/FirebaseIOT/temperature", st))
    {
        Serial.println("PASSED");
    }
    else
    {
        Serial.println("FAILED");
    }
    if (Firebase.setString(firebaseData, "/FirebaseIOT/humidity", sh))
    {
        Serial.println("PASSED");
    }
    else
    {
        Serial.println("FAILED");
    }
    
    if (Firebase.setString(firebaseData, "/FirebaseIOT/temperature_LM35", temp2))
    {
        Serial.println("PASSED");
    }
    else
    {
        Serial.println("FAILED");
    }
}

void loop()
{
    sensorUpdate();
}
