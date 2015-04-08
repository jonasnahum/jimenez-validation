"use strict";

let factory = require("./descriptorsFactory");
let validator = new Validator();

exports.init = function (){

let ModelValidator = function (model) {

    this.model = model;
    this.descriptors = {};
    this.errors = {};
};


ModelValidator.prototype.isValid = function (){
    var isValid = true;
    for (var property in this.descriptors){
        for (var i = 0; i < this.descriptors[property].length; i++){
            var descriptor = this.descriptors[property][i];
            var fieldValid = descriptor.validator(this.model[descriptor.name], this.model);
            if (!fieldValid){
                isValid = false;
                this.addError(descriptor);
            }
        }
    }
    return true;
};

ModelValidator.prototype.addError = function(descriptor){
    if (!this.errors.hasOwnProperty(descriptor.name)) {
        this.errors[descriptor.name] = [];
    }
    this.errors[descriptor.name].push(descriptor.message);
};

ModelValidator.prototype.addDescriptor = function (field, message, validator) {
    if (!this.descriptors.hasOwnProperty(field)) {
        this.descriptors[field] = [];
    }
    var descriptor = factory(field);
    descriptor.add(message, validator);
    this.descriptors[field].push(descriptor);
};

return ModelValidator;
};
