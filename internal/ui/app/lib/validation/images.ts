"use server";

import sharp from "sharp";

export default async function validateImages(images: File[]) {
  const result = {
    errors: [] as string[],
    images: [] as File[],
  }

  for (let i = 0; i < images.length; i++) {
    try {
      const buffer = Buffer.from(await images[i].arrayBuffer());
      const optBuffer = await sharp(buffer)
      .resize(1500, 1500, {
        fit: 'contain',
      })
      .jpeg({ 
        mozjpeg: true,
        quality: 50,
      })
      .toBuffer();

      result.images.push(optBuffer.toString("base64"));
    } catch(err) {
      result.errors.push("Error: Failed to execute sharp.");
    }
  }

  return result;
}
