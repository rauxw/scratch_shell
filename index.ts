import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const buildins = ["echo", "exit", "type"];

function runCommand() {
  rl.question("$", (answer) => {
    const args = answer.split(" ");
    if (args[0] === "exit" && args[1] === "0") {
      process.exit(0);
    } else if (args[0] === "echo") {
      console.log(args.slice(1).join(" "));
    } else if (args[0] === "type") {
      if (buildins.includes(args[1])) {
        console.log(`${args[1]} is a shell buildin`);
      } else {
        console.log(`${args[1]}: not found`);
      }
    } else {
      console.log(`${answer}: command not found`);
    }
    runCommand();
  });
}

runCommand();
