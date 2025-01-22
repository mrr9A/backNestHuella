import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

async function compareFingerprints(image1Base64: string, image2Base64: string): Promise<boolean> {
  const base64ToBuffer = (base64: string) =>
    Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');

  const image1Buffer = base64ToBuffer(image1Base64);
  const image2Buffer = base64ToBuffer(image2Base64);

  const [image1, image2] = await Promise.all([
    sharp(image1Buffer).resize(256, 256).raw().toBuffer(),
    sharp(image2Buffer).resize(256, 256).raw().toBuffer(),
  ]);

  if (image1.length !== image2.length) {
    throw new Error('Las imágenes no tienen el mismo tamaño después del procesamiento.');
  }

  // Comparar pixel a pixel
  let diffCount = 0;
  for (let i = 0; i < image1.length; i++) {
    if (image1[i] !== image2[i]) {
      diffCount++;
    }
  }

  // Calcular la diferencia en porcentaje
  const diffPercentage = diffCount / image1.length;
  const threshold = 0.2; // 20% de diferencia máxima permitida

  return diffPercentage <= threshold;
}

@Injectable()
export class FingerprintService {

/*   compareFingerprints(image1Base64: string, image2Base64: string): boolean {
    const image1 = base64ToMat(image1Base64);
    const image2 = base64ToMat(image2Base64);

    if (!image1 || !image2) {
      throw new Error('Error al procesar las imágenes.');
    }

    const threshold = 0.8; 
    const similarity = image1.compareHist(image2, cv.HISTCMP_CORREL); 
   
    return similarity >= threshold;
  } */

/*   private base64ToMat(base64String: string): cv.Mat {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    return cv.imdecode(buffer);
  } */
}
