//import { emitter } from "../emitters";
let sse = new EventSource("/api/stream")
sse.onmessage = (event: MessageEvent<any>) => {
  const eventData = JSON.parse(event.data);
  postMessage(eventData);
  //emitter.emit("workerMessage", eventData)
}
