const BotaoCadastro = document.getElementById('BotaoCadastro')
const BotaoLivro = document.getElementById('BotaoLivro')
const mensagem = document.getElementById('mensagem')
const mensagem1 = document.getElementById('mensagem1')

BotaoCadastro.addEventListener('click', (event) => {
    event.preventDefault();

    let login = document.getElementsByName('login')[0].value;
    let senha = document.getElementsByName('senha')[0].value;

    if (!login && !senha) {
        mensagem.innerText = "Preencha os campos!";
        return
    }

    else if (!login) {
        mensagem.innerText = "Insira um login!"
        return
    }

    else if (!senha) {
        mensagem.innerText = "Insira uma senha!"
        return
    }

})

BotaoLivro.addEventListener('click', (event) => {
    event.preventDefault();

    let titulo = document.getElementsByName('titulo')[0].value;
    let genero = document.getElementsByName('genero')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;

    if (!titulo && !genero && !descricao) {
        mensagem1.innerText = "Preencha os campos!";
        return
    }

    else if (!titulo) {
        mensagem1.innerText = "Insira um título para o seu livro!";
        return
    }

    else if (!genero) {
        mensagem1.innerText = "Insira um gênero para o seu livro!";
        return
    }

    else if (!descricao) {
        mensagem1.innerText = "Insira uma descrição para o seu livro!";
        return
    }

})