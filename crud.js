
// POST
function cadastrar() {

    //Pegando os dados
    const nomeUser = document.getElementById('nomeUser').value; //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const sobrenome = document.getElementById('sobrenome').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const email = document.getElementById('email').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const telefone = document.getElementById('telefone').value;//VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const cargo = document.getElementById('cargo').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const empresa = document.getElementById('empresa').value;//VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const cpf = document.getElementById('cpf').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const eventosSelecionado = eventos()

    // Conectando com o banco de dados e usando o metodo POST
    fetch("http://localhost:3000/cadastroUsuarios", {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeUser,
            sobrenome: sobrenome,
            email: email,
            telefone: telefone,
            cargo: cargo,
            empresa: empresa,
            cpf: cpf,
            eventos: eventosSelecionado
        })
    }).then(response => response.json())
}


// PUT
function atualizar() {

    //Pegando os dados
    const nomeUser = document.getElementById('nomeUser').value; //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const sobrenome = document.getElementById('sobrenome').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const email = document.getElementById('email').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const telefone = document.getElementById('telefone').value;//VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const cargo = document.getElementById('cargo').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const empresa = document.getElementById('empresa').value;//VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const cpf = document.getElementById('cpf').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    const eventosSelecionado = eventos()

    //Conectando com o  banco de dados através do cpf
    fetch(`http://localhost:3000/cadastroUsuarios?cpf=${cpf}`).then(response => response.json())
        .then(data => {

            //Buscando o id do usuario
            let id = data[0].id

            //Usando o id para o metodo PUT
            fetch(`http://localhost:3000/cadastroUsuarios/${id}`, {
                method: "PUT",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nomeUser,
                    sobrenome: sobrenome,
                    email: email,
                    telefone: telefone,
                    cargo: cargo,
                    empresa: empresa,
                    cpf: cpf,
                    eventos: eventosSelecionado
                })
            }).then(response => response.json())
        })
}

//Retorna a ficha de inscrição selecionado pelo usuario
function eventos() {
    const select = document.querySelector('#eventos');
    const opcaoSelecionada = select.options[select.selectedIndex].value;
    console.log(opcaoSelecionada);
    return opcaoSelecionada;
}


// GET
function buscar() {

    const cpfBusca = document.getElementById('cpfBusca').value;   //VARIAVEL PARA SETAR VALORES DIGITAADOS NA PAGINA CADASTRO
    fetch(`http://localhost:3000/cadastroUsuarios?cpf=${cpfBusca}`, {
        method: "GET",
    }).then(response => response.json())
        .then(data => {
            document.getElementById('nomeUser').value = data[0].nome;
            document.getElementById('sobrenome').value = data[0].sobrenome;
            document.getElementById('cpf').value = data[0].cpf;
            document.getElementById('email').value = data[0].email;
            document.getElementById('telefone').value = data[0].telefone;
            document.getElementById('cargo').value = data[0].cargo;
            document.getElementById('empresa').value = data[0].empresa;
            document.querySelector('#eventos').value = data[0].eventos;

            document.getElementById('pesquisa').style.display = 'none'
            document.getElementById('buscaForm').style.display = 'block'
            
        })
        .catch(error => { // Tratando erro
            alert('CPF invalido');
        })
}



//DELETE
function deletar() {
    //Pega o cpf do formulario
    const cpf = document.getElementById('cpf').value
    console.log(cpf);

    alert('Usuario deletado com sucesso')
    setTimeout(function () { //Colocando um timer de 1500ms para apagar o usuario

        //Conectando com o banco de dados atraves do cpf 
        fetch(`http://localhost:3000/cadastroUsuarios?cpf=${cpf}`).then(response => response.json())
            .then(data => {
                //Pegando o id do usuario no banco de dados
                let id = data[0].id
                console.log(id);

                //Usando o id para deletar o usuario do banco de dados
                fetch(`http://localhost:3000/cadastroUsuarios/${id}`, {
                    method: "DELETE"
                }).then(response => response.json())

            })
    }, 1500);

}

//IMPRIMIR
function imprimir() {
    // ARMAZENANDO AS BORDAS ORIGINAIS DOS INPUTS
    const inputs = document.querySelectorAll('input');
    const bordasOriginais = [];
    for (let i = 0; i < inputs.length; i++) {
        bordasOriginais.push(inputs[i].style.border);
        inputs[i].style.border = 'none';
    }

    // IMPRIMINDO A PÁGINA
    window.print();

    // RESTAURANDO AS BORDAS ORIGINAIS DOS INPUTS
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].style.border = bordasOriginais[i];
    }
}

