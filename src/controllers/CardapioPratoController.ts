import {Request, Response} from "express";
import { HandleDbCardapioPrato } from '../services/CardapioPratoService';
const cardapioPrato = new HandleDbCardapioPrato();

class HandleCardapioPrato{
    async insereCardapioPrato(request:Request, response:Response){
        const pratos = request.body;        
        const insereCardapioPrato = await cardapioPrato.insereCardapioPrato({pratos});
        return response.json(insereCardapioPrato);
    }
    
    // TROCAR O MÉTODO PARA ATUALIZA STATUS PRATO CARDAPIO
    async deletaPratoCardapio(request:Request, response:Response){
        const {pratos, cardapio_id} = request.body;        
        const deletaPratoCardapio = await cardapioPrato.deletaPratoCardapio({pratos,cardapio_id});
        return response.json("Prato Deletado");
    }

    async listaCardapioDia(request:Request, response:Response){
        const cardapioDia = await cardapioPrato.listaCardapioDia();
        return response.json(cardapioDia);
    }
}

export{HandleCardapioPrato};