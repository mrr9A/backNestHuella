import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BioSample } from "@digitalpersona/core";

@Entity('registros')
export class Registro {
    @PrimaryGeneratedColumn()
    id: Number

    @Column()
    nombre: string;

    @Column('simple-array') // Array de strings
    huella: string[];
}
