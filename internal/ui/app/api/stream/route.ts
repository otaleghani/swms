export const dynamic = "force-dynamic";

import stringEmitter from "@/app/lib/emitters";
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from "next/headers";

/** 
* @param type     - type of the edited object 
* @param id       - id of the object 
* @param action   - action performed 
* @param before   - old content, used for updates
* @param after    - new content
**/
export type ServerSentEventData = {
  type: string;
  id: string;
  action: "create" | "createInBulk" | "remove" | "replace" | "update";
  before: any;
  after: any;
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
      const jwt = cookies().get("access")?.value;

      // On first connection it reads the access key and sends it
      // to the client so that it can fetch stuff directly.
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({jwt: jwt})}\n\n`
        )
      );

      // Function to send data
      const sendData = (data: ServerSentEventData) => {
        const formattedData = `data: ${JSON.stringify(data)}\n\n`;
        if (controller.desiredSize !== null && 
            controller.desiredSize > 0){
        controller.enqueue(encoder.encode(formattedData));
        }
      };

      // Get's the data from the emitters and sends it over all the 
      // connected clients.
      stringEmitter.on('message', (data: ServerSentEventData) => {
        sendData(data);
      }); 

      // Handle client disconnect
      request.signal.addEventListener('abort', () => {
        controller.close();
        //console.log('SSE connection closed by client');
      });
    },

    cancel(reason) {
      isClosed = true;
    }
  });

  return new NextResponse(stream, { headers });
};
