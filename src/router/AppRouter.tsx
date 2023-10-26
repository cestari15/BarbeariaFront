import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroClientes from "../components/CadasatroCliente";
import ListagemClientes from "../components/ListagemCliente";
import CadastroServico from "../components/CadastroServico";
import ListagemServico from "../components/ListagemServico";
import ListagemProfissional from "../components/ListagemProfissional";
import CadastroProfissional from "../components/CadastroProfissional";


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="cliente/cadastro" element={<CadastroClientes/>}/>
                <Route path="cliente/listagem" element={<ListagemClientes/>}/>

                <Route path="servicos/cadastro" element={<CadastroServico/>}/>
                <Route path="servicos/listagem" element={<ListagemServico/>}/>

                <Route path="profissional/cadastro" element={<CadastroProfissional/>}/>
                <Route path="profissional/listagem" element={<ListagemProfissional/>}/>


                
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;