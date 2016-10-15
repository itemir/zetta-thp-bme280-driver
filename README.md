## Zetta BME280 Temperature, Humidity and Pressure (THP) Driver

Zetta is an open source platform built on Node.js for creating Internet of
Things (IoT) servers that run across geo-distributed computers and the
cloud. 

This is a Zetta driver for BME280 temperature, humidity and pressure
sensor.

### Installation

This driver requires a prior installation of BME280 sensor using the
I2C bus. Check the following [tutorial](https://www.partmarine.com/blog/nine_dollar_weather_station_for_raspberry_pi/)
for installing one on a Raspberry Pi (and ignore the steps around Signal K).

### Example

```
$ mkdir bme280_test
$ cd bme280_test
$ npm init
$ npm install zetta --save
$ npm install https://github.com/itemir/zetta-thp-bme280-driver --save
```

### Usage

Save the following to bme280.js:
```javascript
var zetta = require('zetta');
var BME280 = require('zetta-thp-bme280-driver');

zetta()
  .use(BME280)
  .listen(1337)
```

Run with sudo (or adjust device permissions):

```
sudo node bme280.js
```

You can now browse to http://browser.zettajs.io/#/overview?url=http://127.0.0.1:1337

If you are not running this on localhost, change 127.0.0.1 to the IP address of the
device.
