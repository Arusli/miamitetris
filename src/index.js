//Grid Style: 
// - Reassigns divs in the grid to create the illusion of one falling tetrimino.
// - create a function on an interval that fills a certain starting set of blocks, 
// - reassigning their properties (color. position, status). and moves these every interval.


import Grid from '/src/grid.js';
import Tetrimino from '/src/tetrimino.js';
const grid = new Grid;


//GLOBAL VARS
const score = document.getElementById('score');
const newGameButton = document.getElementById('new-game');
const prompt = document.getElementById('restart');
const bonusScreen = document.getElementById('bonus');

let points = 0;
let speedTracker = 0;
let speed = 500;
// let timer;

//EVENT LISTENERS
document.addEventListener('keydown', leftEventHandler);
document.addEventListener('keydown', rightEventHandler);
document.addEventListener('keydown', downEventHandler);
document.addEventListener('keydown', rotateEventHandler);
document.addEventListener('keyup', slamEventHandler);
newGameButton.addEventListener('click', restart);

//INITIALIZE BOARD
grid.createGrid();
grid.assignNamesToAllDivs();
grid.hideBottomRow();
grid.hideTopTwoRows();
grid.hideOuterColumns();

updateScore();
updateSpeed();
//row 16 is the visible top, row 2 is the visible bottom.
console.log(grid.ArrayOfVisibleRows);
console.log(grid);
console.log('banana', grid.banana);
console.log('WEBPACK W TEST');

//CREATE TETRIMINO ClASS (VERY LARGE CLASS/OBJECT. CAN WE DO SOMETHING ABOUT THIS?)

//START
let Mino = new Tetrimino(grid);
Mino.generate();
run();

//GLOBAL FUNCTIONS
function run() { 
    // timer = setTimeout(fall, speed);
    // according to eslint setting timer is not necessary
    setTimeout(fall, speed);
}

function fall() {
    if (!Mino.isDownBlocked) {
        Mino.lower();
        run();
    } else {
        Mino.makeStatic(); //freeze block in place
        checkRowState(); //delete filled rows, downshifts static pieces
        if (isGameOver()){
            promptRestart();
        } else {
            Mino.generate();
            run();
        }
    }   
}

function promptRestart() {
    prompt.style.display = 'flex';
    let h3 = document.getElementById('endscore');
    h3.innerHTML = `Your score is ${points}.`
}

function restart() {
    grid.divArray.forEach( e => {
        e.className = 'blank';
    })
    prompt.style.display = 'none';
    points = 0;
    speedTracker = 0;
    speed = 500;
    updateScore();
    updateSpeed();
    Mino.generate();
    run();
}


function updateSpeed() {
    if (speed > 160 && speedTracker%5 === 0) {
        speed = 500 - ((speedTracker/5) * 20);
    } else {
        return;
    }
}

function updateScore() {
    score.innerHTML = `Score: ${points}`;
    console.log(speedTracker, speed);
}


function checkRowState() {
    let rowsCleared = 0;

    function isFilled(elem) { //callback function for .every
        return elem.className === 'static';
    }

    let i;
    for (i=0;i<grid.maxRows;i++) {
        if (grid.ArrayOfVisibleRows[i].every(isFilled)) {
            Mino.clearRow(i);
            Mino.downShiftStatics();
            speedTracker += 1;
            rowsCleared += 1; //for calculating score bonuses
            i -= 1; //accounts for multiple rows clearing 'at once.'
           
        }
    }

    if (rowsCleared === 1) {
        points += 1;
        updateScore();
        updateSpeed();
        bonusScreen.innerHTML = '<div>+1</div>';
        bonusScreen.style.display = 'flex';
        setTimeout( ()=> {
            bonusScreen.style.display = 'none';
        }, 1300)
    }
    if (rowsCleared === 2) {
        points += 4 ;//includes bonus
        updateScore();
        updateSpeed();
        bonusScreen.innerHTML = '<div>+4!</div>';
        bonusScreen.style.display = 'flex';
        setTimeout( ()=> {
            bonusScreen.style.display = 'none';
        }, 1300)
    }
    if (rowsCleared === 3) {
        points += 8 ;//includes bonus
        updateScore();
        bonusScreen.innerHTML = '<div>+8!</div>';
        bonusScreen.style.display = 'flex';
        setTimeout( ()=> {
            bonusScreen.style.display = 'none';
        }, 1300)
    }
    if (rowsCleared === 4) {
        points += 14 ;//includes bonus
        updateScore();
        updateSpeed();
        bonusScreen.innerHTML = '<div>TETRIS!</div><div>+14!</div>';
        bonusScreen.style.display = 'flex';
        setTimeout( ()=> {
            bonusScreen.style.display = 'none';
        }, 1300)
    }
}

function isGameOver() {
    let i;
    for (i=0;i<grid.ArrayOfVisibleRows[14].length;i++) {
        if (grid.ArrayOfVisibleRows[16][i].className === 'static') {
            console.log('GAME OVER');
            return true;
        }
    }
    return false;
}


//EVENT HANDLERS
function leftEventHandler(e) {
    if (e.keyCode == 37 && !Mino.isLeftBlocked) {
        Mino.moveLeft();
    }
}

function rightEventHandler(e) {
    if (e.keyCode == 39 && !Mino.isRightBlocked) {
        Mino.moveRight();
    }
}

function downEventHandler(e) {
    if (e.keyCode == 40 && !Mino.isDownBlocked) {
        Mino.lower();
    }
}

function rotateEventHandler(e) {
    if (e.keyCode == 38) {
        Mino.rotate();
    }
}

function slamEventHandler(e) {
    if (e.keyCode == 32) {
        Mino.slam();
    }
}





//Useful methods
//document.createElement
//document.getElementById('parent').appendChild(childelement)


//TESTING SECTIONS

// function testStatic() {
//     grid.divArray.forEach(e => {
//         if (e.column >= grid.leftedge && e.row >= grid.floor && e.row < 4 && e.column < 12) {
//             e.className = 'static';
//         }
//     })
// }


//OPERATE ONCE
// Mino.generate();
// Mino.lower();
// console.log(Mino.actives);
// Mino.actives.forEach( e => console.log(e.tracker));
// console.log(Mino.actives.sort((a,b) => a.tracker - b.tracker))



// OPERATE FALL
// testStatic();
// Mino.generate();
// setInterval(fall, 350);


//increasing speed



//NOTES
//FUNCTION FOR GRABBING ARRAY OF ACTIVE SQUARES
// the reason i am making an identical array is so that there is an array with value types, not reference
// creates an identical array, but of value types (not reference)
// technically array is not an array, its only array-like, so i cannot use .map on it.


// function getArrayOfActiveSquares() {
//     let array = [];
//     const arrayLikeObject = document.getElementsByClassName('active');
//     let i;
//     for (i=0;i<arrayLikeObject.length;i++) {
//         array.push(arrayLikeObject[i]);
//     }
//     return array;
// }


// function generateZ1Tetrimino() {
//     z1Tetrimino.forEach( e => {e.className = 'active'});
//     // assignTracker(z1Tetrimino);
//     shapeOrientation = 'z1';
// }

// function generateZ2Tetrimino() {
//     z2Tetrimino.forEach( e => {e.className = 'active'});
//     // assignTracker(z2Tetrimino);
//     shapeOrientation = 'z2';
// }

// function generateTTetrimino() {
//     tTetrimino.forEach( e => {e.className = 'active'});
//     shapeOrientation = 't1';
// }

// function generateITetrimino() {
//     iTetrimino.forEach( e => {e.className = 'active'});
//     shapeOrientation = 'i1';
// }

// function generateSTetrimino() {
//     sTetrimino.forEach( e => {e.className = 'active'});
//     shapeOrientation = 's1';
// }

// function generateLTetrimino() {
//     lTetrimino.forEach( e => {e.className = 'active'});
//     shapeOrientation = 'l1';
// }

// function generateJTetrimino() {
//     jTetrimino.forEach( e => {e.className = 'active'});
//     shapeOrientation = 'j1';
// }


// console.log(getStatics());

// function testLeftTest(nextArray) {
//     let testArray = []
//     nextArray.forEach(e => {
//         testArray.push(window[e.idleft]);
//     })
//     console.log(testArray);
// }

// generateTTetrimino();
// generateLTetrimino();
// Mino.rotate();
// testStatic();
// testLeftTest(lTetrimino);
// generateITetrimino();
// generateJTetrimino();

//why does ROTATE BACK FAIL?

//STATIC Z1
// generateZ1Tetrimino();
// Mino.lower();
// Mino.moveRight();
// Mino.moveLeft();
// Mino.moveLeft();
// Mino.moveRight();
// Mino.moveRight();
// Mino.moveRight();
// Mino.lower();

// Mino.rotate();
// Mino.rotate(); 
// console.log('actives alphabetically', Mino.actives);
// console.log('current orientation', shapeOrientation)
// Mino.actives.forEach( e => console.log(e.tracker));
// console.log('sorted by ascending trackers', Mino.actives.sort((a,b) => a.tracker - b.tracker));

//STATIC Z2
// generateZ2Tetrimino();
// Mino.rotate();
// Mino.rotate();
// Mino.rotate();
// Mino.rotate();
// console.log('actives alphabetically', Mino.actives);
// console.log('current orientation', shapeOrientation)
// Mino.actives.forEach( e => console.log(e.tracker));
// console.log('sorted by ascending trackers', Mino.actives.sort((a,b) => a.tracker - b.tracker));

// FALLING Z2
// generateZ2Tetrimino();
// setInterval(fallingZ, 1000);


//STATIC T Tetrimino - WORKS
// generateTTetrimino();
// console.log('orientation', shapeOrientation)



// Mino.rotate(); //t2
// console.log('orientation', shapeOrientation)
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate(); //t3
// console.log('orientation', shapeOrientation)
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate(); //t4
// console.log('orientation', shapeOrientation)
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate(); //t1
// console.log('orientation', shapeOrientation)
// console.log('actives alphabetically', Mino.actives);

//FALLING T1 - WORKS
// generateTTetrimino();
// setInterval(fallingT, 1000);


// STATIC I Tetrimino - WORKS
// generateITetrimino();
// console.log('orientation', shapeOrientation)
// Mino.rotate();
// console.log('orientation', shapeOrientation)
// Mino.rotate();
// console.log('orientation', shapeOrientation)

// FALLING I1 - WORKS
// generateITetrimino();
// setInterval(fallingI, 1000);



// STATIC S Tetrimino - Works
// generateSTetrimino();
// console.log('orientation', shapeOrientation)
// Mino.rotate();
// console.log('orientation', shapeOrientation);
// Mino.rotate();
// console.log('orientation', shapeOrientation);
// Mino.rotate();
// console.log('orientation', shapeOrientation);
// Mino.rotate();
// console.log('orientation', shapeOrientation);

// FALLING S1 - Works
// generateSTetrimino();
// setInterval(fallingS, 1000);

// STATIC L Tetrimino - WORKS
// generateLTetrimino(); 
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate(); //l2
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate(); //l3
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate(); //l4
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate();  //l1
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);


// FALLING L1 - Works
// generateLTetrimino();
// setInterval(fallingL, 1000);

//STATIC J - WORKS
// generateJTetrimino();
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate();
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate();
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate();
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);
// Mino.rotate();
// console.log('orientation', shapeOrientation);
// console.log('actives alphabetically', Mino.actives);

// FALLING J1 - WORKS
// generateJTetrimino();
// setInterval(fallingJ, 1000);






//TEST SHAPES

// function fallingZ() {
//     if (!Mino.isDownBlocked) {
//         Mino.rotate();
//         Mino.lower();
//     } else {
//     Mino.makeStatic(); //freeze block in place
//     generateZ2Tetrimino();
//     }
// }

// function fallingT() {
//     if (!Mino.isDownBlocked) {
//         Mino.rotate();
//         Mino.lower();
//     } else {
//     console.log('blocked?', Mino.isDownBlocked);
//     Mino.makeStatic(); //freeze block in place
//     generateTTetrimino();
//     }
// }

// function fallingI() {
//     if (!Mino.isDownBlocked) {
//         Mino.rotate();
//         Mino.lower();
//     } else {
//     console.log('blocked?', Mino.isDownBlocked);
//     Mino.makeStatic(); //freeze block in place
//     generateITetrimino();
//     }
// }

// function fallingS() {
//     if (!Mino.isDownBlocked) {
//         Mino.rotate();
//         Mino.lower();
//     } else {
//     console.log('blocked?', Mino.isDownBlocked);
//     Mino.makeStatic(); //freeze block in place
//     generateSTetrimino();
//     }
// }

// function fallingL() {
//     if (!Mino.isDownBlocked) {
//         Mino.rotate();
//         Mino.lower();
//     } else {
//     console.log('blocked?', Mino.isDownBlocked);
//     Mino.makeStatic(); //freeze block in place
//     generateLTetrimino();
//     }
// }


// function fallingJ() {
//     if (!Mino.isDownBlocked) {
//         Mino.rotate();
//         Mino.lower();
//     } else {
//     console.log('blocked?', Mino.isDownBlocked);
//     Mino.makeStatic(); //freeze block in place
//     generateJTetrimino();
//     }
// }