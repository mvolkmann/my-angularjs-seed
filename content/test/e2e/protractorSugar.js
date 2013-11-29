'use strict';
/*global protractor: false */

module.exports = function (ptor) {
  var obj = {};

  obj.click = function (id) {
    this.getElementById(id).click();
  };

  obj.getElementById = function (id) {
    return ptor.findElement(protractor.By.id(id));
  };

  obj.getText = function (id) {
    return this.getElementById(id).getText();
  };
  
  obj.setInputValue = function (id, value) {
    var input = this.getElementById(id);
    input.clear();
    input.sendKeys(value);
  };
  
  return obj;
};
