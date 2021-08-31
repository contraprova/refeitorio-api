import {Entity,PrimaryGeneratedColumn,PrimaryColumn, Column, ManyToMany, JoinTable,} from "typeorm";
import { Prato } from "./Prato";

@Entity("cardapio")
class Cardapio {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    data:Date;
    
    @Column()
    updated_at:Date;    

    @ManyToMany(() => Prato, prato => prato.cardapios)
    @JoinTable({
        name: "cardapioPrato",
        joinColumn: {
            name: "cardapio_id",
            referencedColumnName: "id"
            },
        inverseJoinColumn: {
            name: "prato_id",
            referencedColumnName: "id"
            }
        })
    pratos: Prato;
      
}

export {Cardapio}