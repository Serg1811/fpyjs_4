function getPasswordChecker(password) {
    return function (passCheck){
        return password == passCheck
    }
} 

let input = getPasswordChecker('123');

console.log(input());
console.log(input(12));
console.log(input(123));