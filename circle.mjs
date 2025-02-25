class Circle {
    constructor(color, size, svg) {
        this.label = "circle";
        this.color = color;
        this.size = size;
        this.svg = svg;
        const svgRect = svg.getBoundingClientRect(); //get the svg object info
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;
        const canvasSize = Math.min(svgWidth, svgHeight); //we set up a size of the canas for the one that is the smallest 
        this.cx = svgWidth / 2; // center of the circle is in the center of the svg element
        this.cy = svgHeight / 2; // -||-
        this.r = canvasSize * (size / 200); // radius is the size of the percentage fo the canvasSize
        this.element = null;  //the drawn element at the begginign is null
        this.dragStartX = 0;
        this.dragStartY = 0;

        //bind event handlers
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    draw() {
        // create svg circle element
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.element.setAttribute("cx", this.cx);
        this.element.setAttribute("cy", this.cy);
        this.element.setAttribute("r", this.r);
        this.element.setAttribute("fill", this.color);
        this.element.setAttribute("class", "shape");

        // append the circle element to the svg
        this.svg.appendChild(this.element);

        //add event listeners for dragging
        this.element.addEventListener("mousedown", this.startDrag);
    }

    // function to start dragging
    startDrag(event) {
        const rect = this.svg.getBoundingClientRect();
        this.dragStartX = event.clientX - rect.left;
        this.dragStartY = event.clientY - rect.top;
        window.addEventListener("mousemove", this.drag);
        window.addEventListener("mouseup", this.endDrag);
    }

    // function to handle dragging
    drag(event) {
        const rect = this.svg.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.cx += x - this.dragStartX;
        this.cy += y - this.dragStartY;
        this.element.setAttribute("cx", this.cx);
        this.element.setAttribute("cy", this.cy);
        this.dragStartX = x;
        this.dragStartY = y;
    }

    // function to end dragging
    endDrag() {
        window.removeEventListener("mousemove", this.drag);
        window.removeEventListener("mouseup", this.endDrag);
    }
}

export default Circle;
