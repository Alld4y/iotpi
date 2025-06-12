#define sw A2
#define firstLedPin 3
#define lastLedPin 10
// definePin

int state = 0;
bool btn;

int atCenterRef = (firstLedPin + lastLedPin - 1) / 2; // (2 + 9 - 1) / 2 = 5
int stepCenterToRight[4] = {atCenterRef, atCenterRef - 1, atCenterRef - 2, atCenterRef - 3};
int stepCenterToLeft[4] = {atCenterRef + 1, atCenterRef + 2, atCenterRef + 3, atCenterRef + 4};

int patternA[][3] = {{firstLedPin}, {firstLedPin, firstLedPin + 1}, {firstLedPin, firstLedPin + 1, firstLedPin + 2}, {firstLedPin + 1, firstLedPin + 2, firstLedPin + 3}, {firstLedPin + 2, firstLedPin + 3, firstLedPin + 4}, {firstLedPin + 3, firstLedPin + 4, firstLedPin + 5}, {firstLedPin + 4, firstLedPin + 5, firstLedPin + 6}, {firstLedPin + 5, firstLedPin + 6, firstLedPin + 7}, {firstLedPin + 6, firstLedPin + 7, 99}, {firstLedPin + 7}};
int patternB[][8] = {{2}, {2, 3}, {2, 3, 4}, {2, 3, 4, 5}, {2, 3, 4, 5, 6}, {2, 3, 4, 5, 6, 7}, {2, 3, 4, 5, 6, 7, 8}, {2, 3, 4, 5, 6, 7, 8, 9}};

bool ledState = LOW;
unsigned long previousMillis = 0;
unsigned long ledOnTime = 300; // เวลาที่ LED เปิด

int step = firstLedPin;

char *direction = "Forward";

void setup()
{
    for (int i = firstLedPin; i <= lastLedPin; i++)
    {
        pinMode(i, OUTPUT);
    }
    pinMode(sw, INPUT);
    Serial.begin(9600);
}

void loop()
{
    int duration = 500; // ระยะเวลาหน่วงสำหรับการเปลี่ยน LED
    btn = digitalRead(sw);

    // Serial.println(direction);

    if (btn)
    {
        for (int pinCount = firstLedPin; pinCount < lastLedPin + 1; pinCount++)
        {
            digitalWrite(pinCount, 0);
        }
        direction = "Forward";
        // Step Init
        step = (state == 1 || state == 7) ? firstLedPin : lastLedPin;
        // Step Init
        Serial.println("Button Pressed, Changing Direction");
        delay(15);
        state = (state + 1) % 8;
        Serial.print(state);
        int count = firstLedPin;
        ;
        ledState = LOW; // รีเซ็ตสถานะ LED
        while (digitalRead(sw))
        {
            count = (count + 1) % lastLedPin + 1;
            // Serial.println("Reset All Led ");
            // Serial.println(count);
            direction = "Forward";
        }
    }

    switch (state)
    {
    case 0:
        if (millis() - previousMillis >= duration)
        {
            previousMillis = millis();

            digitalWrite(step, HIGH);
            ledState = HIGH;
            ledOnTime = millis();
        }

        if (ledState == HIGH && millis() - ledOnTime >= 100)
        {
            digitalWrite(step, LOW);
            step++;
            ledState = LOW;

            if (step > lastLedPin)
            {
                step = firstLedPin;
            }
        }
        break;

    case 1:

        if (millis() - previousMillis >= duration)
        {
            previousMillis = millis();

            digitalWrite(step, HIGH);
            ledState = HIGH;
            ledOnTime = millis();
        }

        if (ledState == HIGH && millis() - ledOnTime >= 100)
        {
            digitalWrite(step, LOW);
            step--;
            ledState = LOW;

            if (step < firstLedPin)
            {
                step = lastLedPin;
            }
        }
        break;
    case 2:
        duration = 250;
        if (direction == "Forward")
        {
            if (millis() - previousMillis >= duration)
            {
                previousMillis = millis();

                digitalWrite(step, HIGH);
                ledState = HIGH;
                ledOnTime = millis();
            }

            if (ledState == HIGH && millis() - ledOnTime >= 100)
            {
                digitalWrite(step, LOW);
                step++;
                ledState = LOW;

                if (step > lastLedPin)
                {
                    step = lastLedPin - 1;
                    direction = "Backward";
                }
            }
        }
        if (direction == "Backward")
        {
            if (millis() - previousMillis >= duration)
            {
                previousMillis = millis();

                digitalWrite(step, HIGH);
                ledState = HIGH;
                ledOnTime = millis();
            }

            if (ledState == HIGH && millis() - ledOnTime >= 100)
            {
                digitalWrite(step, LOW);
                step--;
                ledState = LOW;

                if (step < firstLedPin)
                {
                    step = firstLedPin - 1;
                    direction = "Forward";
                }
            }
        }
        break;
    case 3:
        duration = 200;
        if (millis() - previousMillis >= duration)
        {
            previousMillis = millis();

            if (true)
            {
                digitalWrite(step, HIGH);
                digitalWrite((firstLedPin + lastLedPin) /* 11 - step */ - step, HIGH);
            }
            ledState = HIGH;
            ledOnTime = millis();
        }

        if (ledState == HIGH && millis() - ledOnTime >= 100)
        {
            digitalWrite(step, LOW);
            digitalWrite((firstLedPin + lastLedPin) /* 11 - step */ - step, LOW);

            step++;
            ledState = LOW;

            if (step > lastLedPin)
            {
                step = firstLedPin;
            }
        }
        break;
    case 4:
        duration = 200;
        if (millis() - previousMillis >= duration)
        {
            previousMillis = millis();

            int index = step - firstLedPin;
            if (index >= 0 && index < 4)
            { // ป้องกันการเข้าถึงอาร์เรย์เกินขอบเขต
                digitalWrite(stepCenterToRight[index], HIGH);
                digitalWrite(stepCenterToLeft[index], HIGH);
            }
            ledState = HIGH;
            ledOnTime = millis();
        }

        if (ledState == HIGH && millis() - ledOnTime >= 100)
        {
            int index = step - firstLedPin;
            if (index >= 0 && index < 4)
            { // ป้องกันการเข้าถึงอาร์เรย์เกินขอบเขต
                digitalWrite(stepCenterToRight[index], LOW);
                digitalWrite(stepCenterToLeft[index], LOW);
            }

            step++;
            ledState = LOW;

            if (step >= firstLedPin + 4)
            {
                step = firstLedPin;
            }
        }
        break;

    case 5:
        duration = 200;
        if (millis() - previousMillis >= duration)
        {
            previousMillis = millis();

            int index = step - firstLedPin;
            if (index >= 0 && index < 13)
            {
                digitalWrite(patternA[index][0], 1);
                digitalWrite(patternA[index][1], 1);
                digitalWrite(patternA[index][2], 1);
            }
            ledState = HIGH;
            ledOnTime = millis();
        }

        if (ledState == HIGH && millis() - ledOnTime >= 150)
        {
            int index = step - firstLedPin;
            if (index >= 0 && index < 13)
            {
                digitalWrite(patternA[index][0], 0);
                digitalWrite(patternA[index][1], 0);
                digitalWrite(patternA[index][2], 0);
            }

            step++;
            ledState = LOW;

            if (step >= firstLedPin + 13)
            {
                step = firstLedPin;
            }
        }
        break;
    case 6:

        duration = 500;
        if (millis() - previousMillis >= duration)
        {
            previousMillis = millis();

            for (int pinCount = firstLedPin; pinCount < lastLedPin + 1; pinCount++)
            {
                digitalWrite(pinCount, 1);
            }

            int index = step - firstLedPin;
            if (index >= 0 && index < 4)
            {
                digitalWrite(stepCenterToRight[index], LOW);
                digitalWrite(stepCenterToLeft[index], LOW);
            }
            ledState = HIGH;
            ledOnTime = millis();
        }

        if (ledState == HIGH && millis() - ledOnTime >= 300)
        {
            int index = step - firstLedPin;
            if (index >= 0 && index < 4)
            {
                digitalWrite(stepCenterToRight[index], HIGH);
                digitalWrite(stepCenterToLeft[index], HIGH);
            }

            step++;
            ledState = LOW;

            if (step >= firstLedPin + 4)
            {
                step = firstLedPin;
            }
        }
        break;
    }
}
