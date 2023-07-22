//* Variáveis 
//? HTML 
const fechar_pop_alert = document.querySelector("#fechar-pop-alert");
const block = document.querySelector(".block");
const pop_alert = document.querySelector("#pop-alert");
const x_score  = document.querySelector("#x-score-number");
const o_score  = document.querySelector("#o-score-number");
const btn_reiniciar = document.querySelector("#reiniciar");
const btn_zerar_placar = document.querySelector("#zerar-placar");
const boxes = document.querySelectorAll(".box");

//? JS 
let turno = 'X';
let play = true;
let jogadas_disponiveis = 9;
let x = 0;
let o = 0;

const movimentos_vencedores = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



//* Event Listener & onclick 
btn_reiniciar.addEventListener("click", reiniciar);

btn_zerar_placar.onclick = () => {
    turno = 'X';
    x = 0;
    o = 0;
    atualizar_score();
    reiniciar();
};

boxes.forEach(box => {
    box.onclick = () => {
        if(box.innerText == '' && play){
            box.innerText = turno;
            jogadas_disponiveis--;
            turno == 'X' ? turno = 'O' : turno = 'X';
            verificar_combinacao();
        }
    }
});



//* Functions 
function notificacao_alert() {
    const next_turn = document.querySelector("#next-turn");
    turno = next_turn.value;
    pop_alert.style.display = "none";
    block.style.display = "none";
}

function reiniciar() {
    toggle_win_box('remove-win-box');
    boxes.forEach(box => box.innerText = '');
    jogadas_disponiveis = 9;
    play = true;
}

function atualizar_score() {
    x_score.innerText = x > 0? x: '—';
    o_score.innerText = o > 0? o: '—';
}

function toggle_win_box(value, box1, box2, box3) {
    if (value === "add") {
        box1.classList.add("win-box");
        box2.classList.add("win-box");
        box3.classList.add("win-box");
    }
    else {
        const winboxes = document.querySelectorAll(".win-box");
        winboxes.forEach(box => box.classList.toggle("win-box"));
    }
}

function mostrar_ganhador(status) {
    let msg = '';
    pop_alert.innerHTML = '';
    if (status === 'empate') {
        msg = `
        <div onclick="notificacao_alert()" id="fechar-pop-alert">X</div>
            <h2 style="margin-top: 8vh">OH NÃO!!! Deu velha😢 {empate}</h2><br>
            <p>A próxima rodada irá começar com o jogador
                <select id="next-turn">
                    <option value="X">X</option>
                    <option value="O">O</option>
                </select>
            </p>
        </div>
        `
    }
    else {
        msg = `
        <div onclick="notificacao_alert()" id="fechar-pop-alert">X</div>
            <h2 style="margin-top: 8vh">O vencedor foi o Jogador "${status}"!!!</h2><br>
            <p>A próxima rodada irá começar com o jogador
                <select id="next-turn">
                    <option value="${status==='X'?'O':'X'}">${status==='X'?'O':'X'}</option>
                    <option value="${status}">${status}</option>
                </select>
            </p>
        `
    }
    block.style.display = "block";
    pop_alert.style.display = "block";
    pop_alert.innerHTML = msg;
}

function verificar_combinacao() {
    movimentos_vencedores.forEach(movimento => {
        const box1 = boxes[movimento[0]];
        const box2 = boxes[movimento[1]];
        const box3 = boxes[movimento[2]];
        const verificacao = box1.innerText === box2.innerText && box2.innerText === box3.innerText;

        if (box1.innerText !== '' && verificacao) {
            play = false;
            box1.innerText === 'X'? x++: o++;
            toggle_win_box('add', box1, box2, box3);
            mostrar_ganhador(box1.innerText);
        }
        atualizar_score();
    });

    if (jogadas_disponiveis === 0 && play) {
        play = false;
        mostrar_ganhador('empate');
    }
}