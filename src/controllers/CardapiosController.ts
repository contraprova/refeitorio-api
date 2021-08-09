import {Request, Response} from "express";
import { HandleDbCardapios } from '../services/CardapioService';
const cardapios = new HandleDbCardapios();

class HandleCardapios{
    async insereCardapio(request:Request, response:Response){
        const insereCardapio = await cardapios.insereCardapio();
        return response.json(insereCardapio);
    }

    async deletaCardapio(request:Request, response:Response){
        const id = request.params.id;
        const deletaCardapio = await cardapios.deletaCardapio(id);
        return response.json(deletaCardapio);
    }

    async atualizaCardapio(request:Request, response:Response){
        const {pratos} = request.body;
        console.log("Console Log no Controller: "+pratos);
        const {id} = request.params;
        const atualizaCardapio = await cardapios.atualizaCardapio({pratos, id});
    }
}

export{HandleCardapios};