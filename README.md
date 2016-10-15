# Zetta BME280 Temperature, Humidity and Pressure (THP) Driver

## Install

```
$ npm install https://github.com/itemir/zetta-thp-bme280-driver --save
```

## Usage

```javascript
var zetta = require('zetta');
var BME280 = require('zetta-thp-bme280-driver');

zetta()
  .use(BME280)
  .listen(1337)
```

