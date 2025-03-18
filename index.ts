import { createInterface } from "readline";
import { existsSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const builtins = ["echo", "exit", "type"]; // ✅ Built-in commands

function findExecutable(command: string): string | null {
  const pathDirs = process.env.PATH?.split(":") || [];
  for (const dir of pathDirs) {
    const fullPath = join(dir, command);
    if (existsSync(fullPath)) {
      return fullPath;
    }
  }
  return null;
}

function runCommand() {
  rl.question("$ ", (input) => {
    const args = input.split(" ");
    const cmd = args[0];

    if (cmd === "exit" && args[1] === "0") {
      process.exit(0);
    } else if (cmd === "echo") {
      console.log(args.slice(1).join(" "));
    } else if (cmd === "type") {
      if (!args[1]) {
        console.log("Usage: type <command>");
      } else if (builtins.includes(args[1])) {
        console.log(`${args[1]} is a shell builtin`);
      } else {
        const executablePath = findExecutable(args[1]);
        if (executablePath) {
          console.log(`${args[1]} is ${executablePath}`);
        } else {
          console.log(`${args[1]}: not found`);
        }
      }
    } else {
      // Try to execute the command
      const executablePath = findExecutable(cmd);
      if (executablePath) {
        const child = spawn(executablePath, args.slice(1), {
          stdio: "inherit",
        });

        child.on("error", () => console.log(`${cmd}: command not found`));
      } else {
        console.log(`${cmd}: command not found`);
      }
    }

    runCommand(); // Loop back for next input
  });
}

runCommand();
