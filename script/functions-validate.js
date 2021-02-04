let nomeValidador = { valor: false };
let nascimentoValidador = { valor: false };
let cpfValidador = { valor: false };
let celularValidador = { valor: false };
let emailValidador = { valor: false };
let cepValidador = { valor: false };
const nome = $('#nome');
const nascimento = $('#nascimento');
const cpf = $('#cpf');
const celular = $('#celular');
const email = $('#email');
const cep = $('#cep');
const logradouro = $('#logradouro');
const bairro = $('#bairro');
const cidade = $('#cidade');
const uf = $('#uf');

export const setarValido = (elemento, elementoValidador) => {
    elemento.addClass('valid');
    elemento.removeClass('invalid');
    elementoValidador.valor = true;
}

export const setarInvalido = (elemento, elementoValidador) => {
    elemento.removeClass('valid');
    elemento.addClass('invalid');
    elementoValidador.valor = false;
}

export const validarSubmit = () => {
    if (nomeValidador.valor
        && nascimentoValidador.valor
        && cpfValidador.valor
        && celularValidador.valor
        && emailValidador.valor
        && cepValidador.valor) {
        return true;
    } else return false
}


export const limparCamposEndereco = () => {
    logradouro.val('');
    logradouro.prop('disabled', false);
    bairro.val('');
    bairro.prop('disabled', false);
    cidade.val('');
    cidade.prop('disabled', false);
    uf.val('');
    uf.prop('disabled', false);
}

export const validarNome = (string) => {
    const regex = /[A-z][ ][A-z]/;
    if (regex.test(string)) {
        setarValido(nome, nomeValidador);
    } else {
        setarInvalido(nome, nomeValidador);
    }
}

export const validarCPF = (strCPF) => {
    let soma;
    let resto;
    soma = 0;
    if (strCPF == "00000000000") {
        setarInvalido(cpf, cpfValidador)
        return false;
    }

    for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(strCPF.substring(9, 10))) {
        setarInvalido(cpf, cpfValidador)
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))
        resto = 0;
    if (resto != parseInt(strCPF.substring(10, 11))) {
        setarInvalido(cpf, cpfValidador)
        return false;
    }
    setarValido(cpf, cpfValidador);
    return true;
};

export const validarNascimento = (data) => {
    let dataAtual = new Date();
    let diaAtual = dataAtual.getDate();
    let mesAtual = dataAtual.getMonth() + 1;
    let anoAtual = dataAtual.getFullYear();

    data = data.replace(/\//g, "-");
    let data_arr = data.split("-");
    let dia = data_arr[2];
    let mes = data_arr[1];
    let ano = data_arr[0];

    /* IE - Formato diferente */
    if (data_arr[0].length != 4) {
        dia = data_arr[0];
        mes = data_arr[1];
        ano = data_arr[2];
    }

    if (ano < 1900) {
        setarInvalido(nascimento, nascimentoValidador);
        return false;
    }

    let d1 = new Date(anoAtual, mesAtual, diaAtual);
    let d2 = new Date(ano, mes, dia);

    let diferenca = d2.getTime() - d1.getTime();
    diferenca = diferenca / (1000 * 60 * 60 * 24);

    if (diferenca < 0) {
        setarValido(nascimento, nascimentoValidador)
        return true;
    } else {
        setarInvalido(nascimento, nascimentoValidador)
        return false;
    }
};

export const validarEmail = (string) => {
    const regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (regex.test(string)) {
        setarValido(email, emailValidador);
        return true;
    } else {
        setarInvalido(email, emailValidador);
        return false;
    }
}

export const validarCelular = (numero) => {
    if (numero.length >= 12) {
        setarValido(celular, celularValidador)
        return true;
    } else {
        setarInvalido(celular, celularValidador)
        return false;
    }
}

export const validarCEP = async (cepString) => {
    cepString = cepString.replace('-', '')
    if (cepString.length == 8) {
        let url = `https://api.postmon.com.br/v1/cep/${cepString}`

        const resultado = await fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cidade) {
                    if (data.logradouro) {
                        $("#logradouro").val(data.logradouro);
                        $("#logradouro").attr('disabled', 'disabled');
                    }
                    if (data.bairro) {
                        $('#bairro').val(data.bairro);
                        $('#bairro').attr('disabled', 'disabled');
                    }
                    $("#cidade").val(data.cidade);
                    $('#cidade').attr('disabled', 'disabled');
                    $("#uf").val(data.estado);
                    $('#uf').attr('disabled', 'disabled');
                    setarValido(cep, cepValidador);
                }
            })
            .catch(err => {
                console.log(err);
                limparCamposEndereco();
                setarInvalido(cep, cepValidador);
                return false;
            })
    }
    else {
        setarInvalido(cep, cepValidador);
        return false;
    }
}