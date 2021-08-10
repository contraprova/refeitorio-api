import {Entity,PrimaryGeneratedColumn,PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Prato } from "./Prato";

@Entity("categorias")
class Categoria {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    nome:string;

    @OneToMany(()=>Prato, prato=>prato.categoria)
    prato: Prato  
}

export {Categoria}