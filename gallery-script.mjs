import Circle from "./circle.mjs";
import Canvas from "./canvas.mjs";
import Triangle from "./triangle.mjs";
import Square from "./square.mjs";
import Ellipse from "./ellipse.mjs";

const canvases = JSON.parse(localStorage.getItem("gallery")); // a list of all canvases
document.addEventListener("DOMContentLoaded", drawGallery); 

function drawGallery(){
    const div = document.querySelector('#paintings');  
    if(canvases.length == 0){
        console.log("empty");
        const p = document.createElement("p");
        const node = document.createTextNode("Your gallery is empty.");
        p.appendChild(node);
        div.appendChild(p);
    }else{
        for(let i = 0; i<canvases.length; i++){
            let canvas = canvases[i];
            console.log(canvas);
            let svg =  document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", "100%");
            svg.setAttribute("id", `svg${i}`);
            console.log(svg);
            div.appendChild(svg);
            let sVg = document.querySelector(`#svg${i}`);

            drawCanvas(canvas,sVg);

            // the height of the svg element is the same as the max y-coordinate of shapes
            let maxY = getMaxY(canvas.shapes);
            svg.setAttribute("height", maxY + 10); // we also add some padding
        }
    }
}

function getMaxY(shapes) {
    let maxY = 0;
    for(let shape of shapes) {
        switch(shape.label) {
            case "ellipse":
                // if the topmost point of the ellipse is beyond the current maxY we update it
                if(shape.cy + shape.ry > maxY) {
                    maxY = shape.cy - shape.ry;
                }
            case "circle":
                if(shape.cy + shape.ry > maxY) {
                    maxY = shape.cy + shape.ry;
                }
                break;
            case "square":
                if(shape.y + shape.height > maxY) {
                    maxY = shape.y + shape.height;
                }
                break;
            case "triangle":
                for(let point of shape.points) {
                    if(point[1] > maxY) {
                        maxY = point[1];
                    }
                }
                break;
        }
    }
    return maxY;
}



function drawCanvas(canvas, svg){
    for(let shape of canvas.shapes){
        let s;
        switch(shape.label){
            case "ellipse":
                s = new Ellipse(shape.color, shape.size, svg);
                s.cx = shape.cx; // we update shapes center x coordinate
                s.cy = shape.cy; // we update shapes center y coordinate
                s.draw();
                break;
            case "square":
                s = new Square(shape.color, shape.size, svg);
                s.x = shape.x; 
                s.y = shape.y; 
                s.draw();
                break;
            case "triangle":
                s = new Triangle(shape.color, shape.size, svg);
                // update shape  points
                s.points = shape.points.map(([x, y]) => [x, y]);
                s.draw();
                break;
            case "circle":
                s = new Circle(shape.color, shape.size, svg);
                s.cx = shape.cx; 
                s.cy = shape.cy; 
                s.draw();
                break;
        }
    }
}
