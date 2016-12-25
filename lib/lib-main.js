//いろんな箇所で使うLib

module.exports.generateQuestions = function(
    name,
    type,
    message,
    validateMessage
) {

    return {

        'name': name,
        'type': type,
        'message': message,
        validate: function(value) {
            if (value.length) {
                return true;
            } else {
                return validateMessage;
            }
        }
    };


}
