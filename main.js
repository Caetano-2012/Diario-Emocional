function analisarHumor(texto) {
    const positivo = ['feliz', 'alegre', 'animado', 'grato', 'ótimo', 'bem', 'contente', 'calmo', 'otimista' ];
    const negativo = ['triste', 'cansado', 'chateado', 'péssimo', 'mal', 'deprimido', 'ansioso', 'estressado', 'raiva', 'pessimista', 'medroso'];
    const textoMin = texto.toLowerCase();
    let score = 0;
    positivo.forEach(palavra => {
        if(textoMin.includes(palavra)) score++;
    })
    negativo.forEach(palavra =>{
        if(textoMin.includes(palavra)) score--;
    })
    if(score>0) return {humor: 'Feliz', emoji: '😊'};
    else if(score<0) return {humor: 'Triste', emoji:'😞'};
    else return {humor: 'Neutro', emoji:'😐'};
}

function salvarEntrada() {
    const usuario = document.getElementById("usuario").value.trim();
    const data = document.getElementById("data").value;
    const titulo = document.getElementById("titulo").value.trim();
    const texto = document.getElementById("texto").value.trim();
    if(!usuario || !data || !titulo || !texto) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const analise = analisarHumor(texto);
    const novaEntrada = {
        usuario,
        data,
        titulo,
        texto,
        humor: analise.humor,
        emoji: analise.emoji
    };
    const entradas = JSON.parse(localStorage.getItem("diarioEmocoes")) || [];
    entradas.unshift(novaEntrada);
    localStorage.setItem("diarioEmocoes", JSON.stringify(entradas));
    document.querySelector("form").reset();
    document.getElementById("data").value = new Date().toISOString().slice(0, 16);
    mostrarEntradas();

}

function mostrarEntradas() {
    const lista = document.getElementById("listaEntradas");
    lista.innerHTML = "";
    const entradas = JSON.parse(localStorage.getItem("diarioEmocoes")) || [];
    if(entradas.length === 0) {
        lista.innerHTML = "<p> Seu diário ainda está vazio </p>";
        return;
    }
    entradas.forEach(entrada => {
        const div = document.createElement("div");
        div.classList.add("entrada");
        div.innerHTML = `
        <h3>${entrada.titulo}</h3>
        <p><strong>Usuário:</strong>${new Date(entrada.data).toLocaleString("pt-BR")}</p>
        <p>${entrada.texto}</p>
        <p class="humor"><strong>Humor:</strong>${entrada.humor}<span class="emoji">${entrada.emoji}</span></p>
        `;
        lista.appendChild(div);
    })
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("data").value = new Date().toISOString().slice(0,16);
    mostrarEntradas();
})

function mostrarFrase() {
    const entradas = JSON.parse(localStorage.getItem("diarioEmocoes"))|| [];
    if(entradas.length === 0) {
        alert("Você ainda não fez nenhuma frase no diário.");
        return;
    }
    const ultimaEntrada = entradas[0];
    const humor = ultimaEntrada.humor;
    const frases = {
       "Feliz": [
        "Continue assim, quem sabe sua felicidade ajude outra pessoa!",
        "Você já é luz — agora é hora de brilhar ainda mais forte.",
        "A felicidade que você sente é o combustível da sua jornada.",
        "A sua alegria recompensará você depois, continue assim!",
        "Não desacelere: a alegria é só o começo de algo ainda maior.",
        "Se o vento está bom, voe mais alto."
       ],
       "Triste": [
        "Vamos lá! Levante esta cabeça, seja otimista e se encante lá na frente!",
        "Quase tudo no mundo tem solução, encontre a sua!",
        "Mesmo a noite mais escura termina com o nascer do sol.",
        "Você não precisa apressar o florescer — até a semente precisa de tempo no escuro para crescer.",
        "Tudo o que você sente é válido. Seja gentil consigo mesmo nesse processo.",
        "A dor é passageira, mas a força que você ganha com ela fica pra sempre."
       ],
       "Neutro": [
        "Dias calmos também fazem parte da travessia.",
        "Nem todo momento precisa ser intenso. Às vezes, só viver já é coragem.",
        "O equilíbrio de hoje é a base para os voos de amanhã.",
        "Mesmo sem grandes emoções, você continua crescendo por dentro.",
        "A paz também é progresso, mesmo que silencioso.",
        "Às vezes, é no silêncio da rotina que surgem as maiores ideias."
       ]
    };
    const opcoes = frases[humor] || frases["Neutro"];
    const aleatoria = opcoes[Math.floor(Math.random() * opcoes.length)];
    document.getElementById("fraseMotivacional").textContent = `"${aleatoria}"`;
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aleatoria);
        utterance.lang = "pt-BR";
        window.speechSynthesis.speak(utterance);
    } else {
        alert("Este navegador não suporta leitura em voz alta.")
    }
}