import { IsArray, IsNotEmpty, IsString } from 'class-validator';
//import { BioSample } from '@digitalpersona/core';
export class CreateRegistroDto {
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @IsArray()
    huella: string[]; // Arreglo de strings
}