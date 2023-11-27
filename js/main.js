/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
    ];

/*----- app's state (variables) -----*/

let board;
let turn = 'X';
let win;


/*----- cached element references -----*/

const squares = Array.from(document.querySelectorAll('#board div'));

/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
const messages = document.querySelector('h2');
document.getElementById('reset-button').addEventListener('click', init);


/*----- functions -----*/

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
        });
        return winner ? winner : board.includes('') ? null : 'T';
        
};

 function handleTurn() {
    if (win !== null) {
        console.log('Le jeu est déjà terminé.');
        return; //  Quittez la fonction si le jeu a déjà été gagné.
    }
    let idx = squares.findIndex(function(square) {
         return square === event.target;
     });
     if (board[idx] === '') {  //Cette condition vérifie si la case à l'index trouvé (idx) dans le tableau board est vide ('') et si le jeu n'est pas déjà gagné (!win). Si ces conditions sont vraies, le programme passe aux étapes suivantes.
        board[idx] = turn; // Cette ligne met à jour le tableau board à l'index idx avec le symbole du joueur actuel (turn), où turn est soit 'X' soit 'O'. Il alterne entre 'X' et 'O' à chaque tour.
        turn = turn === 'X' ? 'O' : 'X'; // Cette ligne change le tour pour l'autre joueur. Si le tour actuel est 'X', il le change en 'O', et vice versa.
        win = getWinner(); //Cette ligne appelle une fonction getWinner() pour vérifier s'il y a un gagnant après le coup actuel. Le résultat est stocké dans la variable win.
        render(); // Cette ligne appelle une fonction render() pour mettre à jour l'affichage du plateau de morpion en fonction de l'état actuel.
        ajoutPoints(win); //cette ligne appelle la fonctions ajout points
    } else {
        // Ajoutez éventuellement un message indiquant que la case est déjà occupée
        console.log('Case déjà occupée.');
    }
 };

function init() {
    board = [
    '', '', '',
    '', '', '',
    '', '', ''
    ];
    render();
    win = getWinner(); //pour que le jeu continue lorsque j'appuie sur recommencer
};

function render() {
    board.forEach(function(mark, index) {
    //this moves the value of the board item into the squares[idx]
    squares[index].textContent = mark;
    });
    messages.textContent = win === 'T' ? `C'est une egalite!` : win ? `${win} Vous avez gagné la partie !` : `c'est le tour de ${turn} !`;
    }
init();

//image mailto pour envoyer mon email
let monImage = document.getElementById("image"); /*entre les parenthèse on est aller prendre le id de mon image*/
monImage.addEventListener("click" , transfert );  //lorsque je clique sur monImage
function transfert () { //envoye a mon addresse courriel
window.location.href = "mailto: 2349075@etudiant.cegepvicto.ca" ; // qui est ceci

}

let scoreO = 0; // pointage X
let scoreX = 0; // pointage O
let gagnerParX = document.getElementById("score-x"); 
let gagnerParO = document.getElementById("score-o");
function ajoutPoints (win) {
    if(win==="X")
    {
         scoreX++;
        localStorage.setItem("scoreX",scoreX); //pour qui garde les chiffres dans la mémoire
        gagnerParX.innerHTML = "X :" + scoreX;
    }

    else if (win==="O")
    {
        scoreO++;
        localStorage.setItem("scoreO", scoreO);
        gagnerParO.innerHTML = "O :" + scoreO
    }

}

