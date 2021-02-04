import { validarSubmit } from "./functions-validate.js";

export default function handleSubmit() {
    const formulario = $("#cadastro");

    formulario.submit(function (event) {
        event.preventDefault();
        if (validarSubmit()) {
            console.log('Dados Corretos:');
            console.log(
                `
                Nome: ${$('#nome').val()}
                Nascimento: ${$('#nascimento').val()}
                CPF: ${$('#cpf').val()}
                Celular: ${$('#celular').val()}
                Email: ${$('#email').val()}
                CEP: ${$('#cep').val()}
                Logradouro: ${$('#logradouro').val()}
                Número: ${$('#numero').val()}
                Complemento: ${$('#complemento').val()}
                Bairro: ${$('#bairro').val()}
                Cidade: ${$('#cidade').val()}
                UF: ${$('#uf').val()}
                Descrição: ${$('#bio').val()}
                `
            )

        }
    });



}