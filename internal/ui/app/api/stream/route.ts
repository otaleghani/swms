export const dynamic = "force-dynamic";
import stringEmitter from "@/app/lib/emitters";
import { NextRequest, NextResponse } from 'next/server';

// You want to stream a notification to the client whenever
// - an item was updated
// - an item was deleted
// - an item was added
//
// Sometimes you'll have some changes that are a little "stranger"
// like the bulk add, where you maybe want to do a full page reload
// instead of a singular fetch.
export type StreamedChanges = {
  type: string;
  id: string;
};

// Define headers for SSE
const headers = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "Access-Control-Allow-Origin": "*",
};

export const GET = async (request: NextRequest) => {
  const encoder = new TextEncoder();
  let isClosed = true;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // Send an initial comment to establish the SSE stream
      controller.enqueue(encoder.encode(':ok\n\n'));

      // Function to send data
      const sendData = (data: StreamedChanges) => {
        const formattedData = `data: ${JSON.stringify(data)}\n\n`;
        if (controller.desiredSize !== null && 
            controller.desiredSize > 0){
        controller.enqueue(encoder.encode(formattedData));
        }
      };

      // Handle data fetched
      stringEmitter.on('message', (data: StreamedChanges) => {
        sendData(data);
      }); 

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        controller.close();
        console.log('SSE connection closed by client');
      });
    },
    cancel(reason) {
      isClosed = true;
    }
  });

  return new NextResponse(stream, { headers });
};
