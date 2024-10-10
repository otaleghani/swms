"use client" 

import { useEffect, useState } from "react";

interface SSEData {
  message: string;
}

export default function Componente() {
  const [latestMessage, setLatestMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const obtainAPIResponse = async (apiRoute: string) => {
    // Initiate the first call to connect to SSE API
    const apiResponse = await fetch(apiRoute, {
      method: "GET",
      headers: {
        "Content-Type": "text/event-stream",
      },
    });
    console.log(apiResponse)
 
    if (!apiResponse.body) return;
 
    // To decode incoming data as a string
    const reader = apiResponse.body
      .pipeThrough(new TextDecoderStream())
      .getReader();
 
    let incomingMessage = "";
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
      setMessages((messages) => [
        ...messages,
        latestMessage
      ]);
      setLatestMessage("");
      break;
      }
      if (value) {
        // Do something
        incomingMessage += value;
        setLatestMessage(incomingMessage);
      }
    }
  }
  useEffect(() => {
    obtainAPIResponse("/api/stream")
  }, [])
  return (
    <>
    {latestMessage}
    helo
    </>
  )
}
 
