import { exec } from 'child_process';

// Define the path to your bash script
const scriptPath: string = './src/tests/scripts/setup.sh';

// Function to execute the bash script
const executeBashScript = async (path: string): Promise<void> => {
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
  await new Promise((resolve) => setTimeout(resolve, 5000));
};

// Execute the bash script
export default async function globalSetup(): Promise<void> {
  await executeBashScript(scriptPath);
}
