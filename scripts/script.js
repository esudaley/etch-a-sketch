
play();


function play() {
    const container = document.querySelector("#container");
    let colorChoice = "rgba(0, 0, 0, 0.9)";
    let defaultSize = 20;

    drawBoard(defaultSize);
    addEventListeners();

    
function drawBoard(defaultSize) {    
    container.style.gridTemplateRows= `repeat(${defaultSize}, 1fr)`;
    container.style.gridTemplateColumns= `repeat(${defaultSize}, 1fr)`;
  
    for (let i=0; i < defaultSize*defaultSize; i++) {
        let box = document.createElement('div');
        box.classList.add("box");
        box.classList.add("showGrid");
        container.appendChild(box);
    }
}

function addEventListeners() {
  
    const colorButton = document.querySelector("#color");
    const sizeButton = document.querySelector("#size");
    const resetButton = document.querySelector("#reset");
    const eraseButton = document.querySelector("#erase");
    const gridButton = document.querySelector("#grid");
    const menu = document.querySelector(".menu");
   
   
      
    container.addEventListener("click", toggleDraw);
    container.addEventListener("mouseover", draw);
    
    colorButton.addEventListener("click", openColorMenu);
    gridButton.addEventListener("click", toggleGrid);
    sizeButton.addEventListener("click", resize);
    resetButton.addEventListener("click", reset);
    eraseButton.addEventListener("click", erase);
    document.addEventListener("keydown", keyShortcut);
    menu.addEventListener("click", chooseColor); 
      
}

function toggleDraw() {
    container.classList.toggle("drawOn");
    draw();
}

function draw() {
    if (event.target === event.currentTarget) 
        return;

    if (container.classList.contains("erase")) {
        event.target.style.backgroundColor = "lightgray";
        return; 
    }     
    if (container.classList.contains("drawOn") && container.classList.contains("random")){
        event.target.style.backgroundColor = randomColor();
        return;
    }
    if (container.classList.contains("drawOn"))
        event.target.style.backgroundColor = colorChoice; 

}

function openColorMenu() {    
    const menu = document.querySelector(".menu");
    menu.classList.toggle("showMenu");
    const black = document.querySelector(".black");
    black.style.backgroundColor = " rgba(170, 170, 170, 0.74)";
}

function chooseColor() {
    const custom = document.querySelector(".custom");
    const rainbow = document.querySelector(".rainbow");
    const black = document.querySelector(".black");
    if (event.target === event.currentTarget)
        return;
        
    if (event.target.className === "black"){
        
            container.classList.remove("random");
            custom.style.backgroundColor =  "transparent";
            rainbow.style.backgroundColor = "transparent";
            black.style.backgroundColor = " rgba(170, 170, 170, 0.74)";
        colorChoice = "rgba(0, 0, 0, 0.9)";
    }
    if (event.target.className === "rainbow") {
        custom.style.backgroundColor =  "transparent";
        black.style.backgroundColor =  "transparent";
        rainbow.style.backgroundColor = " rgba(170, 170, 170, 0.74)";
        container.classList.toggle("random");

    }
        
    if (event.target.className === "custom"){
        
        container.classList.remove("random");
        rainbow.style.backgroundColor = "transparent";
        black.style.backgroundColor =  "transparent";
        custom.style.backgroundColor =  " rgba(170, 170, 170, 0.74)";
        openColors();
    }
    
}

function randomColor() {
    const chars = "0123456789ABCDEF"; 
    let randomVal;
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
        randomVal = Math.floor(Math.random() * chars.length);
        randomColor += chars.charAt(randomVal);
    }
    return randomColor;
}

function resize() {
    if(!confirm("Resizing will clear you drawing. \nWould you like to continue?\n\n")) 
        return; 
    let sizeChoice = prompt("How big would you like your grid? \n(You can pick a number between 1-100)\n"); 
    if (sizeChoice === null)
        return;
    while (sizeChoice < 1 || sizeChoice > 100 || isNaN(sizeChoice)) {     
        sizeChoice = prompt("Try entering a number between 1 and 100");
        if (sizeChoice === null)  
            return;
    }
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    } 
    drawBoard(sizeChoice);
}
function keyShortcut() {
    switch (event.keyCode) {
        case 67:
            openColorMenu();
            break;
        case 69:
            erase();
            break;
        case 71:
            toggleGrid();
            break;
        case 82:
            reset();
            break;
        case 83:
            resize();
            break;
    }
}

function toggleGrid() {
    const boxes = document.querySelectorAll(".box");
    boxes.forEach(box => box.classList.toggle("showGrid"));
}

function reset() {
    boxes = document.querySelectorAll(".box");
    let results = confirm("Are you sure you want to clear your board?\n");
    
    if (results)
        boxes.forEach(function(box) {box.style.backgroundColor = "lightgray"});
    container.classList.remove("drawOn");
}

function erase() {
    container.classList.toggle("drawOn");
    container.classList.toggle("erase");
    const eraseButton = document.querySelector("#right");
    eraseButton.classList.toggle("buttonOn");

}


flexFont = function () {
    var divs = document.getElementsByClassName("flexFont");
    for(var i = 0; i < divs.length; i++) {
        var relFontsize = divs[i].offsetWidth*0.05;
        divs[i].style.fontSize = relFontsize+'px';
    }
};

window.onload = function(event) {
    flexFont();
};
window.onresize = function(event) {
    flexFont();
};

function openColors() {
    const custom = document.querySelector(".custom");
    let color = document.querySelector(".col");
    color.addEventListener("change", () => {
       colorChoice= color.value;
       custom.style.backgroundColor =  colorChoice;
    
    });
    color.click();
}
}