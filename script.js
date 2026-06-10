const regencias = [
    { inicio: { mes: 1, dia: 20 }, signo: "Aquário", elemento: "Ar", qualidade: "Fixo", trono: "Urano", descricao: "O Despertar Caótico A Nova Era", imagem: "aquario.jpg" },
    { inicio: { mes: 2, dia: 19 }, signo: "Peixes", elemento: "Água", qualidade: "Mutável", trono: "Netuno", descricao: "A Ilusão e a Desorientação", imagem: "peixes.jpg" },
    { inicio: { mes: 3, dia: 21 }, signo: "Áries", elemento: "Fogo", qualidade: "Cardinal", trono: "Marte", descricao: "A Ira e a Guerra", imagem: "aries.jpg" },
    { inicio: { mes: 4, dia: 21 }, signo: "Touro", elemento: "Terra", qualidade: "Fixo", trono: "Afrodite", descricao: "A Luxúria e o Desejo", imagem: "touro.jpg" },
    { inicio: { mes: 5, dia: 22 }, signo: "Gêmeos", elemento: "Ar", qualidade: "Mutável", trono: "Atena", descricao: "A Soberba e a Estratégia", imagem: "gemeos.jpg" },
    { inicio: { mes: 6, dia: 21 }, signo: "Câncer", elemento: "Água", qualidade: "Cardinal", trono: "Lilith", descricao: "Sexo Perverso Feitiçaria Homossexualidade", imagem: "cancer.jpg" },
    { inicio: { mes: 7, dia: 23 }, signo: "Leão", elemento: "Fogo", qualidade: "Fixo", trono: "Apolo", descricao: "Vaidade Homossexualidade Musica Sedutora", imagem: "apolo.jpg" },
    { inicio: { mes: 8, dia: 22 }, signo: "Virgem", elemento: "Terra", qualidade: "Mutável", trono: "Mercúrio", descricao: "A Manipulação e o Engano", imagem: "virgem.jpg" },
    { inicio: { mes: 9, dia: 23 }, signo: "Libra", elemento: "Ar", qualidade: "Cardinal", trono: "Têmis", descricao: "A Corrupção da Justiça", imagem: "libra.jpg" },
    { inicio: { mes: 10, dia: 24 }, signo: "Escorpião", elemento: "Água", qualidade: "Fixo", trono: "Hades", descricao: "A Ambição e a Destruição", imagem: "escorpiao.jpg" },
    { inicio: { mes: 11, dia: 21 }, signo: "Sagitário", elemento: "Fogo", qualidade: "Mutável", trono: "Zeus", descricao: "O Abuso do Poder", imagem: "sagitario.jpg" },
    { inicio: { mes: 12, dia: 22 }, signo: "Capricórnio", elemento: "Terra", qualidade: "Cardinal", trono: "Saturno", descricao: "A Crueldade e o Controle", imagem: "capricornio.jpg" }
];

const datasRegencia = regencias.map(r => r.inicio);

function obterRegencia(data) {
    let mes = data.getMonth() + 1;
    let dia = data.getDate();
    let atual = regencias[regencias.length - 1];

    for (let reg of regencias) {
        if (mes > reg.inicio.mes || (mes === reg.inicio.mes && dia >= reg.inicio.dia)) {
            atual = reg;
        }
    }
    return atual;
}

function atualizarInfo(reg) {

    document.getElementById("textoRegencia").textContent =
        `${reg.trono} • ${reg.signo} (${reg.elemento})`;

}

function analisarAtual() {
    const hoje = new Date();
    const reg = obterRegencia(hoje);
    atualizarInfo(reg);
}

function gerarCalendario() {
    const calendar = document.getElementById("calendar");
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const diaAtual = hoje.getDate();

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById("mesAtual").textContent = `${meses[mes]} ${ano}`;

    let html = `
        <table>
            <tr>
                <th>Dom</th><th>Seg</th><th>Ter</th><th>Qua</th><th>Qui</th><th>Sex</th><th>Sáb</th>
            </tr>
            <tr>
    `;

    for (let i = 0; i < primeiroDia; i++) {
        html += "<td></td>";
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        // Quebra de linha no domingo
        if ((dia + primeiroDia - 1) % 7 === 0 && dia !== 1) {
            html += "</tr><tr>";
        }

        let classe = "";
        const ehRegencia = datasRegencia.some(r => r.mes === mes + 1 && r.dia === dia);
        const ehOrgulho = (mes + 1) === 6 && dia === 28;
        const ehHoje = (dia === diaAtual);

        // === NOVAS REGRAS POR DIA DA SEMANA ===
        const diaDaSemana = (dia + primeiroDia - 1) % 7; // 0=Dom, 1=Seg, ..., 6=Sáb

        if (diaDaSemana === 1) classe += " dia-segunda";      // Segunda-feira
        if (diaDaSemana === 5) classe += " dia-sexta";        // Sexta-feira
        if (diaDaSemana === 6) classe += " dia-sabado";       // Sábado

        if (ehRegencia) classe += " dia-regencia";
        if (ehOrgulho) classe += " dia-evento";
        if (ehHoje) classe += " dia-atual";

        html += `
            <td class="${classe.trim()}" 
                title="${ehHoje ? 'Hoje ' : ''}${ehRegencia ? 'Início de Regência ' : ''}${ehOrgulho ? 'Dia do Orgulho ' : ''}">
                ${dia}
            </td>
        `;
    }

    html += "</tr></table>";

    // Legenda atualizada
    html += `
        <div style="margin-top: 20px; padding: 15px; border-top: 1px solid #d4af37; font-size: 0.95rem; display:flex; flex-wrap:wrap; gap:12px; justify-content:center;">
            <div><span style="color:#ff8c00;">🌀</span> Segundas - Portal</div>
            <div><span style="color:#00b7eb;">03:00 🌀</span> Sextas - Portal</div>
            <div><span style="color:#ef5350;">00:00 🌀</span> Sábados - Portal</div>
            <div>👑 Início de Regência</div>
            <div>🏳️‍🌈 Dia do Orgulho</div>
        </div>
    `;

    calendar.innerHTML = html;
}

// Event Listeners
document.getElementById("btnAtual").addEventListener("click", analisarAtual);

document.getElementById("btnData").addEventListener("click", () => {
    const seletor = document.getElementById("seletorData");
    seletor.style.display = seletor.style.display === "none" ? "block" : "none";
});

document.getElementById("consultarData").addEventListener("click", () => {
    const valor = document.getElementById("dataEscolhida").value;
    if (!valor) {
        alert("Escolha uma data.");
        return;
    }
    const data = new Date(valor);
    const reg = obterRegencia(data);
    atualizarInfo(reg);
});
// ==================== DADOS LILITH ====================
const horariosLilith = {
    "Segunda":  ["01:00", "06:00", "14:00", "19:00"],
    "Sexta":    ["03:00", "08:00", "17:00", "22:00"],
    "Sábado":   ["00:00", "14:00", "19:00"],
    "Domingo":  ["04:00", "09:00", "11:00"]
};

function gerarHorariosLilith() {
    const container = document.getElementById("lilithHorarios");
    container.innerHTML = "";

    Object.keys(horariosLilith).forEach(dia => {
        const div = document.createElement("div");
        div.className = "dia-lilith";
        
        let horariosHTML = horariosLilith[dia].map(h => 
            `<span class="horario">${h}</span>`
        ).join("");

        div.innerHTML = `
            <div class="dia-nome">${dia}</div>
            <div class="horarios">${horariosHTML}</div>
        `;
        container.appendChild(div);
    });
}

function mostrarLilithHoje() {
    const hoje = new Date();
    const diasSemana = ["Domingo", "Segunda", "Sexta", "Sábado"];
    const diaNome = diasSemana[hoje.getDay()];

    const horarios = horariosLilith[diaNome] || [];

    const containerHoje = document.getElementById("lilithHoje");
    
    if (horarios.length > 0) {
        const horariosTexto = horarios.join(" • ");
        containerHoje.innerHTML = `
            <strong>Hoje (${diaNome}):</strong> ${horariosTexto}
        `;
    } else {
        containerHoje.innerHTML = `<strong>Hoje (${diaNome}):</strong> Sem horários registrados`;
    }
}
// Inicialização
gerarCalendario();
mostrarLilithHoje();
