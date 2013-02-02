/* vim: set et ts=2 sts=2 sw=2: */

var http = require('http');
var webdriver = require('./node/webdriver');
var Q = require('q');
var _ = require('lodash');

function pingWebDriverServer(config) {
  var d = Q.defer();
  var attempt = 0;
  var url = 'http://' + config.host + ':' + config.port + '/status';

  function ping() {
    attempt++;
    http.get(url, function (response) {
      d.resolve(url.replace('status', 'wd/hub'));
    }).on('error', function (e) {
      if (attempt < config.retries) {
        setTimeout(ping, config.delay);
      } else {
        d.reject(e);
      }
    });
  }

  ping();
  return d.promise;
}

var defaultConfig = {
  server: {
    host: 'localhost',
    port: 4444,
    retries: 5,
    delay: 500
  },
  capabilities: {
    'browserName': 'chrome',
    'version': '',
    'platform': 'ANY',
    'javascriptEnabled': true
  }
};

function mergeDefaults(config, defaults) {
  config = _.defaults(config || {}, defaults);

  _.keys(defaults).forEach(function (v, k) {
    if (_.isArray(v) || _.isObject(v)) {
      config[k] = mergeDefaults(config[k], v);
    }
  });

  return config;
}

module.exports = function (config) {
  config = mergeDefaults(config, defaultConfig);

  return pingWebDriverServer(config.server).
    then(function (url) {
      var driver = new webdriver.Builder().
        usingServer(url).
        withCapabilities(config.capabilities).
        build();

      driver.webdriver = webdriver;

      return driver;
    });
};
