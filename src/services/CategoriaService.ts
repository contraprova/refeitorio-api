import { getCustomRepository, Like } from "typeorm";
import {CategoriaRepositories} from "../repositories/CategoriasRepositories";
import {PratoRepositories} from "../repositories/PratosRepositories";

interface TypesCategoria{
    nome:string;    
}

class HandleDbCategorias{
    async insereCategoria({nome}:TypesCategoria) {
        if(!nome){
            throw new Error("Informe a Categoria");
        }
        
        const categoriaRepositorio = getCustomRepository(CategoriaRepositories);
        const categoriaExistente = await categoriaRepositorio.findOne({nome});
        
        if(categoriaExistente){
            throw new Error("Categoria já cadastrada");
        }

        const categoria = categoriaRepositorio.create({
            nome})

        await categoriaRepositorio.save(categoria);
        return categoria; 
    }
    async listaCategoriaPratos({id}){        
        const pratoRepositorio = getCustomRepository(PratoRepositories);        
        if(!id){
            const categoria = await pratoRepositorio.find({relations:['categoria']}); 
            return categoria;
        }                
        const categoria = await pratoRepositorio.createQueryBuilder("pratos")
        .innerJoinAndSelect('pratos.categoria','categoria').where("categoria.id = :id",{id}).getMany();        
        return categoria;        
    }
    async listaCategoria({id}){
        const categoriaRepositorio = getCustomRepository(CategoriaRepositories);
        if(!id){
            const categoria = await categoriaRepositorio.find();
            return categoria;    
        }
        const categoria = await categoriaRepositorio.findOne({id});
        return categoria;
    }
    async atualizaCategoria({id, nome}){
        if(!id){
            throw new Error("Informe a Categoria");
        }

        const categoriaRepositorio = getCustomRepository(CategoriaRepositories);
        const categoria = await categoriaRepositorio.findOne({id:id});

        if(!categoria){
            throw new Error("Categoria Inexistente");
        }

        categoria.nome = nome;        
        categoriaRepositorio.save(categoria);
        return categoria;        

    }
    async deletaCategoria({id}){
        if(!id){
            throw new Error("Informe a Categoria para exclusão");
        
        }        
        const categoriaRepositorio = getCustomRepository(CategoriaRepositories);
        const pratoRepositorio = getCustomRepository(PratoRepositories);
        const categoria = await categoriaRepositorio.findOne({id:id});        
        
        if(categoria){            
            const categoriaPratoExistente = await pratoRepositorio.findOne({categoria_id:categoria.id});            
            if(categoriaPratoExistente){
                throw new Error("Categoria possui pratos atribuidos");
            }
            await categoriaRepositorio.remove(categoria);            
        }              
    }
}

export {HandleDbCategorias}