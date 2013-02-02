/* vim: set et ts=2 sts=2 sw=2: */

var http = require('http');
var webdriver = require('./node/webdriver');
var _ = require('lodash');

function pingWebDriverServer(server, maxAttempts, callback) {
  var attempt = 0;
  var url = 'http://' + server.host + ':' + server.port;

  function ping() {
    attempt++;
    http.get(url + '/status', function (response) {
      callback();
    }).on('error', function (e) {
      if (attempt < maxAttempts) {
        setTimeout(ping, 500);
      } else {
        callback(e);
      }
    });
  }

  ping();
}

var defaultConfig = {
  server: {
    host: 'localhost',
    port: 4444
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

module.exports.webdriver = webdriver;
module.exports.build = function (config, callback) {
  if (!callback) {
    callback = config;
    config = {};
  }
  config = mergeDefaults(config, defaultConfig);

  pingWebDriverServer(config.server, 5, function () {
    callback(new webdriver.Builder().
      usingServer(
        'http://' + config.server.host + ':' + config.server.port + '/wd/hub').
      withCapabilities(config.capabilities).
      build());
  });
};
