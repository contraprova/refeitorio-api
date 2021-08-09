import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CardapioPrato1627655588008 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"cardapioPrato",
                columns:[
                    {
                        name:'id',
                        type:'int',
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy:"increment"
                    }, 
                    {
                        name:'prato_id',
                        type:'int',
                        isNullable:false,                                                
                    },
                    {
                        name:'cardapio_id',
                        type: 'int',                                              
                        isNullable:false,                                                
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
