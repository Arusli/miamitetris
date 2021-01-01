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
        // assignTracker(arrayOfTetriminos[num]); //creates tracker property for each square at time of generation. THIS USES OUTSIDE FUNCTION.
        tetrimino.forEach(e => e.className = 'active');
        
        console.log(shapeOrientation);
    }
    
     //lowerPieces()
    lower() {
        const array = this.actives
        let i;
        for(i=0;i<array.length;i++) {
            // document.getElementById(`r${newRowNum}c${array[i].column}`).tracker = array[i].tracker;    //adjustPropertiesDown()
            array[i].setAttribute('class','blank');
            // delete array[i].tracke
        }
        for(i=0;i<array.length;i++) {
            let newRowNum = array[i].row - 1;
            document.getElementById(`r${newRowNum}c${array[i].column}`).setAttribute('class','active');   //adjustClassesDown()
        }
    }

    //move left
    moveLeft() {
            const array = this.actives;
            let i;
            for(i=0;i<array.length;i++) {
                array[i].setAttribute('class','blank');
            }
            for(i=0;i<array.length;i++) {
                let newColumnNum = array[i].column - 1;
                document.getElementById(`r${array[i].row}c${newColumnNum}`).setAttribute('class','active');   //adjustClasses
            }  
    }

    //move right
    moveRight() {
            const array = this.actives;
            let i;
            for(i=0;i<array.length;i++) {
                array[i].setAttribute('class','blank');
            }
            for(i=0;i<array.length;i++) {
                let newColumnNum = array[i].column + 1;
                document.getElementById(`r${array[i].row}c${newColumnNum}`).setAttribute('class','active');  //adjustClasses
            }
            console.log(array);
            console.log(this.actives);
        }

    //pathBlocked()
    get isBlocked() {
        const path = this.actives.map((e) => document.getElementById(`${e.idbelow}`))
        // console.log(path);
        let j;
        for (j=0;j<this.actives.length;j++) {
            if (path[j].className === 'static' || path[j].row < 2) {
                return true;
                break;
            }
        }
        return false;
    }

    //rightBlocked - NEED TO ASSIGN idright PROPERTY! (and idleft property too)

    get isRightBlocked() {
        const path = this.actives.map((e) => document.getElementById(`${e.idright}`))
        // console.log(path);
        let j;
        for (j=0;j<this.actives.length;j++) {
            if (path[j].className === 'static' || path[j].column > 10) {
                return true;
                break;
            }
        }
        return false;
    }

    get isLeftBlocked() {
        const path = this.actives.map((e) => document.getElementById(`${e.idleft}`))
        // console.log(path);
        let j;
        for (j=0;j<this.actives.length;j++) {
            if (path[j].className === 'static' || path[j].column < 1) {
                return true;
                break;
            }
        }
        return false;
    }

    // get isDownRotateBlocked() {
    //     let blocked = false;
    //     array.forEach( e => {
    //         if (window[e].className === 'static' || window[e].row < 2) {
    //             blocked = true;
    //         }
    //     })
    //     return blocked;
    // }

    // get isRightRotateBlocked() {

    // }

    // get isLeftRotateBlocked() {
        
    // }

    //makeStatic()
    makeStatic() {
        this.actives.forEach( element => element.setAttribute('class', 'static'))
    }

   
    //assign Tracker - THIS ONE IS HARD BECAUSE IT USES SO MANY OUTSIDE VARIABLES
    
  

    //move down

    //isRightBound

    //isLeftBound

    //isTopBound (game over)

    //Rotate
    rotate() {

        const _this = this;  // for referencing the Termino object inside of the inner functions.

        function isDownRotateBlocked(array) {
            let j;
            for (j=0;j<array.length;j++) {
                if (array[j].className === 'static' || array[j].row < 2) {
                    return true;
                    break;
                }
            }
            return false;
        };

        function isRightRotateBlocked(array) {
            let j;
            for (j=0;j<array.length;j++) {
                if (array[j].className === 'static' || array[j].column > 10) {
                    return true;
                    break;
                }
            }
            return false;
        }

        function isLeftRotateBlocked(array) {
            let j;
            for (j=0;j<array.length;j++) {
                if (array[j].className === 'static' || array[j].column < 1) {
                    return true;
                    break;
                }
            }
            return false;
        }

        function shift(array) { //the array will be an array of id strings: newPositionIds
            //check all directions that an array could shift and if that shift will not cause a rotate block, shift it.
            let shiftUpArray = [];
            array.forEach( e => {
                shiftup.push(window[e].row + 1) //now we have an array testing space above
            })
            if (!isDownRotateBlocked(shiftUpArray)) {}
        } 


        function isRotateBlocked(array) {
            if (isDownRotateBlocked(array) || isRightRotateBlocked(array) || isLeftRotateBlocked(array)) {
                return true;
            }
            return false;
        }


        function reassign(currentArr, newArr) {
            currentArr.forEach( e => {
                e.className = 'blank'; 
            })
            newArr.forEach(e => {
                e.className = 'active';
            })
        }

        //this function needs to, if blocked, rotate the piece first, then shift it appropriately.
        //I may need to create an extra invisible column on left and 2 invisibles on the right? maybe not. need special scenario for the iTetrimino only.
        function handleRotation(currentArray, newPosition) {
        if (isDownRotateBlocked(currentArray)) {
            let shiftUpArray = [];
            currentArray.forEach( e => {
            shiftUpArray.push(`r${e.row + 1}c${e.column}`) //array of next ids, for using to reassing classes via window[id].class =
            //What do I do with this shiftUpArray now?
            currentArray.forEach( e => {
                e.className = 'blank';  //WE STILL NEED TO ROTATE THE PIECE. CAN WE PERMANENTLY ASSIGN 'THIS' TO THE OUTSIDE OBJECT?
            })
            shiftUpArray.forEach(e => {
                window[e].className = 'active';
            })
            
            })
        } else if (isLeftRotateBlocked(currentArray)) {
            let shiftRightArray = [];
            currentArray.forEach( e => {
            shiftRightArray.push(e.column + 1)    
            })
        } else if (isRightRotateBlocked(currentArray)) {
            //special scenario for the i Tetrimino
            let shiftLeftArray = [];
            currentArray.forEach( e => {
            shiftLeftArray.push(e.column - 1) //or - 2
            })
        } else {
            //move class assignments to newPosition, remove class assignments from current
            reassign(currentArray, newPosition);
        }
    }
        

        if (shapeOrientation === 'z1') {
            let currentArray = this.actives;
            let newPositionArray = []; //these are ids not objects. MAKE THEM OBJECTS BELOW SO THEY CAN EASILY FIT INTO HANDLEROTATION()
        
            newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column + 1}`]) 
            newPositionArray.push(window[`r${currentArray[1].row + 2}c${currentArray[1].column}`]) 
            newPositionArray.push(window[`r${currentArray[2].row - 1}c${currentArray[2].column + 1}`]) 
            newPositionArray.push(window[currentArray[3].id]);

            console.log('z1 to z2', newPositionArray); //check if these are left right or down bound?
    
            //then use window[newPosition[0]] to adjust properties and classes.

            if (!isRotateBlocked(newPositionArray)) {
                reassign(currentArray, newPositionArray);
                // let i;
                // for (i=0;i<newPositionIds.length;i++) {  //might want to extract this function into a self contained function, perhaps reassign();
                //     orderedArray[i].className = 'blank';
                // }
                // for (i=0;i<newPositionIds.length;i++) {
                //     window[newPositionIds[i]].className = 'active';
                // }
                shapeOrientation = 'z2'; 
            }
               
        } else if (shapeOrientation === 'z2') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[1].column - 1}`]) 
        newPositionArray.push(window[`r${currentArray[2].row - 1}c${currentArray[2].column - 1}`]) 
        newPositionArray.push(window[`r${currentArray[3].row - 2}c${currentArray[3].column}`]) 
        console.log('z2 to z1', newPositionArray);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'z1'; 
        } 
    } else if (shapeOrientation === 't1') {
            let currentArray = this.actives;
            let newPositionArray = [];
            newPositionArray.push(window[`r${currentArray[0].row - 1}c${currentArray[0].column + 1}`]);
            newPositionArray.push(window[currentArray[1].id]);
            newPositionArray.push(window[currentArray[2].id]);
            newPositionArray.push(window[currentArray[3].id]);
            
            if (!isRotateBlocked(newPositionArray)) {
                reassign(currentArray, newPositionArray);
                shapeOrientation = 't2'; 
            }    
        } else if (shapeOrientation === 't2') {
        let currentArray = this.actives
        let newPositionArray = [];
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[currentArray[0].id]);
        newPositionArray.push(window[`r${currentArray[3].row - 1}c${currentArray[3].column - 1}`]); 
        
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 't3'; 
        }   
    } else if (shapeOrientation === 't3') {
        let currentArray = this.actives
        let newPositionArray = [];
        newPositionArray.push(window[currentArray[0].id]);
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[`r${currentArray[3].row + 1}c${currentArray[3].column - 1}`]); 
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 't4'; 
        } 
    } else if (shapeOrientation === 't4') {
        let currentArray = this.actives
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[3].column + 1}`]); 
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[currentArray[3].id]);
   
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 't1'; 
        } 
    } else if (shapeOrientation === 'i1') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row - 1}c${currentArray[0].column + 1}`]);
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[`r${currentArray[2].row + 1}c${currentArray[2].column - 1}`]);
        newPositionArray.push(window[`r${currentArray[3].row + 2}c${currentArray[3].column - 2}`]);

        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'i2'; 
        }       
    } else if (shapeOrientation === 'i2') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column - 1}`]);
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[`r${currentArray[2].row - 1}c${currentArray[2].column + 1}`]);
        newPositionArray.push(window[`r${currentArray[3].row - 2}c${currentArray[3].column + 2}`]);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'i1'; 
        }
    } else if (shapeOrientation === 's1') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 2}c${currentArray[0].column}`]);
        newPositionArray.push(window[`r${currentArray[1].row + 1}c${currentArray[1].column - 1}`]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[`r${currentArray[3].row - 1}c${currentArray[3].column - 1}`]);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 's2'; 
        }    
    } else if (shapeOrientation === 's2') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column + 1}`]);
        newPositionArray.push(window[`r${currentArray[1].row - 1}c${currentArray[1].column + 1}`]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[`r${currentArray[3].row - 2}c${currentArray[3].column}`]);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 's1'; 
        }
    } else if (shapeOrientation === 'l1') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column + 1}`]);
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[`r${currentArray[2].row - 1}c${currentArray[2].column - 1}`]);
        newPositionArray.push(window[`r${currentArray[3].row - 2}c${currentArray[3].column}`]);

        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'l2'; 
        }
           
    } else if (shapeOrientation === 'l2') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column - 1}`]);
        newPositionArray.push(window[`r${currentArray[1].row}c${currentArray[1].column - 2}`]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[`r${currentArray[3].row - 1}c${currentArray[3].column + 1}`]);

        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'l3';
        }
        
    } else if (shapeOrientation === 'l3') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 2}c${currentArray[0].column}`]);
        newPositionArray.push(window[`r${currentArray[1].row + 1}c${currentArray[1].column + 1}`]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[`r${currentArray[3].row - 1}c${currentArray[3].column - 1}`]);
        
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'l4';
        }
    } else if (shapeOrientation === 'l4') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column - 1}`]);
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[`r${currentArray[2].row}c${currentArray[2].column + 2}`]);
        newPositionArray.push(window[`r${currentArray[3].row - 1}c${currentArray[3].column + 1}`]);
        
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'l1';
        }
    } else if (shapeOrientation === 'j1') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column + 1}`]);
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[`r${currentArray[2].row - 1}c${currentArray[2].column - 1}`]);
        newPositionArray.push(window[`r${currentArray[3].row}c${currentArray[3].column + 2}`]);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'j2'; 
        }   
    } else if (shapeOrientation === 'j2') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 1}c${currentArray[0].column - 1}`]);
        newPositionArray.push(window[currentArray[1].id]);
        newPositionArray.push(window[`r${currentArray[2].row - 1}c${currentArray[2].column + 1}`]);
        newPositionArray.push(window[`r${currentArray[3].row - 2}c${currentArray[3].column}`]);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'j3'; 
        }
    } else if (shapeOrientation === 'j3') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row}c${currentArray[0].column - 2}`]);
        newPositionArray.push(window[`r${currentArray[1].row + 1}c${currentArray[1].column + 1}`]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[`r${currentArray[3].row - 1}c${currentArray[3].column - 1}`]);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'j4'; 
        }
    } else if (shapeOrientation === 'j4') {
        let currentArray = this.actives;
        let newPositionArray = [];
        newPositionArray.push(window[`r${currentArray[0].row + 2}c${currentArray[0].column}`]);
        newPositionArray.push(window[`r${currentArray[1].row + 1}c${currentArray[1].column - 1}`]);
        newPositionArray.push(window[currentArray[2].id]);
        newPositionArray.push(window[`r${currentArray[3].row - 1}c${currentArray[3].column + 1}`]);
        if (!isRotateBlocked(newPositionArray)) {
            reassign(currentArray, newPositionArray);
            shapeOrientation = 'j1'; 
        }
    }
} //end rotate()  
} //end of class




let Mino = new Tetrimino();




//EVENT LISTENERS

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
    if (e.keyCode == 40 && !Mino.isBlocked) {
        Mino.lower();
    }
}

function rotateEventHandler(e) {
    if (e.keyCode == 38) {
        Mino.rotate();
    }
}

document.addEventListener('keydown', leftEventHandler);
document.addEventListener('keydown', rightEventHandler);
document.addEventListener('keydown', downEventHandler);
document.addEventListener('keydown', rotateEventHandler);





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
// let r1c1 = document.getElementById('r1c1');
// let r1c2 = document.getElementById('r2c1');
// const testTetrimino = [r2c1, r2c2];  //adjustable

//SHAPES
//next need to set these initial shapes
//nearly all games start the shape in one default position, not randomized
//sometimes the shape spawns fully on screen and cannot rotate if it will cause shape to move off screen, othertimes
//othertimes the shape comes from off screen and is not caged by the top. I prefer this, I think.
const lTetrimino = [r14c4, r14c5, r14c6, r15c6];
const jTetrimino = [r14c4, r14c5, r14c6, r15c4];
const sqTetrimino = [r14c5, r14c6, r15c5, r15c6]; //square shape
const iTetrimino = [r14c4, r14c5, r14c6, r14c7];
const tTetrimino = [r14c4, r14c5, r14c6, r15c5];
const z1Tetrimino = [r14c5, r14c6, r15c4, r15c5];
const z2Tetrimino = [r14c8, r15c8, r15c9, r16c9]; //testing only
const sTetrimino = [r14c4, r14c5, r15c5, r15c6];
const arrayOfTetriminos = [lTetrimino, jTetrimino, sqTetrimino, iTetrimino, tTetrimino, z1Tetrimino, sTetrimino];
const arrayOfShapeOrientations = ['l1', 'j1', 'sq1', 'i1', 't1', 'z1', 's1'];
let shapeOrientation;

//TEST TO CHECK IDBELOW PROPERTY
// console.log(r14c4.idbelow, r14c4.idright, r14c4.idleft);

//need to assign each square in the tetrimino. there are four in each shape, 
// if we arrange the tetrimino arrays formulaicly (right to left, top to bottom) maybe we can assign universal property name for each of the four squares in every tetrimino.
function assignTracker(array) {
    let i;
   for (i=0;i<array.length;i++) {
       array[i].tracker = i + 1;
   }

   if (shapeOrientation === 'l1' || shapeOrientation === 'j1' || shapeOrientation === 'sq1' || shapeOrientation === 't1') {
       r14c5.tracker = '0';    
   }

   if (shapeOrientation === 'i1') {
       r15c5.tracker = '0';
   }

   if (shapeOrientation === 'z1' || shapeOrientation === 's1') {
       r15c5.tracker = '0';
   }

   //testing z2
   if (shapeOrientation === 'z2') {
       r15c5.tracker = '0';
   }
}

//TEST assignTracker
// assignTracker(lTetrimino);
// console.log(lTetrimino[0].tracker)
//




//ROTATE
//individual functions to rotate each l,s,i,t,z
//there are up to 4 states per shape: l1234, sq1, i12, t1234, z1234
//needs a global var that holds the tetrimino shape/state, which then determins rotation type.
// let tetriminoShape = 'l'
// let shapeOrientation = 'l1'; //should be assigned by generateTetrimino each loop

//NOTES
//la lb t z s = rotate around stationary core
//i s = have no stationary core, but they COULD if i wanted/it was helpful
//some games allow shape to rotate/push off a boundary/wall, but other games don't.
//i need to assign a core tracker to each shape.

// function rotateZ() {
//     //there are 4 states: l1, la2, la3, la4

//     let activeTetrimino = getArrayOfActiveSquares(); //I SHOULD MAKE A TETRIMINO OBJECT THAT CONTAINS FUNCTIONS AND GETS/SETS THE ARRAYOFACTIVESQUARES!
//     let newTetrimino = [];

//     if (shapeOrientation === 'z1') {
//         //select elements with class active. they should already have inherited the square tracker property. - done
//         //move element with tracker 1 to new element. aka identify new element and style/assign new element.
//             //identify new element.
//             //1 goes right 1 space, up 1 space. 2 goes up 2 spaces. 3 goes down 1 space, right 1 space.
//             //fill new tetrimino with coordinates of id's of new spaces, then select elements by those new ids, and style/assign.
//         activeTetrimino.forEach( e => {
//             //should use 0 instead of core for core tracker because then i can order the array numerically.
//             newTetrimino.push(activeTetrimino[0].id); //core
//             newTetrimino.push(`r${activeTetrimino[1].row + 1}c${activeTetrimino[1].column + 1}`) //tracker 1
//             //tracker 2
//             //tracker 3

//             //then use window[newTetrimino[0]] to adjust properties and classes.
//         })
//         //restyle and reassign new element. 
//         //unstyle unassign old element.
//         //repeat for each element (trackers 2, 3, and 4)
//     }

//     if (shapeOrientation === 'z2') {

//     }
// }

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



// function generateTetrimino() {
//     const num = Math.floor(Math.random() * Math.floor(7)); //generates random number from zero to max, excluding max
//     const tetrimino = arrayOfTetriminos[num]; 
//     shapeOrientation = arrayOfShapeOrientations[num];
//     assignTracker(arrayOfTetriminos[num]); //creates tracker property for each square at time of generation
//     tetrimino.forEach(e => e.className = 'active');
    
//     console.log(shapeOrientation);
// }

function generateZ1Tetrimino() {
    z1Tetrimino.forEach( e => {e.className = 'active'});
    // assignTracker(z1Tetrimino);
    shapeOrientation = 'z1';
}

function generateZ2Tetrimino() {
    z2Tetrimino.forEach( e => {e.className = 'active'});
    // assignTracker(z2Tetrimino);
    shapeOrientation = 'z2';
}

function generateTTetrimino() {
    tTetrimino.forEach( e => {e.className = 'active'});
    shapeOrientation = 't1';
}

function generateITetrimino() {
    iTetrimino.forEach( e => {e.className = 'active'});
    shapeOrientation = 'i1';
}

function generateSTetrimino() {
    sTetrimino.forEach( e => {e.className = 'active'});
    shapeOrientation = 's1';
}

function generateLTetrimino() {
    lTetrimino.forEach( e => {e.className = 'active'});
    shapeOrientation = 'l1';
}

function generateJTetrimino() {
    jTetrimino.forEach( e => {e.className = 'active'});
    shapeOrientation = 'j1';
}

// function pathBlocked() {
//     const path = Mino.actives.map((e) => document.getElementById(`${e.idbelow}`))
//     let j;
//     for (j=0;j<Mino.actives.length;j++) {
//         if (path[j].className === 'static' || path[j].row < 2) {
//             return true;
//             break;
//         }
//     }
//     return false;
// }

// function makeStatic() {
//     Mino.actives.forEach( element => element.setAttribute('class', 'static'))
// }


// function lowerPieces() {
//     let array = getArrayOfActiveSquares()
//     let i;
//     for(i=0;i<array.length;i++) {
//         let newRowNum = array[i].row - 1;
//         document.getElementById(`r${newRowNum}c${array[i].column}`).setAttribute('class','active');   //adjustClassesDown()
//         document.getElementById(`r${newRowNum}c${array[i].column}`).tracker = array[i].tracker;    //adjustPropertiesDown()
//         array[i].setAttribute('class','blank');
//         delete array[i].tracker;
//     }
// }

// function moveRight() {
//     //adjustPropertiesRight()
//     //adjustClassesRight()
// }

// function moveLeft() {
//     //adjustPropertiesLeft()
//     //adjustClassesLeft()
// }

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
        // Mino.rotate();
        // Mino.rotateZ();
        // lowerPieces();

        // console.log(tetrimino[0].row, tetrimino[0].column, tetrimino[0].id, tetrimino[0].className);
    } else {
        Mino.makeStatic(); //freeze block in place
        Mino.generate();
        // generateTetrimino(); //starts new tetrimino at top
    }   
}



function fallingZ() {
    if (!Mino.isBlocked) {
        Mino.rotate();
        Mino.lower();
    } else {
    Mino.makeStatic(); //freeze block in place
    generateZ2Tetrimino();
    }
}

function fallingT() {
    if (!Mino.isBlocked) {
        Mino.rotate();
        Mino.lower();
    } else {
    console.log('blocked?', Mino.isBlocked);
    Mino.makeStatic(); //freeze block in place
    generateTTetrimino();
    }
}

function fallingI() {
    if (!Mino.isBlocked) {
        Mino.rotate();
        Mino.lower();
    } else {
    console.log('blocked?', Mino.isBlocked);
    Mino.makeStatic(); //freeze block in place
    generateITetrimino();
    }
}

function fallingS() {
    if (!Mino.isBlocked) {
        Mino.rotate();
        Mino.lower();
    } else {
    console.log('blocked?', Mino.isBlocked);
    Mino.makeStatic(); //freeze block in place
    generateSTetrimino();
    }
}

function fallingL() {
    if (!Mino.isBlocked) {
        Mino.rotate();
        Mino.lower();
    } else {
    console.log('blocked?', Mino.isBlocked);
    Mino.makeStatic(); //freeze block in place
    generateLTetrimino();
    }
}


function fallingJ() {
    if (!Mino.isBlocked) {
        Mino.rotate();
        Mino.lower();
    } else {
    console.log('blocked?', Mino.isBlocked);
    Mino.makeStatic(); //freeze block in place
    generateJTetrimino();
    }
}

//OPERATE ONCE
// Mino.generate();
// Mino.lower();
// console.log(Mino.actives);
// Mino.actives.forEach( e => console.log(e.tracker));
// console.log(Mino.actives.sort((a,b) => a.tracker - b.tracker));

// OPERATE FALL
Mino.generate();
setInterval(fall, 1000);


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

