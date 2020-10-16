module.exports.getNum = function (message) {
    let num = message.replace(/\D/g,'');
    return num
};
