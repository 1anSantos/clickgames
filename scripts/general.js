const navJogosLista = document.querySelector(".nav-jogos-lista");
const menu = document.querySelector(".menu");

menu.addEventListener("click", abrir_ou_fechar_menu);

// Functions
function abrir_ou_fechar_menu() {
    if (navJogosLista.style.transform === "translateX(-101%)") {
        navJogosLista.style.transform = "translateX(0)";
    }
    else {
        navJogosLista.style.transform = "translateX(-101%)";
    }
}