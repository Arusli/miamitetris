//document.createElement
//document.getElementById('parent').appendChild(childelement)
//

//create a function that creates the board with individual divs. Assign divs increasing
//...varaible names based on a counter? Consider.
//divs should inherit some properties from a custom prototype if I can figure out how to do it.
//probably can use new Class for this and have function call a new class and then reassign certain
//..custom properties and labels as needed. prototypical members can be inherited from outside
//...the counstructor.
//divs should have new properties of xposition, y position, row assignment, column assignment...
//...status assignment (filled or blank).
//I may need to assign id's to divs to distinguish and call them, and possibly/probably
//...also create an array of every div for iterating by property. Ex. - if (divname.property = red) {}
//I think it may be best to have 2 ids per div: x1, y10, for example...
//...Then I can select a target div without iterating the entire array of divs to find it's position.

//create a function on an interval that fills a certain starting set of blocks, 
//...reassigning their properties (color. position, status). and moves these every interval.

//create an event listener that moves and adjusts 

const board = document.getElementById('board');


let divArray = [];
let rowcount = 1; //initial row value
let columncount = 1; //initial column value
let maxRows = 18; //safe to adjust
let maxColumns= 10;
const tile = 40; //determines grid unit size
let bottom = 0;
let left = 0;

// let tetriminoShape = 'l'
let shapeOrientation = 'la1';



function createRow() {
    let i;
    for (i=0; i<10; i++) {
        //lets us keep increasing the array index for each iteration of createRow()
        let indexAdjuster = (rowcount - 1) * 10;
        let index = i + indexAdjuster;

        divArray.push(document.createElement('DIV'))
        divArray[index].setAttribute('class','blank-square')
        board.appendChild(divArray[index]); //adds to index of all divs in the grid
        divArray[index].style.bottom = `${bottom}px`; //positioning
        divArray[index].style.left = `${left}px`; //positioning
        left += tile;
        divArray[index].column = columncount; 
        columncount +=1;
        divArray[index].row = rowcount; 
        divArray[index].idabove = `r${divArray[index].row + 1}c${divArray[index].column}`
        divArray[index].idbelow = `r${divArray[index].row - 1}c${divArray[index].column}`
        divArray[index].idright = `r${divArray[index].row}c${divArray[index].column + 1}`
        divArray[index].idleft = `r${divArray[index].row}c${divArray[index].column - 1}`
        divArray[index].setAttribute('id', `r${divArray[index].row}c${divArray[index].column}`) //sets id with row1column2 format for simpler manipulation
        // console.log(divArray[index].id)
        // console.log(divArray[index].row, divArray[index].column);
        // console.log(Object.getOwnPropertyNames(divArray[index]));        
        // console.log('index:' + index);
    }
}

// createRow();
//NOTE: we need to add 2 or 3 hidden rows at the top to allow the new shapes to generate 'off-screen'
function createGrid() {
    let k; //using k, since we used i on inside loop
    for (k=0;k<maxRows;k++) {
        createRow(); //fills in the entire row, adjusting all necessary variables within this inner function.
        //Now that the row is created, we reset and adjust variables for next row:
        left = 0;
        bottom += tile;
        rowcount += 1;
        columncount = 1;
    }
}

function hideBottomRow() {
    const bottomRow = [];
    let i;
    for (i=0;i<divArray.length;i++) {
        if (divArray[i].row === 1) {
            bottomRow.push(divArray[i]);
        }
    }
    // console.log(bottomRow);
    bottomRow.forEach(e => e.style.visibility = 'hidden');
}


function hideTopTwoRows() {
    const topTwoRows = [];
    let i;
    for (i=0;i<divArray.length;i++) {
        if (divArray[i].row > 16) {
            topTwoRows.push(divArray[i]);
        }
    }
    topTwoRows.forEach(e => e.style.visibility = 'hidden');
}

createGrid();
hideBottomRow();
hideTopTwoRows();
//row 16 is the visible top, row 2 is the visible bottom.

//create tetrimino
//placeholder:
// document.getElementById('r15c5').className = 'filled-square';
// document.getElementById('r15c6').className = 'filled-square';
// document.getElementById('r15c7').className = 'filled-square';
// document.getElementById('r15c8').className = 'filled-square';

let r14c4 = document.getElementById('r14c4');
let r14c5 = document.getElementById('r14c5');
let r14c6 = document.getElementById('r14c6');
let r14c7 = document.getElementById('r14c7');
let r15c4 = document.getElementById('r15c4');
let r15c5 = document.getElementById('r15c5');
let r15c6 = document.getElementById('r15c6');
let r15c7 = document.getElementById('r15c7');
let r16c4 = document.getElementById('r16c4');
let r16c5 = document.getElementById('r16c5');
let r16c6 = document.getElementById('r16c6');
let r16c7 = document.getElementById('r16c7');
let r17c4 = document.getElementById('r17c4');
let r17c5 = document.getElementById('r17c5');
let r17c6 = document.getElementById('r17c6');
let r17c7 = document.getElementById('r17c7');
let r18c4 = document.getElementById('r18c4');
let r18c5 = document.getElementById('r18c5');
let r18c6 = document.getElementById('r18c6');
let r18c7 = document.getElementById('r18c7');



//TEST BLOCKAGE
let r13c4 = document.getElementById('r13c4');
let r13c5 = document.getElementById('r13c5');
let r13c6 = document.getElementById('r13c6');
let r13c7 = document.getElementById('r13c7');
// r13c4.className = 'static-square';
// r13c5.className = 'static-square';
// r13c6.className = 'static-square';
// r13c7.className = 'static-square';


//TEST TETRIMINO
let r1c1 = document.getElementById('r1c1');
let r1c2 = document.getElementById('r2c1');
const testTetrimino = [r2c1, r2c2];  //adjustable

//SHAPES
//next need to set these initial shapes
//nearly all games start the shape in one default position, not randomized
//sometimes the shape spawns fully on screen and cannot rotate if it will cause shape to move off screen, othertimes
//othertimes the shape comes from off screen and is not caged by the top. I prefer this, I think.
const laTetrimino = [r14c4, r14c5, r14c6, r15c6];
const lbTetrimino = [r14c4, r14c5, r14c6, r15c4];
const sTetrimino = [r14c5, r14c6, r15c5, r15c6]; //square
const iTetrimino = [r14c4, r14c5, r14c6, r14c7];
const tTetrimino = [r14c4, r14c5, r14c6, r15c5];
const zaTetrimino = [r14c5, r14c6, r15c4, r15c5];
const zbTetrimino = [r14c4, r14c5, r15c5, r15c6];
const arrayOfTetriminos = [laTetrimino, lbTetrimino, sTetrimino, iTetrimino, tTetrimino, zaTetrimino, zbTetrimino];
const arrayOfShapeOrientations = ['la1', 'lb1', 's1', 'i1', 't1', 'za1', 'zb1']

//TEST TO CHECK IDBELOW PROPERTY
// console.log(r14c4.idbelow, r14c4.idright, r14c4.idleft);

//need to assign each square in the tetrimino. there are four in each shape, 
// if we arrange the tetrimino arrays formulaicly (right to left, top to bottom) maybe we can assign universal property name for each of the four squares in every tetrimino.
function assignSquares() {

}

function rotateLa() {
    //there are 4 states: la1, la2, la3, la4
    if (shapeOrientation = 'la1') {

    }

    if (shapeOrientation = 'la2') {

    }
}


//generates random number from zero to max, excluding max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function generateTetrimino() {
    const num = getRandomInt(7); 
    const array = arrayOfTetriminos[num]; 
    let i;
    for (i=0;i<array.length;i++) {
        array[i].className = 'filled-square';
    }
    shapeOrientation = arrayOfShapeOrientations[num];
    console.log(shapeOrientation);
}

function generateTestTetrimino(array) {
    array.forEach( e => {e.className = 'filled-square'})
}






//function to check if pathblocked
function pathBlocked(array) {

    const path = array.map((e) => document.getElementById(`${e.idbelow}`)) //!! What happens if array is at row 0? then there are now elements beneath...
    // console.log(path); //test
    let j;
    for (j=0;j<array.length;j++) {
        if (path[j].className === 'static-square' || path[j].row < 2) {
            return true;
            break;
        }
    }
    return false;
}

function makeStatic(array) {
    array.forEach( element => element.setAttribute('class', 'static-square'))
}

function lowerPieces(array) {
    let i;
    for(i=0;i<array.length;i++) {
        let newRowNum = array[i].row - 1;
        // console.log(tetrimino[i].className);
        document.getElementById(`r${newRowNum}c${array[i].column}`).setAttribute('class','filled-square');
        array[i].setAttribute('class','blank-square');
        // console.log(tetrimino[i].className);
        // console.log('loop complete');
    }
}

//PATH TESTING
// generateTestTetrimino(testTetrimino);
// console.log('is array?', Array.isArray(testTetrimino));
// console.log(testTetrimino[0].row, testTetrimino[0].idbelow);
// console.log('blocked?', pathBlocked(testTetrimino)); 



//ROTATE
//individual functions to rotate each l,s,i,t,z
//there are up to 4 states per shape: l1234, s1, i12, t1234, z1234
//needs a global var that holds the tetrimino shape/state, which then determins rotation type.
// let tetriminoShape = 'l'
// let shapeOrientation = 'l1'; //should be assigned by generateTetrimino each loop










//Write a function that moves all filled-square class divs down one square on an interval.
function fall() {

    // the reason i am making an identical array is so that there is an array with value types, not reference
    let tetrimino = [];
    const array = document.getElementsByClassName('filled-square'); 
   
   
    //creates an identical array, but of value types (not reference)
   // technically array is not an array, its only array-like, so i cannot use .map on it.
    let j;
    for (j=0;j<array.length;j++) {
        tetrimino.push(array[j]);
    }
    // console.log(tetrimino);
    // console.log(tetrimino[0].row, tetrimino[0].column, tetrimino[0].id, tetrimino[0].className);
    
    //checks that function pathClear (vs pathBlocked) evalutes to true
    if (pathBlocked(tetrimino) == false) {
        lowerPieces(tetrimino);
        // console.log(tetrimino[0].row, tetrimino[0].column, tetrimino[0].id, tetrimino[0].className);
    } else {
        makeStatic(tetrimino); //freeze block in place
        generateTetrimino();
    }   
}


//OPERATE
generateTetrimino();
// generateTestTetrimino(iTetrimino);
setInterval(fall, 1000);

















// TESTING CODE, WORKS
// const newdiv = document.createElement('DIV');
// const newdiv2 = document.createElement('DIV');
// newdiv.setAttribute('class', 'blank-square');
// newdiv2.setAttribute('class', 'blank-square');
// board.appendChild(newdiv);
// board.appendChild(newdiv2);

// let xpos = 15;
// let ypos = 30;

// newdiv.xpos = xpos;
// newdiv.ypos = ypos;

// newdiv2.xpos = 20;
// newdiv2.ypos = 40;

// newdiv2.style.bottom = '40px';

// console.log(newdiv.xpos, newdiv.ypos);
// console.log(newdiv2.xpos, newdiv2.ypos);
// console.log(Object.getOwnPropertyNames(newdiv));
// newdiv.style.backgroundColor = 'black';
// console.log(newdiv.style); //QUESTION!!! where is this property hidden? cannot view it in console without directly logging it.
//






// Error: this code overwrites the cssproperties prototype

// class Template {
//     constructor(xpos, ypos) {
//         this.xpos = xpos;
//         this.ypos = ypos;
//     }
// }

// Object.setPrototypeOf(newdiv, new Template(xpos, ypos))
//





//class extension that i did
//seems pointless now
//
// class Template {
//     constructor() {
//         this.color = 'blue';
//         this.height = 40;
//         this.width = 40;
//     }
// }

// class Square extends Template {
//     constructor(xpos, ypos) {
//         super(); //enables use of this, some reason
//         this.xpos = xpos;
//         this.ypos = ypos;
//     }
// };

// let sq = new Square(0, 5);
// let te = new Template();

// // console.log(te.color);
// console.log(sq);
// console.log(sq.height);
// console.log(sq.color);
// sq.color = 'black';
// console.log(sq.color);
// console.log(te.color);

