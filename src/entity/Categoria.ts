import {Entity,PrimaryGeneratedColumn,PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Prato } from "./Prato";

@Entity("categorias")
class Categoria {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    nome:string;

    @ManyToMany(()=> Prato, prato=>prato.categoria_id)
    @JoinTable({
        name:"pratos",
        joinColumn:{
            name:"categoria_id"
        }
    })
    pratos: Prato[];
}

export {Categoria}