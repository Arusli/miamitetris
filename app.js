//Useful methods
//document.createElement
//document.getElementById('parent').appendChild(childelement)


//GRID STYLE (WHAT IM DOING) VS OBJECT STYLE
//Grid Style: Reassigns divs in the grid to create the illusion of one falling tetrimino.
//Object Style: Generates a true tetrimino out of 4 divs and repositions those same divs (style.bottom, style.left) with aboslute positioning.

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


////ATTEMPTING TO CREATE TETRIMINO OBJECT TO HOUSE METHODS AND A GET/SET FOR THE ARRAY OF ACTIVE ELEMENTS (AKA THE TETRIMINO)



function createRow() {
    let i;
    for (i=0; i<10; i++) {
        //lets us keep increasing the array index for each iteration of createRow()
        let indexAdjuster = (rowcount - 1) * 10;
        let index = i + indexAdjuster;

        divArray.push(document.createElement('DIV'))
        divArray[index].setAttribute('class','blank')
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


//NOTE: we need to add 2 or 3 hidden rows at the top to allow the new shapes to generate 'off-screen'
function createGrid() {
    let k; //using k, since we used i on inside loop (createRow)
    for (k=0;k<maxRows;k++) {
        createRow(); //fills in the entire row, adjusting all necessary variables within this inner function.
        left = 0; //Now that the row is created, we reset and adjust variables for next row:
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



//CREATE TETRIMINO



class Tetrimino {
    constructor(){
        this.name = 'terminino object'
    }

     //getArrayOfActiveSquares()
    get actives() {
        let array = [];
        const arrayLikeObject = document.getElementsByClassName('active');
        let i;
        for (i=0;i<arrayLikeObject.length;i++) {
            array.push(arrayLikeObject[i]);
        }
        return array;
    }

     //generateTetriminos()
    generate() {
        const num = Math.floor(Math.random() * Math.floor(7)); //generates random number from zero to max, excluding max
        const tetrimino = arrayOfTetriminos[num]; 
        shapeOrientation = arrayOfShapeOrientations[num];
        assignTracker(arrayOfTetriminos[num]); //creates tracker property for each square at time of generation. THIS USES OUTSIDE FUNCTION.
        tetrimino.forEach(e => e.className = 'active');
        
        console.log(shapeOrientation);
    }
    
     //lowerPieces()
    lower() {
        let array = this.actives
        let i;
        for(i=0;i<array.length;i++) {
            let newRowNum = array[i].row - 1;
            document.getElementById(`r${newRowNum}c${array[i].column}`).setAttribute('class','active');   //adjustClassesDown()
            document.getElementById(`r${newRowNum}c${array[i].column}`).tracker = array[i].tracker;    //adjustPropertiesDown()
            array[i].setAttribute('class','blank');
            delete array[i].tracker;
        }
    }

    //pathBlocked()
    get isBlocked() {
        const path = Mino.actives.map((e) => document.getElementById(`${e.idbelow}`))
        // console.log(path);
        let j;
        for (j=0;j<Mino.actives.length;j++) {
            if (path[j].className === 'static' || path[j].row < 2) {
                return true;
                break;
            }
        }
        return false;
    }

    //makeStatic()
    makeStatic() {
        Mino.actives.forEach( element => element.setAttribute('class', 'static'))
    }

   
    //assign Tracker - THIS ONE IS HARD BECAUSE IT USES SO MANY OUTSIDE VARIABLES
    
    //move left
    
    //move right

}

let Mino = new Tetrimino();




/////
//placeholder:
// document.getElementById('r15c5').className = 'active';
// document.getElementById('r15c6').className = 'active';
// document.getElementById('r15c7').className = 'active';
// document.getElementById('r15c8').className = 'active';


//ASSIGNS EACH ELEMENT TO A VARIABLE THAT IS THE SAME AS THE ELEMENT ID
divArray.forEach( e => {
    window[`e.id`] = e;
})

// let r14c4 = document.getElementById('r14c4');
// let r14c5 = document.getElementById('r14c5');
// let r14c6 = document.getElementById('r14c6');
// let r14c7 = document.getElementById('r14c7');
// let r15c4 = document.getElementById('r15c4');
// let r15c5 = document.getElementById('r15c5');
// let r15c6 = document.getElementById('r15c6');
// let r15c7 = document.getElementById('r15c7');
// let r16c4 = document.getElementById('r16c4');
// let r16c5 = document.getElementById('r16c5');
// let r16c6 = document.getElementById('r16c6');
// let r16c7 = document.getElementById('r16c7');
// let r17c4 = document.getElementById('r17c4');
// let r17c5 = document.getElementById('r17c5');
// let r17c6 = document.getElementById('r17c6');
// let r17c7 = document.getElementById('r17c7');
// let r18c4 = document.getElementById('r18c4');
// let r18c5 = document.getElementById('r18c5');
// let r18c6 = document.getElementById('r18c6');
// let r18c7 = document.getElementById('r18c7');



// //TEST BLOCKAGE
// let r13c4 = document.getElementById('r13c4');
// let r13c5 = document.getElementById('r13c5');
// let r13c6 = document.getElementById('r13c6');
// let r13c7 = document.getElementById('r13c7');
// r13c4.className = 'static';
// r13c5.className = 'static';
// r13c6.className = 'static';
// r13c7.className = 'static';


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
const sTetrimino = [r14c5, r14c6, r15c5, r15c6]; //square shape
const iTetrimino = [r15c4, r15c5, r15c6, r15c7];
const tTetrimino = [r14c4, r14c5, r14c6, r15c5];
const zaTetrimino = [r14c5, r14c6, r15c4, r15c5];
const zbTetrimino = [r14c4, r14c5, r15c5, r15c6];
const arrayOfTetriminos = [laTetrimino, lbTetrimino, sTetrimino, iTetrimino, tTetrimino, zaTetrimino, zbTetrimino];
const arrayOfShapeOrientations = ['la1', 'lb1', 's1', 'i1', 't1', 'za1', 'zb1'];
let shapeOrientation = 'za1';

//TEST TO CHECK IDBELOW PROPERTY
// console.log(r14c4.idbelow, r14c4.idright, r14c4.idleft);

//need to assign each square in the tetrimino. there are four in each shape, 
// if we arrange the tetrimino arrays formulaicly (right to left, top to bottom) maybe we can assign universal property name for each of the four squares in every tetrimino.
function assignTracker(array) {
    let i;
   for (i=0;i<array.length;i++) {
       array[i].tracker = i + 1;
   }

   if (shapeOrientation === 'la1' || shapeOrientation === 'lb1' || shapeOrientation === 's1' || shapeOrientation === 't1') {
       r14c5.tracker = '0';    
   }

   if (shapeOrientation === 'i1') {
       r15c5.tracker = '0';
   }

   if (shapeOrientation === 'za1' || shapeOrientation === 'zb1') {
       r15c5.tracker = '0';
   }
}

//TEST assignTracker
// assignTracker(laTetrimino);
// console.log(laTetrimino[0].tracker)
//




//ROTATE
//individual functions to rotate each l,s,i,t,z
//there are up to 4 states per shape: l1234, s1, i12, t1234, z1234
//needs a global var that holds the tetrimino shape/state, which then determins rotation type.
// let tetriminoShape = 'l'
// let shapeOrientation = 'l1'; //should be assigned by generateTetrimino each loop

//NOTES
//la lb t za zb = rotate around stationary core
//i s = have no stationary core, but they COULD if i wanted/it was helpful
//some games allow shape to rotate/push off a boundary/wall, but other games don't.
//i need to assign a core tracker to each shape.

function rotateLa() {
    //there are 4 states: la1, la2, la3, la4

    let activeTetrimino = getArrayOfActiveSquares(); //I SHOULD MAKE A TETRIMINO OBJECT THAT CONTAINS FUNCTIONS AND GETS/SETS THE ARRAYOFACTIVESQUARES!

    if (shapeOrientation === 'za1') {
        //select elements with class active. they should already have inherited the square tracker property. - done
        //move element with tracker 1 to new element. aka identify new element and style/assign new element.
            //identify new element.
            //1 goes right 1 space, up 1 space. 2 goes up 2 spaces. 3 goes down 1 space, right 1 space.
            //fill new tetrimino with coordinates of id's of new spaces, then select elements by those new ids, and style/assign.
        activeTetrimino.forEach( e => {
            //should use 0 instead of core for core tracker because then i can order the array numerically.
            newTetrimino.push(activeTetrimino[0].id); //core
            newTetrimino.push(`r${activeTetrimino[1].row + 1}c${activeTetrimino[1].column + 1}`) //tracker 1
            //tracker 2
            //tracker 3

            //then use window[newTetrimino[0]] to adjust properties and classes.
        })
        //restyle and reassign new element. 
        //unstyle unassign old element.
        //repeat for each element (trackers 2, 3, and 4)
    }

    if (shapeOrientation === 'za2') {

    }
}

//FUNCTION FOR GRABBING ARRAY OF ACTIVE SQUARES
// the reason i am making an identical array is so that there is an array with value types, not reference
// creates an identical array, but of value types (not reference)
// technically array is not an array, its only array-like, so i cannot use .map on it.


function getArrayOfActiveSquares() {
    let array = [];
    const arrayLikeObject = document.getElementsByClassName('active');
    let i;
    for (i=0;i<arrayLikeObject.length;i++) {
        array.push(arrayLikeObject[i]);
    }
    return array;
}




function generateTetrimino() {
    const num = Math.floor(Math.random() * Math.floor(7)); //generates random number from zero to max, excluding max
    const tetrimino = arrayOfTetriminos[num]; 
    shapeOrientation = arrayOfShapeOrientations[num];
    assignTracker(arrayOfTetriminos[num]); //creates tracker property for each square at time of generation
    tetrimino.forEach(e => e.className = 'active');
    
    console.log(shapeOrientation);
}

function generateTestTetrimino(array) {
    array.forEach( e => {e.className = 'active'})
}






//function to check if pathblocked
function pathBlocked() {
    const path = Mino.actives.map((e) => document.getElementById(`${e.idbelow}`))
    // console.log(path);
    let j;
    for (j=0;j<Mino.actives.length;j++) {
        if (path[j].className === 'static' || path[j].row < 2) {
            return true;
            break;
        }
    }
    return false;
}

function makeStatic() {
    Mino.actives.forEach( element => element.setAttribute('class', 'static'))
}


//MOVEMENT
function lowerPieces() {
    let array = getArrayOfActiveSquares()
    let i;
    for(i=0;i<array.length;i++) {
        let newRowNum = array[i].row - 1;
        document.getElementById(`r${newRowNum}c${array[i].column}`).setAttribute('class','active');   //adjustClassesDown()
        document.getElementById(`r${newRowNum}c${array[i].column}`).tracker = array[i].tracker;    //adjustPropertiesDown()
        array[i].setAttribute('class','blank');
        delete array[i].tracker;
    }
}

function moveRight() {
    //adjustPropertiesRight()
    //adjustClassesRight()
}

function moveLeft() {
    //adjustPropertiesLeft()
    //adjustClassesLeft()
}

//PATH TESTING
// generateTestTetrimino(testTetrimino);
// console.log('is array?', Array.isArray(testTetrimino));
// console.log(testTetrimino[0].row, testTetrimino[0].idbelow);
// console.log('blocked?', pathBlocked(testTetrimino)); 




//Write a function that moves all active class divs down one square on an interval.
function fall() {
    // let tetrimino = Mino.actives
    // let tetrimino = getArrayOfActiveSquares();
    // console.log(tetrimino);
    // console.log(tetrimino[0].row, tetrimino[0].column, tetrimino[0].id, tetrimino[0].className);
    
    //checks that function pathClear (vs pathBlocked) evalutes to true
    if (!Mino.isBlocked) {
        Mino.lower();
        // lowerPieces();

        // console.log(tetrimino[0].row, tetrimino[0].column, tetrimino[0].id, tetrimino[0].className);
    } else {
        Mino.makeStatic(); //freeze block in place
        Mino.generate();
        // generateTetrimino(); //starts new tetrimino at top
    }   
}


// Old Code
// generateTestTetrimino(iTetrimino);
// generateTetrimino();
// lowerPieces();
// let trackerTest = Mino.actives;

//OPERATE ONCE
// Mino.generate();
// Mino.lower();
// Mino.lower();
// Mino.lower();
// console.log(Mino.actives);
// Mino.actives.forEach( e => console.log(e.tracker))

//OPERATE FALL
// generateTetrimino();

Mino.generate();
setInterval(fall, 500);


//test
// Mino.name = 'andrew'
// console.log('Mino.name', Mino.name);
















// TESTING CODE, WORKS
// const newdiv = document.createElement('DIV');
// const newdiv2 = document.createElement('DIV');
// newdiv.setAttribute('class', 'blank');
// newdiv2.setAttribute('class', 'blank');
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

