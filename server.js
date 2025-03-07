const express = require("express");
const app = express();
const path = require("path");

require("./logCron/cron.log");

app.get("/memory", (req, res) => {
  const filePath = path.join(__dirname, "logCron", "memory_log.txt");
  res.download(filePath, "memory_log.txt", err => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file.");
    }
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});

/*
Cron Expression Breakdown:
────────────────────────────
*    *    *    *    *    *
│    │    │    │    │    └─── Day of the week (0 - 7) (Sunday = 0 or 7)
│    │    │    │    └──────── Month (1 - 12)
│    │    │    └───────────── Day of the month (1 - 31)
│    │    └────────────────── Hour (0 - 23)
│    └─────────────────────── Minute (0 - 59)
└──────────────────────────── Second (0 - 59)
/ means each 
/1 = each one seconds 
1   = one second of min
range = 1-4 
{
    timezone: "Asia/Kolkata"
} 

for changing time zone
*/
