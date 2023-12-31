import React, { Component, useState, useEffect, ChangeEvent, FormEvent, } from "react";
import Footer from "./Footer";
import HeaderProfissional from "./HeaderProfissional";
import axios from "axios";
import Swal from "sweetalert2";
import { ProfissionalCadastroInterface } from "../interfaces/ProfissionalCadastroInterface";
import { ServicoCadastroInterface } from "../interfaces/ServicoCadastroInterface";


const CadastroAgenda = () => {
    

    const [profissional_id, setProfissional_id] = useState<string>("");
    const [dataHora, setDataHora] = useState<string>("");
    const [tipo_pagamento,setPagamento]=useState<string>("");
    const [valor,setValor]=useState<number>();
    const [profissional, setProfissional] = useState<ProfissionalCadastroInterface[]>([]);
    const [servico, setServico] = useState<ServicoCadastroInterface[]>([]);
    const [servico_id, setServico_id] = useState<string>("");

    const cadastrarAgenda = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            profissional_id: profissional_id,
            data_hora: dataHora,


        }
        console.log(dados)
        axios.post('http://127.0.0.1:8000/api/agenda/store', dados,

            {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).then(function (response) {
                if (true === response.data.status) {
                    Swal.fire({
                        title: "Cadastrado com sucesso",
                        text: "redirecionando para Listagem...",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 3000
                    });

                    window.setTimeout(() => {
                        window.location.href = "/agendamento/profissional"
                    }, 3600);
                    console.log(response.data)
                }
                else {
                    Swal.fire({
                        title: "Erro",
                        text: "não foi agendado",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 3000
                    });

                }
            }).catch(function (error) {
                console.log(error)
            })
    }


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/profissional/retornarTodos  ');
                if (true == response.data.status) {
                    setProfissional(response.data.data)
                    console.log(profissional);
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Ocorreu um erro",
                    text: "XXXXXXXXXXXXXXXX ",
                    icon: "error"
                });
            }
        }

        fetchData();
    }, []);

    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/servico/all  ');
                if (true == response.data.status) {
                    setServico(response.data.data)
                    console.log(servico);
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Ocorreu um erro",
                    text: "XXXXXXXXXXXXXXXX ",
                    icon: "error"
                });
            }
        }

        fetchData();
    }, []);





    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

      
        if (e.target.name === "data_hora") {
            setDataHora(e.target.value);
        }
        if (e.target.name === "valor") {
            setValor(e.target.valueAsNumber);
        }
        
    }

    const handleProfissional = (e: ChangeEvent<HTMLSelectElement>) => {
       
            setProfissional_id(e.target.value);
       
    }
    const handleServico = (e:ChangeEvent<HTMLSelectElement>)=>{
        setServico_id(e.target.value)
    }

    return (
        <div>
            <HeaderProfissional />
            <main>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Clientes</h5>
                            <form onSubmit={cadastrarAgenda} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Profssional_Id</label>
                                    <select name='profissional_id' id='profissional_id ' className='form-control' required onChange={handleProfissional}  >
                                        <option value="0">Selecione um Profissional</option>
                                        {profissional.map(profissional => (
                                            <option key={profissional.id} value={profissional.id}>
                                                {profissional.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='col-6'>
                                    <label htmlFor="data_hora" className='form-label' >Data e hora</label>
                                    <input type="datetime-local" name='data_hora' className='form-control' required onChange={handleState} />
                                </div>                 
                                <div className='col-12'>
                                    <button type='submit' className='btn btn-success btn-sm'>Cadastrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}


export default CadastroAgenda;
