"use server";

import { cookies } from "next/headers";
//const sharp = require('sharp');
import sharp from "sharp";

export type FormFileUploadTestingState = {
  status: string;
}

export async function TestFileUploadAction(
  currentState: FormFileUploadTestingState,
  formData: FormData,
) {
  const state: FormFileUploadTestingState = {
    status: "got nothing",
  }
  const data = {
    file: formData.getAll("images") as File[],
  }
  console.log(data)

  const buffer = Buffer.from(await data.file[0].arrayBuffer());
  const newBuf = await sharp(buffer)
    .resize(1000, 1000, {
      fit: 'contain',
    })
    .jpeg({ 
      mozjpeg: true,
      quality: 50,
    })
    .toBuffer();

  //const req_body = JSON.stringify({
  //  item_id: "nil",
  //  variant_id: "nil",
  //  //blob: buffer.toString("base64"),
  //  blob: newBuf.toString("base64")
  //})
  //const jwt = cookies().get("access")?.value
  //const res = await fetch("http://localhost:8080/media/", {
  //  method: "POST",
  //  headers: {
  //    "Content-Type": "application/json",
  //    "Authorization": `Bearer ${jwt}`
  //  },
  //  body: req_body,
  //})
  //const res_body = await res.json();
  //console.log(res_body);


  state.status = "got this"
  return state
}
