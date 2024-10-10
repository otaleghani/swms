"use strict";
let sse = new EventSource("/api/stream");
sse.onmessage = (event) => {
    const eventData = JSON.parse(event.data);
    console.log("Recieved changes from /api/streamer");
    postMessage(eventData);
};
