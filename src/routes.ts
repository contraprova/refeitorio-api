import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { HandlePratos } from "./controllers/PratosController";
import { HandleCategorias } from "./controllers/CategoriasController";
import { HandleCardapios } from "./controllers/CardapiosController";
import { HandleCardapioPrato } from "./controllers/CardapioPratoController";

const router = Router();

// const createUserController = new CreateUserController();
const HandlePratosController = new HandlePratos();
const HandleCategoriasController = new HandleCategorias();
const HandleCardapiosController = new HandleCardapios();
const HandleCardapioPratoController = new HandleCardapioPrato();


// router.post("/users", createUserController.handle)
router.post("/prato", HandlePratosController.inserePrato)
router.get("/listaprato/:nome?", HandlePratosController.listaPrato)
router.get("/listatodosospratos/:categoria_id?", HandlePratosController.listaTodosOsPratos)
router.put("/atualizaprato", HandlePratosController.atualizaPrato)
router.delete("/deletaprato/:nome?", HandlePratosController.deletaPrato)

router.post("/categoria", HandleCategoriasController.insereCategoria);
router.get("/categoria/:nome?", HandleCategoriasController.listaCategoria);
router.put("/categoria", HandleCategoriasController.atualizaCategoria);
router.delete("/deletacategoria/:id", HandleCategoriasController.deletaCategoria)

router.post("/cardapios", HandleCardapiosController.insereCardapio);
router.post("/cardapioprato", HandleCardapioPratoController.insereCardapioPrato);
router.get("/cardapiodia", HandleCardapioPratoController.listaCardapioDia);
router.delete("/deletacardapio/:id", HandleCardapiosController.deletaCardapio);
router.put("/atualizacardapio/:id", HandleCardapiosController.atualizaCardapio);


export {router};