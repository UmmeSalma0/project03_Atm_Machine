import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 20000; //dollar
let myPin = 1234;
console.log(chalk.blue("Welcome To -Atm Machine-"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: "Enter Your Pin First",
    }
]);
console.log(pinAnswer.pin);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("The entered pin is accurate!"));
    let transactionAnswer = await inquirer.prompt([
        {
            name: "transaction",
            type: "list",
            choices: ["Cash Withdrawl", "Fast Cash", "Check Balance", "Pin Change"],
            message: "Select your transaction",
        },
    ]);
    console.log(transactionAnswer);
    if (transactionAnswer.transaction === "Cash Withdrawl") {
        let withdrawlAnswer = await inquirer.prompt([
            {
                name: "withdrawl",
                type: "number",
                message: "Enter the amount to withdrawl",
            },
        ]);
        console.log(withdrawlAnswer);
        if (withdrawlAnswer.withdrawl <= myBalance) {
            myBalance = myBalance - withdrawlAnswer.withdrawl;
            console.log(chalk.yellow(`Withdrawl amount is ${withdrawlAnswer.withdrawl},your remaining balance is ${myBalance}`));
        }
        else {
            withdrawlAnswer.withdrawl > myBalance;
            console.log(chalk.red("insufficient balance"));
        }
    }
    else if (transactionAnswer.transaction === "Fast Cash") {
        let fastCashAnswer = await inquirer.prompt([
            {
                name: "fastCash",
                type: "list",
                message: "Select the amount to Fast Cash",
                choices: ["500", "1000", "5000", "10000", "20000"],
            },
        ]);
        console.log(fastCashAnswer.fastCash);
        if (fastCashAnswer.fastCash <= myBalance) {
            myBalance = myBalance - fastCashAnswer.fastCash;
            console.log(chalk.yellow(`FastCash amount is ${fastCashAnswer.fastCash},your remaining balance is ${myBalance}`));
        }
    }
    else if (transactionAnswer.transaction === "Check Balance") {
        console.log(chalk.yellow(`your current balance is ${myBalance}`));
    }
    else if (transactionAnswer.transaction === "Pin Change") {
        let changePinAnswer = await inquirer.prompt([
            {
                name: "changePin",
                type: "number",
                message: "Enter your current pin to change pin number",
            },
        ]);
        if (changePinAnswer.changePin === "myPin") {
            let newPinAnswer = await inquirer.prompt([
                {
                    name: "newPin",
                    type: "number",
                    message: "Enter your new pin number",
                }
            ]);
            console.log(newPinAnswer.newPin);
            myPin = newPinAnswer.newPin;
            console.log(chalk.green("pin changed successfully!"));
        }
        else {
            console.log(chalk.red("incorrect pin"));
        }
    }
}
else {
    console.log(chalk.red("invalid pin"));
}
