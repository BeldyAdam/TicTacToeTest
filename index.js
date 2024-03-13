const cellak = document.querySelectorAll(".cella");
const statuszSzoveg = document.querySelector("#statuszSzoveg");
const ujraGombb = document.querySelector("#ujraGombb");
const cella = document.querySelector(".cella");
const gyozelemiLehetosegek = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let lehetoseg = ["", "", "", 
                 "", "", "", 
                 "", "", ""];

let jelenlegiJatekos = "X";
let running = false;
jatekInditasa();
function jatekInditasa(){
    for (let index = 0; index < cellak.length; index++) {
        cellak[index].addEventListener("click", cellaKattintas);
    }
    ujraGombb.addEventListener("click", reset);
    statuszSzoveg.textContent = `${jelenlegiJatekos} következik`;
    running = true;
}

function cellaKattintas(){
    const cellaIndex = this.getAttribute("cellaIndex");
    if(lehetoseg[cellaIndex] != "" || !running){
        return;
    }
    cellaFrissites(this, cellaIndex);
    jatekosCsere();
    nyertE();
}

function cellaFrissites(cella, index){
    lehetoseg[index] = jelenlegiJatekos;
    cella.textContent = jelenlegiJatekos;
}

function jatekosCsere(){
    if(jelenlegiJatekos == "X"){
        jelenlegiJatekos = "O";
    }else{
        jelenlegiJatekos = "X";
    }
    statuszSzoveg.textContent = `${jelenlegiJatekos} következik`;
}
function nyertE() {
    let nyert = false;

    for (let index = 0; index < gyozelemiLehetosegek.length; index++) {
        const feltetel = gyozelemiLehetosegek[index];
        const cellaA = lehetoseg[feltetel[0]];
        const cellaB = lehetoseg[feltetel[1]];
        const cellaC = lehetoseg[feltetel[2]];

        if (cellaA === "" || cellaB === "" || cellaC === "") {
            continue;
        }

        if (cellaA === cellaB && cellaB === cellaC) {
            nyert = true;
            break;
        }
    }

    if (nyert) {
        jatekosCsere();
        statuszSzoveg.textContent = `${jelenlegiJatekos} NYERT`;
        running = false;
    } else if (!lehetoseg.includes("")) {
        statuszSzoveg.textContent = `DÖNTETLEN`;
        running = false;
    }
}

function reset(){
    jelenlegiJatekos = "X";
    lehetoseg = ["", "", "", 
                 "", "", "", 
                 "", "", ""];
    statuszSzoveg.textContent = `${jelenlegiJatekos} következik`;             
    for (let i = 0; i < cellak.length; i++) {
        cellak[i].textContent = "";
    }
    running = true;
}