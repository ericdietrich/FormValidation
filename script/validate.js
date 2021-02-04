import {
    validarCPF,
    validarNascimento,
    validarCelular,
    validarCEP,
    validarEmail,
    validarNome,
} from './functions-validate.js';


export default function validateForm() {
    const nome = $('#nome');
    const nascimento = $('#nascimento');
    const cpf = $('#cpf');
    const celular = $('#celular');
    const email = $('#email');
    const cep = $('#cep');


    /* Nome */
    nome.blur(function () {
        validarNome(nome.val());
    })
    /* Fim Nome */

    /* Nascimento */
    nascimento.blur(function () {
        validarNascimento(nascimento.val());
    });
    /* Fim Nascimento */

    /* CPF */
    cpf.keyup(function () {
        cpf.val(
            cpf.val()
                .replace(/\D/g, "")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1-$2")
        )
    });

    cpf.blur(function () {
        let cpfNumeros = cpf.val().replace(/\D/g, '');
        validarCPF(cpfNumeros);
    });
    /* Fim CPF */

    /* Celular */
    celular.keyup(function () {
        celular.val(
            celular.val()
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d)/, "$1 $2")
                .replace(/(\d{5})(\d)/, "$1 $2")
        )
    });

    celular.blur(function () {
        validarCelular(celular.val());
    });
    /* Fim Celular */

    /* Email */
    email.blur(function () {
        validarEmail(email.val());
    });
    /* Fim Email */

    /* CEP */
    cep.keyup(function () {
        cep.val(
            cep.val()
                .replace(/\D/g, "")
                .replace(/(\d{5})(\d)/, "$1-$2")
        )
    });

    cep.blur(function () {
        validarCEP(cep.val());
    });
    /* Fim CEP */
}


