const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const fs = require('fs');

const rl = readline.createInterface({ input, output });

function log(filePath) {
    if(filePath) {
        fs.writeFileSync(filePath, "", "utf-8"); 
    }
    return function out(string) {
        if(filePath) {
            fs.appendFile(filePath, string, "utf-8", (err) => {
                if(err) {
                    console.log("Ошибка открытыия файла\n");
                } 
            })                    
        }
        console.log(string);
    }
}


async function getUserInput() {
    let promise = new Promise(function(resolve, reject) {
        rl.question(`введите число в интервале ${gameState.minValue}-${gameState.maxValue}, или q(для выхода): `, (input) => {
            rl.pause();
            resolve(input); 
        });  
    })
    return await promise;
}

let gameState = {
    tryingCounter: 0,
    userNumber: NaN,
    minValue: 0,
    maxValue: 100,
    randomNumber: Math.floor(Math.random() * 100),
}


async function request(logger) {
    while(true) {
        let userInput = await getUserInput();
        if(userInput.toLowerCase() === "q") {
            rl.close();
        }
        let number = parseInt(userInput);    
        if(isNaN(number) || (number < gameState.minValue || number > gameState.maxValue)) {
            logger(`Вы ввели не число в интервале ${gameState.minValue}-${gameState.maxValue}. Повторите попытку\n`);
        }
        logger(`Ваше число: ${number}\n`)
        gameState.tryingCounter++;
        gameState.userNumber = number;    
        if(number === gameState.randomNumber) {
            logger(`Вы угадали! за ${gameState.tryingCounter} попыток\n`);
            rl.close();
            return;
        } else if(number > gameState.randomNumber) {
            logger("Нужно число меньше\n");
        } else {
            logger("Нужно число больше\n");
        }    
    }
}


function main() {
    let logger = log("./protocol.txt");
    request(logger);
}

main();