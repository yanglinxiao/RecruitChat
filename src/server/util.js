const utility = require('utility');

function md5(content){
    const prefix = "dklash6!~#@#@……%~~YERR%$&*%^2";
    return utility.md5(utility.md5(prefix + content));
}

module.exports = {md5}