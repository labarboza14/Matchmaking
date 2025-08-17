# 🔍 Match Habilidades — Plataforma de Matchmaking

Projeto simples de **Matchmaking de Habilidades** que roda **100% no navegador** usando **Streamlit**. Ideal para testes, aprendizado e portfólio.

---

## 🟢 O que o projeto faz

O objetivo do projeto é permitir que usuários encontrem outras pessoas com habilidades que combinam com o que eles estão procurando.

### Cadastro de usuários

Cada usuário pode se cadastrar preenchendo:

1. **Nome completo**
2. **Suas habilidades** (separe por vírgula, ex.: Python, SQL, JavaScript)
3. **O que você procura** (separe por vírgula, ex.: Mentoria, Carreira, Dados)

### Como os dados são armazenados

* Os dados são salvos **temporariamente na sessão do Streamlit** (`st.session_state`).
* Enquanto o app estiver aberto, os usuários cadastrados permanecem disponíveis.

### Como funciona o algoritmo de matching

1. **Comparação direta**: se a habilidade procurada bater exatamente com a habilidade oferecida de outro usuário.
2. **Similaridade aproximada**: caso a similaridade entre palavras seja >= 0.7 (usando `difflib`).
3. **Equivalências manuais**: termos comuns são tratados como iguais (ex.: "js" → "javascript", "py" → "python").

### Exemplo de matches encontrados

```
🔗 Teste 1 procura 'js' e encontrou no Teste 2 (habilidade: javascript)
🔗 Teste 2 procura 'linkedin' e encontrou no Teste 1 (habilidade: linkedin)
🔗 Teste 3 procura 'javascript' e encontrou no Teste 1 (habilidade: javascript)
```

---

## 💡 Sugestões de melhorias

1. **Sessão por usuário**

   * Cada usuário poderia ver apenas seus próprios matches.
   * Implementação: armazenar `current_user_id` na sessão.

2. **Autenticação simples**

   * Login com email e senha para personalizar a experiência de cada usuário.

3. **Filtros avançados e melhoria de UX**

   * Filtrar matches por categoria, nível de experiência ou área de interesse.

4. **Persistência de dados real**

   * Atualmente os dados desaparecem ao fechar o app.
   * Para produção, integrar Firebase, Supabase ou outro backend.

5. **Export / Import JSON**

   * Permitir salvar ou carregar a base de usuários para uso compartilhado.

---

## ⚡ Como usar localmente

### 1. Instalar Streamlit

Caso ainda não tenha Streamlit instalado:

```bash
pip install streamlit
```

### 2. Clonar o repositório

```bash
git clone https://github.com/seuusuario/nome-do-repo.git
cd nome-do-repo
```

### 3. Executar o app

```bash
streamlit run app.py
```

* O Streamlit abrirá o navegador com o app.
* Cadastre usuários, adicione habilidades e veja os matches em tempo real.

---

## 🌐 Como publicar

* **Streamlit Cloud**: recomendado para deploy público e gratuito. [https://streamlit.io/cloud](https://streamlit.io/cloud)
* **Heroku**: alternativa para hospedar apps Python online.
* **GitHub Pages** não suporta Python/Streamlit diretamente.

---

## 💾 Estrutura de dados (na sessão)

### Usuários cadastrados

```json
[
  {
    "nome": "Maria Silva",
    "email": "maria@exemplo.com",
    "senha": "senha123",
    "habilidades": ["python","sql","javascript"],
    "procura": ["mentoria","carreira","dados"]
  }
]
```

### Sessão por usuário (opcional)

```json
{
  "current_user_id": "uuid_do_usuario"
}
```

* Permite filtrar matches apenas para o usuário logado.

---

## 🔧 Tecnologias utilizadas

* **Python 3**
* **Streamlit** (interface web interativa)
* **difflib** e **unicodedata** para normalização e cálculo de similaridade
* **st.session\_state** para persistência temporária de dados
* Algoritmo de matching simples implementado em **Python**

---
