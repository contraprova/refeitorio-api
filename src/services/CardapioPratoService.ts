import {getCustomRepository, MoreThanOrEqual} from "typeorm";

import {CardapioPratoRepositories} from "../repositories/CardapioPratoRepositories";
import {CardapioRepositories} from "../repositories/CardapioRepositories";

import {HandleDbCardapios} from "../services/CardapioService";

const moment = require('moment-timezone');
const dataAtual = moment().tz('America/Sao_Paulo').format('YYYY/MM/DD ')+"00:00:00";

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

    async deletaPratoCardapio({pratos, cardapio_id}){
        if(!pratos && !cardapio_id){
            throw new Error("Informe o prato para exclusão no cardápio");
        }
        console.log(pratos+" "+cardapio_id);
        const cardapioPratoRepositorio = getCustomRepository(CardapioPratoRepositories);
        
        for(let i=0; i<pratos.length; i++){
            const deletaPratoCardapio = cardapioPratoRepositorio.delete({prato_id:pratos[i], cardapio_id:cardapio_id})
        }           
    } 

    async listaCardapioDia(){        
        const cardapioRepositorio = getCustomRepository(CardapioRepositories);        
        const cardapio = await cardapioRepositorio.findOne({ relations: ["pratos"],where:{data: MoreThanOrEqual(dataAtual)}});
        console.log(cardapio);
        return cardapio;        
    }
}

export {HandleDbCardapioPrato};
