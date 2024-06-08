#! /usr/bin/env node
import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
const response = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "please enter the amount of seconds.",
    validate: (input) => {
        if (isNaN(input)) {
            return "please enter a number.";
        }
        else if (input > 60) {
            return "you can not enter more than 60 seconds";
        }
        else {
            return true;
        }
    }
});
let input = response.userInput;
function startTime(val) {
    const initTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(initTime);
    setInterval((() => {
        const currentTime = new Date();
        const timDiff = differenceInSeconds(intervalTime, currentTime);
        if (timDiff <= 0) {
            console.log("Timer has expired");
            process.exit();
        }
        const mins = Math.floor(timDiff % (3600 * 24) / 3600);
        const sec = Math.floor(timDiff % 60);
        console.log(`${mins.toString().padStart(2, "0")} :${sec.toString().padStart(2, "0")}`);
    }), 1000);
}
startTime(input);
