import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function runCommand() {
  rl.question("$", (answer) => {
    const answerCommand = answer.trim();
    if (answerCommand.startsWith("echo ")) {
      console.log(answerCommand.slice(5));
    } else if (answerCommand === "exit 0") {
      process.exit(0);
    } else {
      console.log(`${answer}: command not found`);
    }
    runCommand();
  });
}

runCommand();
