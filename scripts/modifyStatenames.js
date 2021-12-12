const replaceUnderscores = (str) => {

    for(let i = 0; i < str.length; i++) {
        if(str[i] === '_'){
            str = str.replace(str[i], ' ');
        }
    }

    return str;
}

let str = "hello_world";

module.exports = replaceUnderscores;

