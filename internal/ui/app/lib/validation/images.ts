"use server";

import sharp from "sharp";

export default async function validateImages(images: File[]) {
  const result = {
    errors: [] as string[],
    images: [] as string[],
  }

  for (let i = 0; i < images.length; i++) {
    // This one is important because sometimes the FileList
    // contains some tainted data like this one:
    // File {
    //   size: 0,
    //   type: 'application/octet-stream',
    //   name: 'undefined',
    //   lastModified: 1732715102848
    // }
    if (images[i].size !== 0 || images[i].type.includes("images")) {
      try {
        const buffer = Buffer.from(await images[i].arrayBuffer());
        const optBuffer = await sharp(buffer)
        .resize(1500, 1500, {
          fit: "inside",
          background: {r:255, b:255, g:255},
        })
        .jpeg({ 
          mozjpeg: false,
          quality: 50,
        })
        .toBuffer();

        result.images.push(optBuffer.toString("base64"));
      } catch(err) {
        result.errors.push("Error: Failed to execute sharp.");
      }
    }
  }

  return result;
}
