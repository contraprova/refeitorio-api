import { getCustomRepository, Like } from "typeorm";
import { CardapioPratoRepositories } from "../repositories/CardapioPratoRepositories";
import {CardapioRepositories} from "../repositories/CardapioRepositories";
import {HandleDbCardapioPrato} from "../services/CardapioPratoService";

const moment = require('moment-timezone');

class HandleDbCardapios{
    async insereCardapio(){
        const cardapioRepositorio = getCustomRepository(CardapioRepositories);        
        const cardapioDia = await cardapioRepositorio.find();
        
        if(!cardapioDia){
            throw new Error("A data de hoje já possui um cardapio cadastrado");
        }
        const dataAtual = moment().tz('America/Sao_Paulo').format('YYYY/MM/DD H:mm:ss');
        const cardapio = await cardapioRepositorio.create({data:dataAtual});
        await cardapioRepositorio.save(cardapio);
        return cardapio;
    }
    async deletaCardapio(id){      
        console.log("Dentro do Cardapio Service: "+id);  
        const cardapioPratoRepositorio = getCustomRepository(CardapioPratoRepositories);        
        const cardapio = await cardapioPratoRepositorio.find({cardapio_id:id});
        
        if(cardapio.length <=0){
            throw new Error("O cardápio selecionado não existe");
        }else{
            const deletaCardapio = await cardapioPratoRepositorio.delete({cardapio_id:id})
            return "Cardapio Deletado";            
        }        
    }
    async atualizaCardapio({pratos, id}){
        const cardapioPrato = new HandleDbCardapioPrato();
        const cardapioPratoRepositorio = getCustomRepository(CardapioPratoRepositories);        
        const deletaCardapio = await cardapioPratoRepositorio.delete({cardapio_id:id})        
        console.log("ID Dentro do AtualizaCardapio: "+id);
        const atualizaCardapio = await cardapioPrato.insereCardapioPrato({pratos});
        console.log("Pratos Dentro do AtualizaCardapio: "+pratos);
        // return atualizaCardapio;        
    }    
}

export {HandleDbCardapios};