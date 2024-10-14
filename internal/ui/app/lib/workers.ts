// Create and export the different web worker used in the application
let streamer: Worker | null = null;
if (typeof window !== 'undefined') {
  streamer = new Worker("/workers/streamer.js");
}
export default streamer;
