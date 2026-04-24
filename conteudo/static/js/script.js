const BotaoCadastro = document.getElementById('BotaoCadastro')
const BotaoLivro = document.getElementById('BotaoLivro')
const mensagem = document.getElementById('mensagem')
const formCadastro = document.getElementById('formcadastro')
const formLivros = document.getElementById('formlivros')
const BotaoAdicionar = document.getElementById('btn');
const filtroGenero = document.getElementById('filtro-genero');
const FormPreencher = document.getElementById('form-preencher');
const Listaul = document.getElementById('lista');

let LivrosCadastrados = [];
let indexEdicao = -1;

if (BotaoCadastro){
BotaoCadastro.addEventListener('click', (event) => {
    event.preventDefault();

    let login = document.getElementsByName('login')[0].value;
    let senha = document.getElementsByName('senha')[0].value;

    if (!login && !senha) {
        mensagem.innerText = "Preencha os campos!";
        mensagem.style.display = "block";
        return
    }

    else if (!login) {
        mensagem.innerText = "Insira um login!"
        mensagem.style.display = "block";
        return
    }

    else if (!senha) {
        mensagem.innerText = "Insira uma senha!"
        mensagem.style.display = "block";
        return
    }

    mensagem.style.display = "none";
    formCadastro.submit()

});
}
BotaoLivro.addEventListener('click', (event) => {
    event.preventDefault();

    let titulo = document.getElementsByName('titulo')[0].value;
    let genero = document.getElementsByName('genero')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;

    if (!titulo && !genero && !descricao) {
        mensagem.innerText = "Preencha os campos!";
        mensagem.style.display = "block";
        return
    }

    else if (!titulo) {
        mensagem.innerText = "Insira um título para o seu livro!";
        mensagem.style.display = "block";
        return
    }

    else if (!genero) {
        mensagem.innerText = "Insira um gênero para o seu livro!";
        mensagem.style.display = "block";
        return
    }

    else if (!descricao) {
        mensagem.innerText = "Insira uma descrição para o seu livro!";
        mensagem.style.display = "block";
        return
    }

    mensagem.style.display = "none";
    formLivros.submit()

})

function atualizar_lista() {
    Listaul.innerHTML = ''; 

    for (let i = 0; i < LivrosCadastrados.length; i++) {
        
        let livro = LivrosCadastrados[i];

        if (filtroGenero.value !== 'todos' && livro.genero !== filtroGenero.value) {
            continue; 
        }
       
        let li = document.createElement('li');
        li.innerHTML = `
        <div id="titulo"><h2 id="titulo-livro">${livro.titulo}</h2></div>
        \n<p>${livro.descricao}</p>\n
        <div>
            <div id="carac"><h4>Gênero: ${livro.genero}</h4></div>
            <div class="excluir" id="excluir${i}">[Excluir]</div>
            <button onclick="editarLivro(${i})">Editar</button>
        </div>`;
        Listaul.appendChild(li);

        const excluir = document.getElementById(`excluir${i}`);
        excluir.addEventListener('click', (event) => {
            event.preventDefault();
            LivrosCadastrados.splice(i,1);

            salvarDados();
            atualizar_opcoes_filtro();
            atualizar_lista();
        });
    }
    salvarDados();
}
function salvarDados(){
    localStorage.setItem('meus_livros', JSON.stringify(LivrosCadastrados) );

}
  

function atualizar_opcoes_filtro(){
    
    const generosUnicos = [...new Set(LivrosCadastrados.map(livro => livro.genero))];
    const valorAtual = filtroGenero.value;
    
  
    filtroGenero.innerHTML = '<option value="todos">Filtrar por Gênero</option>';
    
    generosUnicos.forEach(genero => {
        const option = document.createElement('option');
        option.value = genero;
        option.innerText = genero;
        filtroGenero.appendChild(option);
    });

    if (generosUnicos.includes(valorAtual)) {
        filtroGenero.value = valorAtual;
    }
}

function editarLivro(i) {
    let livro = LivrosCadastrados[i];
    document.getElementsByName('titulo')[0].value = livro.titulo;
    document.getElementsByName('descricao')[0].value = livro.descricao;
    document.getElementsByName('genero')[0].value = livro.genero;

    indexEdicao = i;
    BotaoAdicionar.innerText="Salvar Alteração";
    
}

   BotaoAdicionar.addEventListener('click', (event) => {
    event.preventDefault();

    let titulo = document.getElementsByName('titulo')[0].value;
    let descricao = document.getElementsByName('descricao')[0].value;
    let genero = document.getElementsByName('genero')[0].value;

   
     if (!titulo && !descricao && !genero) {
        mensagem.innerText = "Preencha os campos!";
        return
    }

    const livro = {
        titulo: titulo,
        descricao: descricao,
        genero: genero
    };

    if(indexEdicao ===-1){
        LivrosCadastrados.push(livro);
        mensagem.innerText = "Livro adicionado";
    } else{
        LivrosCadastrados[indexEdicao] = livro;
        indexEdicao = -1;
        BotaoAdicionar.innerText= "Adicionar Livro";
        mensagem.innerText = "Livro atualizado";
    }

    atualizar_lista();
    atualizar_opcoes_filtro();
    FormPreencher.reset();
    
});

const livrosSalvos = localStorage.getItem('meus_livros');
if (livrosSalvos) {
    LivrosCadastrados = JSON.parse(livrosSalvos);
    atualizar_opcoes_filtro();
    atualizar_lista();
}

filtroGenero.addEventListener('change', atualizar_lista);
