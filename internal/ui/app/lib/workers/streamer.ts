let sse = new EventSource("/api/stream")
sse.onmessage = (event: MessageEvent<any>) => {
  const eventData = JSON.parse(event.data);
  console.log("Recieved changes from /api/streamer");
  postMessage(eventData);
}
