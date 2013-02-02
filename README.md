# selenium-node-webdriver

Drive PhantomJS 1.8+ from Node.js using Selenium's WebDriver

This repo is simply a pre-built Selenium WebDriver.

## Usage

```sh
npm install selenium-node-webdriver
phantomjs --webdriver=4444 &
node node_modules/selenium-node-webdriver/examples/hello.js
```

`examples/hello.js`
```javascript
var webdriver = require('selenium-node-webdriver');

var driver = new webdriver.Builder().
    usingServer('http://localhost:4444/wd/hub').
    withCapabilities({
      'browserName': 'phantomjs',
      'version': '',
      'platform': 'ANY',
      'javascriptEnabled': true
    }).
    build();

driver.get('http://www.google.com').
    then(function () {
        return driver.findElement(webdriver.By.name('q')).sendKeys('webdriver');
    }).
    then(function () {
        return driver.findElement(webdriver.By.name('btnG')).click();
    }).
    then(function () {
        return driver.getTitle();
    }).
    then(function (title) {
        console.log('Title:', title);
        driver.quit();
    });
```
