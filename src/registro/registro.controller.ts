import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';
import { UpdateRegistroDto } from './dto/update-registro.dto';
import * as sharp from 'sharp';
import * as faceapi from 'face-api.js'; // Asegúrate de instalar face-api.js
import { createCanvas, Image, Canvas, ImageData } from 'canvas';


@Controller('registro')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) { }




  @Post()
  async generateTemplate(@Body() createRegistroDto: CreateRegistroDto) {
    console.log('DTO recibido:', createRegistroDto.huella);

    try {

      // Configurar el entorno de face-api.js
      faceapi.env.monkeyPatch({
        Canvas: createCanvas as any, // Forzar el tipo
        Image: Image as any, // Forzar el tipo
        ImageData: ImageData as any, // Forzar el tipo
        createCanvasElement: () => createCanvas(1, 1) as any,
        createImageElement: () => new Image() as any,
      });

      const templates = [];

      for (const imageBase64 of createRegistroDto.huella) {
        console.log('Procesando imagen Base64');

        // Decodifica la imagen Base64 a un buffer
        const buffer = Buffer.from(imageBase64, 'base64');
        console.log('Buffer generado:', buffer);

        // Procesamiento con Sharp
        const processedBuffer = await sharp(buffer)
          .resize(300, 300) // Ajusta el tamaño según sea necesario
          .grayscale() // Convertir a escala de grises (opcional)
          .toBuffer();

        console.log('Imagen procesada con Sharp:', processedBuffer);

        // Convierte el buffer a un objeto Image para usar con face-api.js
        const img = new Image(); // Forzar el tipo
        img.src = `data:image/jpeg;base64,${processedBuffer.toString('base64')}`; // Forzar el tipo del buffer

        console.log('Imagen convertida a objeto Image:', img);

        // Carga los modelos de face-api.js
        await faceapi.nets.tinyFaceDetector.loadFromDisk('./src/models');
        await faceapi.nets.faceLandmark68Net.loadFromDisk('./src/models');

        // Detecta rostros y puntos clave
        const detection = await faceapi.detectAllFaces(img as unknown as faceapi.TNetInput, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        // Extrae las coordenadas de los puntos clave
        const keypoints = detection.map(det => det.landmarks.positions.flat());
        templates.push(keypoints);
      }

      return {
        message: 'Plantillas biométricas generadas correctamente',
        templates,
      };
    } catch (error) {
      console.error('Error procesando imagen:', error);
      throw new HttpException('Error processing image', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }







  /*     @Post()
      async create(@Body() createRegistroDto: CreateRegistroDto) {
        console.log('DTO recibido:', createRegistroDto);
        try {
          return await this.registroService.create(createRegistroDto);
        } catch (error) {
          console.error('Error en el controlador:', error);
          throw new HttpException(error.message, error.status || 500);
        }
      } */




  /*  @Post()
   async generateTemplate(@Body() createRegistroDto: CreateRegistroDto) {
     console.log('DTO recibido:', createRegistroDto.huella);
     try {
 
       const templates = [];
 
       for (const imageBase64 of createRegistroDto.huella) {
         console.log("Procesando imagen Base64");
         // Decodifica la imagen Base64 a un buffer de imagen
         const buffer = Buffer.from(imageBase64, 'base64');
         console.log("Buffer generado:", buffer);
 
         // Procesamiento con Sharp
         const imageBuffer = await sharp(buffer)
           .resize(300, 300) // Opcional, ajusta el tamaño
           .grayscale() // Convertir a escala de grises
           .toBuffer();
 
         console.log("Imagen procesada con Sharp:", imageBuffer);
 
         // Crear un Blob usando el buffer
         const imageBlob = new Blob([imageBuffer]);
         console.log("Blob creado:", imageBlob);
 
         // Cargar la imagen y utilizar face-api.js para detectar keypoints
         const img = await faceapi.bufferToImage(imageBlob);
         console.log("Imagen convertida a objeto:", img);
 
         await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
         const detection = await faceapi.detectAllFaces(img).withFaceLandmarks();
 
         // Extraer las coordenadas de los puntos clave
         const keypoints = detection.map(det => det.landmarks.positions.flat());
         templates.push(keypoints);
       }
 
       return {
         message: 'Plantillas biométricas generadas correctamente',
         templates
       };
 
     } catch (error) {
       console.error("Error procesando imagen:", error);
       throw new HttpException('Error processing image', HttpStatus.INTERNAL_SERVER_ERROR);
     }
   } */

  /*  @Post()
   async generateTemplate(@Body() createRegistroDto: CreateRegistroDto) {
     try {
       const templates = [];
 
       for (const imageBase64 of createRegistroDto.huella) {
         // Decodifica la imagen Base64 a un buffer de imagen
         const buffer = Buffer.from(imageBase64, 'base64');
         const uint8ClampedArray  = new Uint8ClampedArray(buffer);
 
         // Crear un Canvas y cargar la imagen desde Uint8Array
         const canvas = createCanvas(300, 300);
         const ctx = canvas.getContext('2d');
         const imgData  = new ImageData(uint8ClampedArray, 300, 300);
         ctx.putImageData(imgData , 0, 0);
 
         // Convertir el Canvas a una imagen y usarla en face-api.js
         const imgDataUrl = canvas.toDataURL();
         const imgBlob = await fetch(imgDataUrl).then(res => res.blob());
         const imgBuffer = await imgBlob.arrayBuffer();
         const imgArray = new Uint8Array(imgBuffer);
 
         const netInput: TNetInput = { data: imgArray };
 
         await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
         const detection = await faceapi.detectAllFaces(netInput).withFaceLandmarks();
 
         const keypoints = detection.map(det => det.landmarks.positions.flat());
         templates.push(keypoints);
       }
 
       return {
         message: 'Plantillas biométricas generadas correctamente',
         templates
       };
 
     } catch (error) {
       throw new HttpException('Error processing image', HttpStatus.INTERNAL_SERVER_ERROR);
     }} */

  /*   @Post()
    async create(@Body() createRegistroDto: CreateRegistroDto) {
      console.log('DTO recibido:', createRegistroDto);
      try {
        return await this.registroService.create(createRegistroDto);
      } catch (error) {
        console.error('Error en el controlador:', error);
        throw new HttpException(error.message, error.status || 500);
      }
    } */


  // Endpoint para verificar la huella
  /*     @Post('verificar-huella/:id')
      async verificarHuella(
        @Param('id') id: number,
        @Body('huella') huella: string,
      ): Promise<{ esValida: boolean }> {
        const esValida = await this.registroService.verificarHuella(id, huella);
        console.log('INFO',huella,id,esValida)
        return { esValida };
      } */

  @Get()
  async findAll() {
    try {
      return this.registroService.findAll();
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegistroDto: UpdateRegistroDto) {
    return this.registroService.update(+id, updateRegistroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registroService.remove(+id);
  }
}
