var PropertyDescriptors = (function() {
    var PropertyDescriptors = function (name) {
        this.name = name;
        this.descriptors = [];
    };
    /**
     * Adds a descriptor for validation.
     * @param {String}   message   The error message if valitator evaluates to false.
     * @param {Function} validator A function that receives property value and model and returns true if is valid.
     */
    PropertyDescriptors.prototype.add = function (message, validator) {
        var descriptor = {
            message: message,
            validator: validator
        };
        
        this.descriptors.push(descriptor);
        
    };
    return PropertyDescriptors;
})();
module.exports = function (name) {
    return new PropertyDescriptors (name);
};