import {Entity,PrimaryGeneratedColumn,PrimaryColumn, Column,ManyToMany,JoinTable, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { Cardapio } from "./Cardapio";
import { Categoria } from "./Categoria";

@Entity("pratos")
class Prato {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    nome:string;

    @Column()
    categoria_id:number;

    @Column()
    status:boolean;

    @ManyToMany(() => Cardapio, cardapio => cardapio.id)
    cardapios: Cardapio[];

    @ManyToMany(()=>Categoria, categoria=>categoria.id)
    categoria: Categoria[];


}

export {Prato}