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
board.style.backgroundColor = 'purple';

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
let maxRows = 15;
let maxColumns= 10;
const tile = 40;
let bottom = 0;
let left = 0;

//maybe i should make an array of the rows and do a forEach with initialize row function
//i think i need to set id=r1c2, r1c3, r1c4, etc. use these to select and manipulate dom.

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
        divArray[index].column = columncount.toString(); //sets a string to column property to use in setting id
        columncount +=1;
        divArray[index].row = rowcount.toString(); //sets a string to row property to use in setting id
        divArray[index].setAttribute('id', `r${divArray[index].row}c${divArray[index].column}`) //sets id with row1column2 format for simpler manipulation
        // console.log(divArray[index].id)
        // console.log(divArray[index].row, divArray[index].column);
        // console.log(Object.getOwnPropertyNames(divArray[index]));        
        // console.log('index:' + index);
    }
}

// createRow();

function createGrid() {
    let k; //using k, since we used i on inside loop
    for (k=0;k<15;k++) {
        createRow(); //fills in the entire row, adjusting all necessary variables within this inner function.
        
        //Now that the row is created, we reset and adjust variables for next row:
        left = 0;
        bottom += tile;
        rowcount += 1;
        columncount = 1;
    }
}

createGrid();
console.log(divArray);


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

