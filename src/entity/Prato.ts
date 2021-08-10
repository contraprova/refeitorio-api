import {Entity,PrimaryGeneratedColumn,PrimaryColumn, Column,ManyToMany,JoinTable, OneToMany, ManyToOne, JoinColumn, OneToOne} from "typeorm";
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

    @ManyToMany(() => Cardapio, cardapio => cardapio.pratos)
    cardapios: Cardapio[];

    @JoinColumn({name:'categoria_id'})
    @ManyToOne(()=>Categoria, categoria=>categoria.prato)
    categoria: Categoria;

    // @ManyToMany(()=>Categoria, categoria=>categoria.prato)
    // categoria: Categoria[];


}

export {Prato}