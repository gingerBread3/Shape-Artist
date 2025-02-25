import Canvas from "./canvas.mjs";
import Circle from "./circle.mjs";
import Triangle from "./triangle.mjs";
import Square from "./square.mjs";
import Ellipse from "./ellipse.mjs";

$(document).ready(function() {
    //when we create the canvas we save it to the localstorage under the key painting
    //this way we do not save the canvas to the gallery unless we save it to localstorage under key gallery
    let canvas;
    if (localStorage.getItem("painting") == null) {
        //if we dont have paintig saved to localstorage we create one
        canvas = new Canvas(); 
        localStorage.setItem("painting", JSON.stringify(canvas));
    } else {
        canvas = new Canvas(); 
        Object.assign(canvas, JSON.parse(localStorage.getItem("painting"))); //we  merge saved data into the canvas object
    }

    const svg = document.getElementById("svg"); 

    //add the shape
    const addButton = document.querySelector('#button');
    //the instances where a new canvas can be created: 
    const newPainting = document.querySelector('#new-painting');
    const deleteButton = document.querySelector('#Delete');
    const saveButton = document.querySelector('#Save');

    //definitions of functions://
    function newCanvas(){
        canvas = new Canvas(); 
        localStorage.setItem("painting", JSON.stringify(canvas));
        const svg = document.getElementById("svg"); 
        svg.textContent = "";
        drawCanvas();
    }

    function deleteCanvas(){
        canvas = new Canvas(); 
        localStorage.setItem("painting", JSON.stringify(canvas));
        const svg = document.getElementById("svg"); 
        svg.textContent = "";
        drawCanvas();
    }

    function saveToGallery(canvas){
        console.log("SAVE");
        let g = [];
        if(localStorage.getItem("gallery")==null){
            //for the first paingint in the gallery:
            g.push(canvas);
            localStorage.setItem("gallery" , JSON.stringify(g) );
        }
        else{
            g = JSON.parse(localStorage.getItem("gallery"));
            g.push(canvas);
            localStorage.setItem("gallery" , JSON.stringify(g) );        
        }
        newCanvas(); //after we save the painting we create a new one 
    }

    function addShape(canvas){
        //we get the parent element svg
        const svg = document.getElementById("svg");
        const svgWidth = svg.clientWidth; //the widht of a svg element
        
        //get the shape from the radio buttons:
        const radioButtons = document.querySelectorAll('input[name="shape"]');
        let shape = getShape(radioButtons);

        //get the color of the color selector:
        const colorEl = document.getElementById("selected-color");
        let color = getColor(colorEl);

        //get the size from the slider:
        const sliderEl = document.getElementById("myRange");
        let size = getSize(sliderEl);

        let newElement;
        switch(shape){
            case "ellipse":
                console.log("Ellipse");    
                newElement = new Ellipse(color, size, svg);
                break;
            case "square":
                console.log("Square");
                newElement = new Square(color, size, svg);            
                break;
            case "triangle":
                console.log("Triangle");
                newElement = new Triangle(color, size, svg);
                break;
            case "circle":
                console.log("Circle");
                newElement = new Circle(color, size, svg);
                break;
        }
        newElement.draw(); //we draw the element
        canvas.addElement(newElement); //we add it to the object canvas
        console.log(canvas);
        localStorage.setItem("painting", JSON.stringify(canvas)); //we update the new canvas shapes
    }

    function drawCanvas(){
        console.log("refresh");
        if(canvas.length!=0){
            for(let shape of canvas.shapes){
                let s;
                switch(shape.label){
                    case "ellipse":   
                        s = new Ellipse(shape.color, shape.size, svg);
                        break;
                    case "square":                
                        s = new Square(shape.color, shape.size, svg);            
                        break;
                    case "triangle":                
                        s = new Triangle(shape.color, shape.size, svg);
                        break;
                    case "circle":                
                        s = new Circle(shape.color, shape.size, svg);
                        break;
                }
                Object.assign(s, shape);
                s.draw();
            }
        }
    }

    //funtions that get the user input: 
    function getShape(radioButtons){
        let shape;
        for (const rb of radioButtons) {
            if (rb.checked) {
                shape = rb.value;
                break;
            }
        }
        return shape;
    }

    function getColor(colorInput){
        return colorInput.value;
    }

    function getSize(sliderInput){
        return sliderInput.value; 
    }

    document.addEventListener("DOMContentLoaded", () => {
        drawCanvas();
    }); //when we reload and load the content it checks what is

    window.addEventListener("load",() => {
        drawCanvas(); // redraw all shapes when the page loads
    });
    addButton.addEventListener("click", function() {
        addShape(canvas);});

    saveButton.addEventListener("click", function() {
        saveToGallery(canvas);});

    deleteButton.addEventListener("click", deleteCanvas);
    newPainting.addEventListener("click", newCanvas);

    let dragShape = null;
    let offsetX, offsetY;
    
    // Function to start dragging
    function startDrag(event) {
        dragShape = $(this);
        const position = dragShape.position(); //We get top and left from this object
        offsetX = event.pageX - position.left;
        offsetY = event.pageY - position.top;
    }
    
    // Function to handle dragging
    function drag(event) {
        if (dragShape) {
            const x = event.pageX - offsetX;
            const y = event.pageY - offsetY;
            dragShape.css({ top: y, left: x });
        }
    }
    
    // Function to end dragging
    function endDrag() {
        dragShape = null;
    }
    
    // Add event listeners for mouse events
    $(document).on("mousedown", ".shape", startDrag);
    $(document).on("mousemove", drag);
    $(document).on("mouseup", endDrag);
});