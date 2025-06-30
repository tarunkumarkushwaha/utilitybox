console.log("Background script loaded");

let alarmTimeout = null;
let shortTimer = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.type === "SET_SHORT_TIMER") {
    const { hours, minutes, seconds } = request.data;
    const duration = (hours * 3600 + minutes * 60 + seconds) * 1000;

    if (shortTimer) clearTimeout(shortTimer);

    shortTimer = setTimeout(() => {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "favicon-32x32.png",
        title: "Timer Complete!",
        message: `Your ${hours}h ${minutes}m ${seconds}s timer has ended.`,
        priority: 2
      });

      chrome.storage.local.set({ shortTimerDone: true });
    }, duration);

    sendResponse({ status: "Short timer set" });
    return true;
  }

  if (request.type === "CLEAR_SHORT_TIMER") {
    if (shortTimer) clearTimeout(shortTimer);
    sendResponse({ status: "Short timer cleared" });
    return true;
  }


  if (request.type === "SET_ALARM") {
    const { hr, min, sec, ampm } = request.data;
    const text = request.text;
    // console.log(text)

    const now = new Date();
    const alarmTime = new Date();

    let h = parseInt(hr);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;

    alarmTime.setHours(h, parseInt(min), parseInt(sec), 0);

    const delay = alarmTime.getTime() - now.getTime();

    if (delay > 0) {
      if (alarmTimeout) clearTimeout(alarmTimeout);

      alarmTimeout = setTimeout(() => {
        // console.log("⏰ Alarm triggered");
        // Store a flag in storage
        chrome.storage.local.set({ alarmRang: true });

        // Send a notification
        chrome.notifications.create({
          type: "basic",
          iconUrl: "favicon-32x32.png",
          title: `⏰ Reminder`,
          message: text,
          priority: 2
        });

      }, delay);

      sendResponse({ status: "Reminder set successfully" });
    } else {
      sendResponse({ status: "Reminder time is in the past" });
    }

    return true;
  }

  if (request.type === "CLEAR_ALARM") {
    if (alarmTimeout) clearTimeout(alarmTimeout);
    sendResponse({ status: "Reminder cleared" });
    return true;
  }

  if (request.type === "PING") {
    sendResponse("PONG from background");
    return true;
  }
});
