import {Entity,PrimaryGeneratedColumn,PrimaryColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import { Prato } from "./Prato";

@Entity("categorias")
class Categoria {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    nome:string;

    // Uma categoria tem vários pratos = OnetoMany
    @OneToMany(()=>Prato, prato=>prato.categoria)
    prato: Prato[]
    // @JoinColumn({name:'categoria_id', referencedColumnName:'id'})
    // prato: Prato[];

    // @ManyToMany(()=> Prato, prato=>prato.categoria)
    // prato: Prato[];

    // @ManyToMany(() => Prato, prato => prato.cardapios)
    // @JoinTable({
    //     name: "cardapio",
    //     joinColumn: {
    //         name: "id",
    //         referencedColumnName: "id"
    //         },
    //     inverseJoinColumn: {
    //         name: "prato_id",
    //         referencedColumnName: "id"
    //         }
    //     })
    // prato: Prato[];
}

export {Categoria}