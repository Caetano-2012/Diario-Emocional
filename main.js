function analisarHumor(texto) {
    const positivo = ['feliz', 'alegre', 'animado', 'grato', 'ótimo', 'bem', 'contente', 'calmo', 'otimista' ];
    const negativo = ['triste', 'cansado', 'chateado', 'péssimo', 'mal', 'deprimido', 'ansioso', 'estressado', 'raiva', 'pessimista', 'medroso'];
    const textoMin = texto.lowerCase();
    let score = 0;
    positivo.forEach(palavra => {
        if(textoMin.includes(palavra)) score++;
    })
    negativo.forEach(palavra =>{
        if(texto.Min.includes(palavra)) score--;
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
}