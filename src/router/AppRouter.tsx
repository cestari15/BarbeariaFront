import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import CadastroClientes from "../components/CadasatroCliente";
import ListagemClientes from "../components/ListagemCliente";
import CadastroServico from "../components/CadastroServico";
import ListagemServico from "../components/ListagemServico";
import ListagemProfissional from "../components/ListagemProfissional";
import CadastroProfissional from "../components/CadastroProfissional";
import EditarCliente from "../components/AtualizarCliente";
import EditarProfissional from "../components/AtualizarProfissional";
import EditarServico from "../components/AtualizarServico";
import Agenda from "../components/Agendamento";
import EditarAgenda from "../components/AgendaUpdate";
import CadastroAgenda from "../components/AgendaCadastro";


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

                <Route path="/editarCliente/:id" element={<EditarCliente/>}/>

                <Route path="/editarProfissional/:id" element={<EditarProfissional/>}/>

                <Route path="/editarServico/:id" element={<EditarServico/>}/>


                <Route path="/agendamento/profissional" element={<Agenda/>}/>

                <Route path="/editar/agenda/profissional/:id" element={<EditarAgenda/>}/>

                <Route path="agenda/cadastro" element={<CadastroAgenda/>}/>
                
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;