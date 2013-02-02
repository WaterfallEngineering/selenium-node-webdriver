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
