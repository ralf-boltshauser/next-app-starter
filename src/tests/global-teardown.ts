import { exec } from 'child_process';

// Define the path to your bash script
const scriptPath: string = './src/tests/scripts/teardown.sh';

// Function to execute the bash script
const executeBashScript = (path: string): void => {
  exec(`bash ${path}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    // Log the script's standard output
    console.log(`stdout: ${stdout}`);

    // Log any standard error output
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
  });
};

// Execute the bash script
export default function globalTeardown(): void {
  executeBashScript(scriptPath);
}
