# selenium-node-webdriver

Drive PhantomJS 1.8+ from Node.js using Selenium's WebDriver

This module provides a simple wrapper around the Node.js WebDriver
implementation that ships with [Selenium](http://code.google.com/p/selenium/).

## Prerequisites

- [Node.js](http://nodejs.org/)
- [PhantomJS 1.8+](http://phantomjs.org/)

## Installation

```sh
npm install selenium-node-webdriver
```

## Usage

```sh
phantomjs --webdriver=4444 &
node node_modules/selenium-node-webdriver/examples/hello.js
```

This example (`examples/hello.js`) queries Google for 'webdriver' and returns
the titles of the results.

```javascript
var WebDriver = require('selenium-node-webdriver');

WebDriver().
    then(function (driver) {
        driver.get('http://www.google.com').
            then(function () {
                return driver.
                    findElement(driver.webdriver.By.name('q')).
                    sendKeys('webdriver');
            }).
            then(function () {
                return driver.
                    findElement(driver.webdriver.By.name('btnG')).click();
            }).
            then(function () {
                return driver.executeScript(function () {
                    return Array.prototype.slice.
                        call(document.querySelectorAll('h3.r')).
                        map(function (result) {
                            return result.textContent;
                        });
                });
            }).
            then(function (results) {
                results.forEach(function (result) {
                    console.log(result);
                });
                driver.quit();
            });
    });
```

## API

### `require('selenium-node-webdriver')(config <object>)` -> `Promise`

The module exports a factory function which accepts a config object and returns
a promise. The config object has two properties, both of which are optional:

`server`: describes the WebDriver server to connect to; it has the following
properties:
- `host`: the server's hostname (localhost)
- `port`: the port to connect to (4444)
- `retries`: the number of times to try to connect to the server (5)
- `delay`: the delay in ms between connection attempts (500)

`capabilities`: describes the
  [capabilities](http://code.google.com/p/selenium/wiki/JsonWireProtocol#Capabilities_JSON_Object)
  of the WebDriver client you are creating. It has the following properties by
  default:
- `browserName`: `'chrome'`
- `version`: `''`
- `platform`: `'ANY'`
- `javascriptEnabled`: `true`

The returned promise is resolved with a RemoteWebDriver instance if the
connection succeeds or rejected with the error from the final retry if
connection fails.

## Useful documentation

### Selenium
[WebDriverJS](http://code.google.com/p/selenium/wiki/WebDriverJs): an
introduction to using JavaScript as a WebDriver client

### The WebDriver Protocol
- [The WebDriver Wire
Protocol](http://code.google.com/p/selenium/wiki/JsonWireProtocol)
- [W3C WebDriver Working Draft](http://www.w3.org/TR/webdriver/)

## License

[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
