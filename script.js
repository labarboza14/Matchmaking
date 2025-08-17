// Dicionário de sinônimos / variações
const synonymMap = {
    "js": "javascript",
    "java script": "javascript",
    "javascript": "javascript",
    "python": "python",
    "py": "python",
    "data": "dados",
    "dados": "dados",
    "data engineer": "engenharia de dados",
    "engenharia de dados": "engenharia de dados",
    "db": "banco de dados",
    "banco de dados": "banco de dados",
    "sql": "banco de dados",
    "career": "carreira",
    "carreira": "carreira",
    "carrers": "carreira",
    "scrum": "scrum",
    "agile": "scrum"
};

// Normaliza palavras: minúsculo, sem acento, trim
function normalize(word) {
    return word
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove acentos
        .trim();
}

// Converte para termo base usando o dicionário
function normalizeWithSynonyms(word) {
    const norm = normalize(word);
    return synonymMap[norm] || norm;
}

// Banco de usuários cadastrados
let users = [];

document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const skills = document.getElementById("skills").value.split(",").map(s => normalizeWithSynonyms(s));
    const lookingFor = document.getElementById("lookingFor").value.split(",").map(s => normalizeWithSynonyms(s));

    const user = { name, skills, lookingFor };
    users.push(user);

    renderUsers();
    renderMatches();
    e.target.reset();
});

// Renderiza usuários
function renderUsers() {
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";
    users.forEach(u => {
        const div = document.createElement("div");
        div.classList.add("p-2", "mb-2", "bg-light", "rounded", "border");
        div.innerText = `${u.name} | Habilidades: ${u.skills.join(", ")} | Procura: ${u.lookingFor.join(", ")}`;
        usersList.appendChild(div);
    });
}

// Renderiza matches com motivo
function renderMatches() {
    const matchesList = document.getElementById("matchesList");
    matchesList.innerHTML = "";

    users.forEach(u1 => {
        users.forEach(u2 => {
            if (u1 !== u2) {
                let motivos = [];

                // Habilidades de u1 que atendem o que u2 procura
                u1.skills.forEach(skill => {
                    u2.lookingFor.forEach(need => {
                        if (skill.includes(need) || need.includes(skill)) {
                            motivos.push(`${u1.name} oferece "${skill}" que ${u2.name} procura ("${need}")`);
                        }
                    });
                });

                // Habilidades de u2 que atendem o que u1 procura
                u2.skills.forEach(skill => {
                    u1.lookingFor.forEach(need => {
                        if (skill.includes(need) || need.includes(skill)) {
                            motivos.push(`${u2.name} oferece "${skill}" que ${u1.name} procura ("${need}")`);
                        }
                    });
                });

                if (motivos.length > 0) {
                    const div = document.createElement("div");
                    div.classList.add("p-2", "mb-2", "bg-warning", "rounded", "border");
                    div.innerHTML = `
                        <strong>✨ Match encontrado: ${u1.name} ↔ ${u2.name}</strong><br>
                        🔎 Motivos:<br> - ${motivos.join("<br> - ")}
                    `;
                    matchesList.appendChild(div);
                }
            }
        });
    });
}
