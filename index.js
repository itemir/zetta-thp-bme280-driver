/*
MIT License

Copyright (c) 2016 Ilker Temir

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var Device = require('zetta-device');
var util = require('util');
var BME280 = require('node-bme280');

var Sensor = module.exports = function(opts) {
  Device.call(this);
  this.temperature = null;
  this.humidity = null;
  this.pressure = null;
  this._opts = opts || {};
  this._timeOut = null;
  this._address = this._opts['address'] || 0x76;
  this.bme280 = new BME280({address: this._address});

  this.bme280.begin(function(err) {
    if (err) {
        console.info('Error initializing BME280 sensor.', err);
        return;
    }
    console.info('BME280 sensor initialized');
  });
};
util.inherits(Sensor, Device);

Sensor.prototype.init = function(config) {
  config
    .name('Weather')
    .type('sensor')
    .state('ready')
    .when('ready', {allow: ['make-not-ready']})
    .when('not-ready', {allow: ['make-ready']})
    .map('make-ready', this.makeReady)
    .map('make-not-ready', this.makeNotReady)
    .monitor('temperature')
    .monitor('humidity')
    .monitor('pressure');

  this._start();
};

Sensor.prototype.makeReady = function(cb) {
  this.state = 'ready';
  this._start();
  cb();
}

Sensor.prototype.makeNotReady = function(cb) {
  this.state = 'not-ready'
  this._stop();
  this.temperature = null;
  this.humidity = null;
  this.pressure = null;
 cb();
}

Sensor.prototype._start = function(cb) {
  var self = this;
  this._timeOut = setInterval(function() {
    self.bme280.readPressureAndTemparature(function(err, pressure, temperature, humidity) {
      self.temperature = temperature.toFixed(2);
      self.pressure = (pressure / 100).toFixed(2);
      self.humidity = humidity.toFixed(2);
    });
  }, 1000);
}

Sensor.prototype._stop = function(cb) {
  clearTimeout(this._timeOut);
}
