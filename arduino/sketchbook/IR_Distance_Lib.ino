//#include <DistanceGP2Y0A21YK.h>
#include <Bridge.h>
#include <Process.h>

//DistanceGP2Y0A21YK Dist;
//int currentValues[4];
//int distance;
int door1_PIN = 2;
int door2_PIN = 4;
int door1_VAL = 0;
int door2_VAL = 0;
//bool isInRange;
//String distanceSTR;
String message;

void setup() {
  Bridge.begin();
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  pinMode(door1_PIN, INPUT);
  pinMode(door2_PIN, INPUT);
  digitalWrite(door1_PIN, HIGH);
  digitalWrite(door2_PIN, HIGH);
  //Dist.begin(A0); // TODO: Should init all sensors
}

void loop() {
  // Testing sequence calls, every 3 seconds
  // TODO: Currently only using one sensor
  delay(3000);
  getValue();
}

// TODO: Should get value of each sensor in sequence, if all of the 
// sensors are out of range do nothing, otherwise send all data to server.
void getValue() {
  //isInRange = Dist.isCloser(18);
  //distance = Dist.getDistanceCentimeter();
  //distanceSTR = String(distance);
  
  door1_VAL = digitalRead(door1_PIN);
  door2_VAL = digitalRead(door2_PIN);

  if(door1_VAL == 1) {
    Serial.print("Stall Door 1 Open");
    Serial.print("\n");
    digitalWrite(13, HIGH);
    sendValue("open1");
  }
  else {
    Serial.print("Stall Door 1 Closed");
    Serial.print("\n");
    digitalWrite(13, LOW);
    sendValue("close1");
  }

  if(door2_VAL == 1) {
    Serial.print("Stall Door 2 Open");
    Serial.print("\n");
    digitalWrite(13, HIGH);
    sendValue("open2");
  }
  else {
    Serial.print("Stall Door 2 Closed");
    Serial.print("\n");
    digitalWrite(13, LOW);
    sendValue("close2");
  }
  
}

void sendValue(String commandType) {
  Process p; // Create a process and call it "p"
  p.begin("python"); // Process to launch the "python" command
  p.addParameter("/mnt/sda1/arduino/send-post-data.py"); // Add the python script path parameter
  Serial.print(commandType + '\n');
  p.addParameter(commandType);
  p.run(); // Run the process and wait for its termination
}
