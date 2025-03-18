import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runCommand() {
  rl.question("$", (answer) => {
    console.log(`${answer}: command not found`);
    runCommand();
  });
}

runCommand();
