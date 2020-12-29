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

let divArray = [];
let rowcount = 1; //initial row value
let columncount = 1; //initial column value
let maxRows = 16; //safe to adjust
let maxColumns= 10;
const tile = 40; //determines grid unit size
let bottom = 0;
let left = 0;



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
    console.log(bottomRow);
    bottomRow.forEach(e => e.style.visibility = 'hidden');
}

createGrid();
hideBottomRow();

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

let r13c4 = document.getElementById('r13c4');
let r13c5 = document.getElementById('r13c5');
let r13c6 = document.getElementById('r13c6');
let r13c7 = document.getElementById('r13c7');

//TEST BLOCKAGE
// r13c4.className = 'static-square';
// r13c5.className = 'static-square';
// r13c6.className = 'static-square';
// r13c7.className = 'static-square';


//TEST TETRIMINO
let r1c1 = document.getElementById('r1c1');
let r1c2 = document.getElementById('r2c1');
const testTetrimino = [r2c1, r2c2];  //adjustable

const lTetrimino = [r14c4, r14c5, r14c6, r15c6];
const sTetrimino = [r14c5, r14c6, r15c5, r15c6]; //square
const iTetrimino = [r14c4, r14c5, r14c6, r14c7];
const tTetrimino = [r14c4, r14c5, r14c6, r15c5];
const zTetrimino = [r14c5, r14c6, r15c4, r15c5];
const arrayOfTetriminos = [lTetrimino, sTetrimino, iTetrimino, tTetrimino, zTetrimino];


//TEST TO CHECK IDBELOW PROPERTY
// console.log(r14c4.idbelow, r14c4.idright, r14c4.idleft);


//generates random number from zero to max, excluding max
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function generateTetrimino() {
    const random = getRandomInt(5); 
    const array = arrayOfTetriminos[random];
    let i;
    for (i=0;i<array.length;i++) {
        array[i].className = 'filled-square';
    }
}

function generateTestTetrimino(array) {
    array.forEach( e => {e.className = 'filled-square'})
}






//function to check if pathblocked
function pathBlocked(array) {

    const path = array.map((e) => document.getElementById(`${e.idbelow}`)) //!! What happens if array is at row 0? then there are now elements beneath...
    console.log(path); //test
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


//PATH TESTING
// generateTestTetrimino(testTetrimino);
// console.log('is array?', Array.isArray(testTetrimino));
// console.log(testTetrimino[0].row, testTetrimino[0].idbelow);
// console.log('blocked?', pathBlocked(testTetrimino)); 


//individual functions to rotate each l,s,i,t,z


//Write a function that moves all filled-square class divs down one square on an interval.
function fall() {

    // the reason i am making an identical array is so that there is an array with value types, not reference

    let tetrimino = [];
    const array = document.getElementsByClassName('filled-square'); 
   
   
//    creates an identical array, but of value types (not reference)
   // technically array is not an array, its only array-like, so i cannot use .map on it.
    let j;
    for (j=0;j<array.length;j++) {
        tetrimino.push(array[j]);
    }
    // console.log(tetrimino);
    // console.log(tetrimino[0].row, tetrimino[0].column, tetrimino[0].id, tetrimino[0].className);
    
    //need an if statement that checks that function pathClear (vs pathBlocked) evalutes to true
    //placeholder:


    if (pathBlocked(tetrimino) == false) {
        let i;
        for(i=0;i<tetrimino.length;i++) {
            let newRowNum = tetrimino[i].row - 1;
            // console.log(tetrimino[i].className);
            document.getElementById(`r${newRowNum}c${tetrimino[i].column}`).setAttribute('class','filled-square');
            tetrimino[i].setAttribute('class','blank-square');
            // console.log(tetrimino[i].className);
            // console.log('loop complete');
        }
        // console.log(tetrimino[0].row, tetrimino[0].column, tetrimino[0].id, tetrimino[0].className);
    } else {
        makeStatic(tetrimino);
        generateTetrimino();
    }
    //
    
}


//OPERATE
// generateTestTetrimino(testTetrimino);
// setInterval(fall, 500);
























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

