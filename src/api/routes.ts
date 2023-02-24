import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { HandlePratos } from "../controllers/PratosController";
import { HandleCategorias } from "../controllers/CategoriasController";
import { HandleCardapios } from "../controllers/CardapiosController";
import { HandleCardapioPrato } from "../controllers/CardapioPratoController";

const router = Router();

// const createUserController = new CreateUserController();
const HandlePratosController = new HandlePratos();
const HandleCategoriesController = new HandleCategorias();
const HandleCardapiosController = new HandleCardapios();
const HandleCardapioPratoController = new HandleCardapioPrato();


// router.post("/users", createUserController.handle)
router.get("/", (req,res)=>{res.json({mensagem:"Rota Base"})})
router.post("/prato", HandlePratosController.inserePrato)
router.get("/listaprato/:nome?", HandlePratosController.listaPrato)
router.get("/listatodosospratos/:categoria_id?", HandlePratosController.listaTodosOsPratos)
router.put("/atualizaprato", HandlePratosController.atualizaPrato)
router.delete("/deletaprato/:id?", HandlePratosController.deletaPrato)

router.post("/categoria", HandleCategoriesController.insereCategoria);
router.get("/categoria/:id?", HandleCategoriesController.listaCategoria);
router.get("/categoriapratos/:id?", HandleCategoriesController.listaCategoriaPratos);
router.put("/categoria", HandleCategoriesController.atualizaCategoria);
router.delete("/deletacategoria/:id", HandleCategoriesController.deletaCategoria)

router.post("/cardapios", HandleCardapiosController.insereCardapio);
router.post("/cardapioprato", HandleCardapioPratoController.insereCardapioPrato);
router.get("/cardapiodia", HandleCardapioPratoController.listaCardapioDia);
router.delete("/deletacardapio/:id", HandleCardapiosController.deletaCardapio);
router.delete("/deletapratocardapio/:cardapio_id", HandleCardapioPratoController.deletaPratoCardapio);
router.put("/atualizacardapio/:id", HandleCardapiosController.atualizaCardapio);


export {router};