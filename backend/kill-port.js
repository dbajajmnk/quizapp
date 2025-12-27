const { exec } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const port = process.argv[2] || '5000';

console.log(`🔍 Checking for processes using port ${port}...\n`);

// Windows command to find process using port
exec(`netstat -ano | findstr :${port}`, (error, stdout, stderr) => {
  if (error || !stdout) {
    console.log(`✅ Port ${port} is not in use.`);
    rl.close();
    return;
  }

  const lines = stdout.trim().split('\n');
  const pids = new Set();
  
  lines.forEach(line => {
    const parts = line.trim().split(/\s+/);
    if (parts.length > 0) {
      const pid = parts[parts.length - 1];
      if (pid && !isNaN(pid)) {
        pids.add(pid);
      }
    }
  });

  if (pids.size === 0) {
    console.log(`✅ Port ${port} is not in use.`);
    rl.close();
    return;
  }

  console.log(`⚠️  Found ${pids.size} process(es) using port ${port}:`);
  pids.forEach(pid => console.log(`   PID: ${pid}`));
  
  rl.question(`\n❓ Kill these processes? (y/n): `, (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      pids.forEach(pid => {
        console.log(`🛑 Killing process ${pid}...`);
        exec(`taskkill /PID ${pid} /F`, (killError) => {
          if (killError) {
            console.error(`❌ Failed to kill process ${pid}: ${killError.message}`);
          } else {
            console.log(`✅ Process ${pid} killed successfully.`);
          }
        });
      });
      console.log(`\n✅ Done! You can now start the server.`);
    } else {
      console.log(`\nℹ️  Processes not killed. Change PORT in .env file to use a different port.`);
    }
    rl.close();
  });
});


