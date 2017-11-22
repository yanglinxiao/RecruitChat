const utility = require('utility');

function md5(content){
    const prefix = "dklash6!~#@#@……%~~YERR%$&*%^2";
    console.log(utility.md5(utility.md5(prefix + content)));
    return utility.md5(utility.md5(prefix + content));
}

module.exports = {md5}