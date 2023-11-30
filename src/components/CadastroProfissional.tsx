import React, { Component, useState, useEffect, ChangeEvent, FormEvent, } from "react";
import Footer from "./Footer";
import HeaderProfissional from "./HeaderProfissional";
import axios from "axios";
import Swal from "sweetalert2";

const CadastroProfissional = () => {
    const [nome, setNome] = useState<string>("");
    const [celular, setCelular] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [dataNascimento, setdataNascimento] = useState<string>();
    const [cidade, setCidade] = useState<string>("");
    const [pais, setPais] = useState<string>("");
    const [rua, setRua] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [complemento, setComplemento] = useState<string>("");
    const [salario, setSalario] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [celularErro, setCelularErro] = useState<string>("");
    const [nomeErro, setNomeErro] = useState<string>("");
    const [dataNascimentoErro, setDataNascimentoErro] = useState<string>("");
    const [cidadeErro, setCidadeErro] = useState<string>("");
    const [paisErro, setPaisErro] = useState<string>("");
    const [ruaErro, setRuaErro] = useState<string>("");
    const [numeroErro, setNumeroErro] = useState<string>("");
    const [bairroErro, setBairroErro] = useState<string>("");
    const [cepErro, setCepErro] = useState<string>("");
    const [estadoErro, setEstadoErro] = useState<string>("");
    const [complementoErro, setComplementoErro] = useState<string>("");
    const [emailErro, setEmailErro] = useState<string>("");
    const [cpfErro, setCpfErro] = useState<string>("");
    const [salarioErro, setSalarioErro] = useState<string>("");
    const [passwordErro, setPasswordErro] = useState<string>("");


    const cadastrarProfissional = (e: FormEvent) => {
        e.preventDefault();

        const dados = {
            nome: nome,
            celular: celular,
            email: email,
            cpf: cpf,
            dataNascimento: dataNascimento,
            cidade: cidade,
            pais: pais,
            rua: rua,
            numero: numero,
            bairro: bairro,
            cep: cep,
            estado: estado,
            complemento: complemento,
            salario: salario,
            password: password

        }
        console.log(dados)
        axios.post('http://127.0.0.1:8000/api/profissional/store', dados,

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
                        window.location.href = "/profissional/listagem"
                    }, 3600);
                    console.log(response.data)
                }
                else {
                    if('nome' in response.data.error){
                        setNomeErro(response.data.error.nome[0]);
                    }
                    if('email' in response.data.error){
                        setEmailErro(response.data.error.email[0]);
                    }
                    if('cpf' in response.data.error){
                        setCpfErro(response.data.error.cpf[0]);
                    }
                    if('password' in response.data.error){
                        setPasswordErro(response.data.error.password[0]);
                    }
                    if('celular' in response.data.error){
                        setCelularErro(response.data.error.celular[0]);
                    }
                    if('DataNascimento' in response.data.error){
                        setDataNascimentoErro(response.data.error.datanascimento[0]);
                    }
                    if('cidade' in response.data.error){
                        setCidadeErro(response.data.error.cidade[0]);
                    }
                    if('pais' in response.data.error){
                        setPaisErro(response.data.error.pais[0]);
                    }
                    if('rua' in response.data.error){
                        setRuaErro(response.data.error.rua[0]);
                    }
                    if('numero' in response.data.error){
                        setNumeroErro(response.data.error.numero[0]);
                    }
                    if('bairro' in response.data.error){
                        setBairroErro(response.data.error.bairro[0]);
                    }
                    if('cep' in response.data.error){
                        setCepErro(response.data.error.cep[0]);
                    }
                    if('estado' in response.data.error){
                        setEstadoErro(response.data.error.estado[0]);
                    }
                    if('complemento' in response.data.error){
                        setComplementoErro(response.data.error.complemento[0]);
                    }
                    if('salario' in response.data.error){
                        setSalarioErro(response.data.error.salario[0]);
                    }
                }
            }).catch(function (error) {
                console.log(error)
            })
    }

    const findCep = (e: FormEvent) => {

        e.preventDefault();

        fetch('https://viacep.com.br/ws/' + cep + '/json/',
            {
                method: 'GET'
            }
        ).then(response => response.json())
            .then(
                data => {

                    setCidade(data.localidade);
                    setEstado(data.uf);
                    setRua(data.logradouro);
                    setComplemento(data.complemento);
                    setBairro(data.bairro)
                }
            ).catch(error => {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "CEP não encontrado"
                });
            });
    }

    const handleState = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "nome") {
            setNome(e.target.value);
        }
        if (e.target.name === "celular") {
            setCelular(e.target.value);
        }
        if (e.target.name === "cpf") {
            setCpf(e.target.value);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "dataNascimento") {
            setdataNascimento(e.target.value);
        }
        if (e.target.name === "cidade") {
            setCidade(e.target.value);
        }
        if (e.target.name === "pais") {
            setPais(e.target.value);
        }
        if (e.target.name === "rua") {
            setRua(e.target.value);
        }
        if (e.target.name === "numero") {
            setNumero(e.target.value);
        }
        if (e.target.name === "bairro") {
            setBairro(e.target.value);
        }
        if (e.target.name === "cep") {
            setCep(e.target.value);
        }
        if (e.target.name === "estado") {
            setEstado(e.target.value);
        }
        if (e.target.name === "complemento") {
            setComplemento(e.target.value);
        }
        if (e.target.name === "salario") {
            setSalario(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    return (
        <div>
            <HeaderProfissional />
            <main>
                <div className='container'>
                    <div className='card'>
                        <div className='card-body'>
                            <h5 className='card-title'>Cadastrar Clientes</h5>
                            <form onSubmit={cadastrarProfissional} className='row g-3'>
                                <div className='col-6'>
                                    <label htmlFor="nome" className='form-label'>Nome</label>
                                    <input type="text" name='nome' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{nomeErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="ecelularail" className='form-label' >Celular</label>
                                    <input type="text" name='celular' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{celularErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="email" className='form-label'>E-mail</label>
                                    <input type="email" name='email' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{emailErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cpf" className='form-label'>CPF</label>
                                    <input type="text" name='cpf' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{cpfErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cep" className='form-label'>Cep</label>
                                    <input type="text" name='cep' onBlur={findCep} className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{cepErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="dataNascimento" className='form-label'>Sua Data de nascimento</label>
                                    <input type="date" name='dataNascimento' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{dataNascimentoErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="cidade" className='form-label'>Cidade</label>
                                    <input type="text" value={cidade} name='cidade' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{cidadeErro}</div>
                                </div>

                                <div className='col-6'>
                                    <label htmlFor="estado" className='form-label'>Estado</label>
                                    <input type="text" value={estado} name='estado' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{estadoErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="pais" className='form-label'>País</label>
                                    <input type="text" name='pais' value={pais} className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{paisErro}</div>
                                </div>

                                <div className='col-6'>
                                    <label htmlFor="rua" className='form-label'>Rua</label>
                                    <input type="text" name='rua' value={rua} className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{numeroErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="numero" className='form-label'>Numero</label>
                                    <input type="text" name='numero' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{numeroErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="bairro" className='form-label'>Bairro</label>
                                    <input type="text" name='bairro' value={bairro} className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{bairroErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="salario" className='form-label'>Salario</label>
                                    <input type="text" name='salario' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{salarioErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="complemento" className='form-label'>Complemento</label>
                                    <input type="text" name='complemento' value={complemento} className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{complementoErro}</div>
                                </div>
                                <div className='col-6'>
                                    <label htmlFor="password" className='form-label'>Senha</label>
                                    <input type="password" name='password' className='form-control' required onChange={handleState} />
                                    <div className='text-danger'>{passwordErro}</div>
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

export default CadastroProfissional;
