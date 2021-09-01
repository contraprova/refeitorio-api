import { response } from "express";
import {getCustomRepository, MoreThanOrEqual} from "typeorm";
import { Cardapio } from "../entity/Cardapio";
import { CardapioPrato } from "../entity/CardapioPrato";

import {CardapioPratoRepositories} from "../repositories/CardapioPratoRepositories";
import {CardapioRepositories} from "../repositories/CardapioRepositories";
import { CategoriaRepositories } from "../repositories/CategoriasRepositories";

import {HandleDbCardapios} from "../services/CardapioService";

const moment = require('moment-timezone');
const dataAtual = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD');

class HandleDbCardapioPrato{
    async insereCardapioPrato({pratos}){                
        const cardapioRepositorio = getCustomRepository(CardapioRepositories);
        const cardapioPratoRepositorio = getCustomRepository(CardapioPratoRepositories);
        
        const cardapioDia = await cardapioRepositorio.find(
            {where:
                {data: MoreThanOrEqual(dataAtual)
                }
            });

        if(cardapioDia.length > 0){             
            const loop = Promise.resolve(pratos.id.forEach(async (element)=>{                
                const cardapioPrato = await cardapioPratoRepositorio.create({prato_id:element, cardapio_id:cardapioDia[0].id})            
                await cardapioPratoRepositorio.save(cardapioPrato)                            
                
            }));            
            return {"Mensagem":"Cardapio Criado - Condicional 1 "+cardapioDia[0].id};
           
        }else{
            const handleDbCardapio = new HandleDbCardapios();
            const cardapioDia = await handleDbCardapio.insereCardapio();            
            const cardapioCriado = await cardapioRepositorio.find(
                {where:
                    {data: MoreThanOrEqual(dataAtual)
                    }
                });

            const loop = Promise.resolve(pratos.id.forEach(async (element)=>{                
                const cardapioPrato = await cardapioPratoRepositorio.create({prato_id:element, cardapio_id:cardapioCriado[0].id})            
                await cardapioPratoRepositorio.save(cardapioPrato)            
                return cardapioPrato;
            }))                            
            return {"Mensagem":"Cardapio Criado - Condicional 2 "+cardapioCriado[0].id};          
        }        
    }  

    async deletaPratoCardapio({cardapio_id}){
        if(!cardapio_id){
            throw new Error("Informe o cardápio");
        }        
        const cardapioPratoRepositorio = getCustomRepository(CardapioPratoRepositories);         
        const deletaPratoCardapio = await cardapioPratoRepositorio.createQueryBuilder("cardapioPrato").delete().from(CardapioPrato)
        .where("cardapio_id = :cardapio_id",{cardapio_id:cardapio_id}).execute();
    } 

    async listaCardapioDia(){        
        const categoriaRepositorio = getCustomRepository(CategoriaRepositories);                
        const cardapio = await categoriaRepositorio.createQueryBuilder('categoria')
        .innerJoinAndSelect('categoria.prato','prato')
        .innerJoinAndSelect('prato.cardapios','cardapio')                
        .where('cardapio.data >= :data', {data: dataAtual})          
        .orderBy('categoria.nome', 'ASC') 
        .getMany();               
        return cardapio;        
    }
}

export {HandleDbCardapioPrato};
