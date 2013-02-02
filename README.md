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
var wd = require('selenium-node-webdriver');

wd.build(null, function (driver) {
    driver.get('http://www.google.com').
        then(function () {
            return driver.
                findElement(wd.webdriver.By.name('q')).sendKeys('webdriver');
        }).
        then(function () {
            return driver.findElement(wd.webdriver.By.name('btnG')).click();
        }).
        then(function () {
            return driver.getTitle();
        }).
        then(function (title) {
            console.log('Title:', title);
            driver.quit();
        });
});
```
