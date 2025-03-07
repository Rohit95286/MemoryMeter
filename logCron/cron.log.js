const nodeCron = require("node-cron");
const os = require("os");
const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "memory_log.txt");

const job = nodeCron.schedule("0.5 * * * *", function logFreeMemory() {
  const freeMemory = os.freemem();
  const totalMemory = os.totalmem();
  const freeMemoryPercentage = ((freeMemory / totalMemory) * 100).toFixed(2);
  const logEntry = JSON.stringify(
    {
      date: new Date(),
      freeMemoryPercentage,
    },
    null,
    2
  );

  fs.appendFile(logFile, logEntry, err => {
    if (err) console.error("Error writing to log file:", err);
  });
});
