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
