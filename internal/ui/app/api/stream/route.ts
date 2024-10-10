export const dynamic = "force-dynamic";
import stringEmitter from "@/app/lib/emitter";


export async function POST(request: Request) {
  const encoder = new TextEncoder()
  // Create a streaming response

  const customReadable = new ReadableStream({
    start(controller) {
        let message;
        stringEmitter.on('message', (msg: string) => {
          console.log(`Received message: ${msg}`);
          message = msg;
        }); 
        controller.enqueue(encoder.encode(`data: ${message}\n\n`))
    },
  });
  
  // Return the stream response and keep the connection alive
  return new Response(customReadable, {
    // Set the headers for Server-Sent Events (SSE)
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  })
}

// app/api/sse/route.ts

import { NextRequest, NextResponse } from 'next/server';

type SSEData = {
  message: string;
};

// Define headers for SSE
const headers = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
  // Optional: Uncomment the following line if you need to allow CORS
  // 'Access-Control-Allow-Origin': '*',
};

export const GET = async (request: NextRequest) => {
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      // Send an initial comment to establish the SSE stream
      controller.enqueue(encoder.encode(':ok\n\n'));

      // Function to send data
      const sendData = (data: SSEData) => {
        const formattedData = `data: ${JSON.stringify(data)}\n\n`;
        controller.enqueue(encoder.encode(formattedData));
      };

      // Send a ping every 10 seconds
      // const intervalId = setInterval(() => {
      //   sendData({ message: 'Ping from server' });
      // }, 5000);
      stringEmitter.on('message', (msg: string) => {
        console.log(`Received message: ${msg}`);
        sendData({ message: msg });
      }); 

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        //clearInterval(intervalId);
        controller.close();
        console.log('SSE connection closed by client');
      });
    },
  });

  return new NextResponse(stream, { headers });
};
