import { createConnection } from "typeorm";

createConnection();

if(!createConnection()){
    console.log("Conexao com problemas.");
}

