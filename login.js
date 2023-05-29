function confirmarLogin() { //FUNÇÃO PARA CONFIRMAR OS DADOS DIGITADOS NA PAGINA DE LOGIN
    const nome = document.getElementById('nome').value; //COLOCANDO OS VALORES QUE USUARIO DIGITOU EM UMA VARIAVEL
    const senha = document.getElementById('senha').value; //COLOCANDO OS VALORES QUE USUARIO DIGITOU EM UMA VARIAVEL
    
    fetch('http://localhost:3000/userADM').then(response => response.json())
        .then(data => {
            console.log(data);

            let verificaEntrada = false;

            //Percorrendo todo o json
            for (x = 0; x < data.length; x++) {

                if (data[x].nome === nome && data[x].senha === senha) {
                    verificaEntrada = true;
                    alert('Entrada confirmada')
                    window.location.href = "cadastro.html"; //direcionando o admin para a pagina de cadastro
                    break;
                }
            }

            //Mensagem de erro
            if (verificaEntrada === false) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario não Encontrado',
                    footer: 'Tente Novamente'
                })
            }
        })
}