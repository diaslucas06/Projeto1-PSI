from flask import Flask, request, url_for, redirect, render_template, flash

app = Flask(__name__)

user = None
livros = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cadastro')
def cadastro():
    if user:
        return redirect(url_for('cadastro_livros'))
    return render_template('cadastro.html')

@app.route('/login', methods=['POST'])
def login():
    global user
    user = request.form.get('login')
    return redirect(url_for('cadastro_livros'))

@app.route('/cadastro_livros')
def cadastro_livros():
    if not user:
        return redirect(url_for('cadastro'))
    return render_template('cadastro_livros.html')

@app.route('/adicionar-livro', methods=['POST'])
def adicionar_livro():
    global livros
    livro = {
        "titulo": request.form.get('titulo'),
        "genero": request.form.get('genero'),
        "desc": request.form.get('descricao'),
        "lido": False
    }
    livros.append(livro)
    return redirect(url_for('livros_cadastrados'))

@app.route('/livros-cadastrados')
def livros_cadastrados():
    if not user:
        return redirect(url_for('cadastro'))
    return render_template('livros_cadastrados.html', livros = livros)

@app.route('/logout', methods=['POST'])
def logout():
    global user, livros
    user = None
    livros = []
    return redirect(url_for('index'))

@app.route('/livros_cadastrados', methods=['POST'])
def botao_pagLivros():
    if not user:
        return redirect(url_for('cadastro'))
    return redirect(url_for('livros_cadastrados'))

@app.route('/excluir-livro/<int:indice>' , methods=['POST']) 
def excluir_livro(indice):
    global livros
    if 0 <= indice < len(livros):
        livros.pop(indice) 
    return redirect(url_for('livros_cadastrados'))

@app.route('/editar-livro/<int:indice>', methods=['GET', 'POST'])
def editar_livro(indice):
    global livros
    
    if request.method == 'GET':
        if 0 <= indice < len(livros):
            livro = livros[indice]
            return render_template('editar_livro.html', livro=livro, indice=indice)
        return redirect(url_for('livros_cadastrados'))

    if 0 <= indice < len(livros):
        livros[indice] = {
            "titulo": request.form.get('titulo'),
            "genero": request.form.get('genero'),
            "desc": request.form.get('descricao'),
            "lido": request.form.get('lido') == 'on'
        }
    return redirect(url_for('livros_cadastrados'))

@app.errorhandler(400)
def error400(error):
    return render_template('errors/error400.html'), 400

@app.errorhandler(401)
def error401(error):
    return render_template('errors/error400.html'), 401

@app.errorhandler(403)
def error403(error):
    return render_template('errors/error400.html'), 403

@app.errorhandler(404)
def error404(error):
    return render_template('errors/error400.html'), 404

if __name__ == '__main__':
    app.run(debug=True)
    