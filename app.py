import streamlit as st
import difflib
import unicodedata

# ==========================
# Funções de Normalização
# ==========================

def normalize(text):
    """Remove acentos, converte para minúsculas e tira espaços extras."""
    if not text:
        return ""
    text = text.strip().lower()
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("utf-8")
    return text

# Dicionário de equivalências manuais
EQUIVALENCIAS = {
    "js": "javascript",
    "java script": "javascript",
    "java-script": "javascript",
    "py": "python",
    "bd": "banco de dados",
    "db": "banco de dados",
    "ml": "machine learning",
    "ai": "inteligencia artificial",
    "linkedin": "rede social",
    "mentoria": "carreira",
    "career": "carreira",
    "carrers": "carreira",
    "dados": "data",
    "engenharia de dados": "data engineering",
}

def map_equivalencia(skill):
    """Substitui skill por equivalente se existir no dicionário."""
    skill_norm = normalize(skill)
    return EQUIVALENCIAS.get(skill_norm, skill_norm)

def similaridade(term1, term2):
    """Retorna a similaridade (0-1) entre duas strings."""
    return difflib.SequenceMatcher(None, term1, term2).ratio()

# ==========================
# Função para encontrar matches
# ==========================

def encontrar_matches(usuarios):
    matches = []
    for u in usuarios:
        for outro in usuarios:
            if u == outro:
                continue
            for busca in u["procura"]:
                busca_norm = map_equivalencia(busca)
                for habilidade in outro["habilidades"]:
                    hab_norm = map_equivalencia(habilidade)
                    
                    # Se bater diretamente OU se similaridade >= 0.7
                    if (
                        busca_norm == hab_norm
                        or similaridade(busca_norm, hab_norm) >= 0.7
                    ):
                        matches.append(
                            f"🔗 {u['nome']} procura '{busca}' e encontrou em {outro['nome']} (habilidade: {habilidade})"
                        )
    return matches

# ==========================
# Interface Streamlit
# ==========================

st.title("🔍 Plataforma de Matchmaking de Habilidades")

# Inicializar sessão
if "usuarios" not in st.session_state:
    st.session_state["usuarios"] = []

with st.form("cadastro"):
    nome = st.text_input("Nome:")
    habilidades = st.text_input("Suas habilidades (separe por vírgula):")
    procura = st.text_input("O que você procura:")
    submit = st.form_submit_button("Cadastrar")

    if submit and nome:
        st.session_state["usuarios"].append(
            {
                "nome": nome,
                "habilidades": [normalize(h.strip()) for h in habilidades.split(",") if h.strip()],
                "procura": [normalize(p.strip()) for p in procura.split(",") if p.strip()],
            }
        )
        st.success("Usuário cadastrado com sucesso!")

# Usuários cadastrados
st.subheader("👥 Usuários cadastrados")
for u in st.session_state["usuarios"]:
    st.write(
        f"**{u['nome']}** | Habilidades: {', '.join(u['habilidades'])} | Procura: {', '.join(u['procura'])}"
    )

# Matches encontrados
st.subheader("🤝 Matches encontrados")
matches = encontrar_matches(st.session_state["usuarios"])
if matches:
    for m in matches:
        st.info(m)
else:
    st.write("Nenhum match encontrado ainda.")
