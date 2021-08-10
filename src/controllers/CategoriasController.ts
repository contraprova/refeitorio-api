import {Request, Response} from "express";
import { HandleDbCategorias } from '../services/CategoriaService';
const categorias = new HandleDbCategorias();

class HandleCategorias{
    async insereCategoria(request:Request, response:Response){
        const {nome} = request.body;
                
        const insereCategoria = await categorias.insereCategoria({nome});

        return response.json(insereCategoria);
        
    }

    async listaCategoriaPratos(request:Request, response:Response){
        const {id} = request.params;
                
        const listaCategoria = await categorias.listaCategoriaPratos({id});

        return response.json(listaCategoria);
    }

    async listaCategoria(request:Request, response:Response){        
        const {id} = request.params;
                
        const listaCategoria = await categorias.listaCategoria({id});

        return response.json(listaCategoria);
    }

    async atualizaCategoria(request:Request, response:Response){
        const {id, nome} = request.body;
        const atualizaCategoria = await categorias.atualizaCategoria({id, nome})
        return response.json(atualizaCategoria);
    }

    async deletaCategoria(request:Request, response:Response){
        const {id} = request.params;
        const deletaCategoria = await categorias.deletaCategoria({id});
        return response.json({"return":"Categoria Excluída: "+id});
    }
}

export {HandleCategorias};