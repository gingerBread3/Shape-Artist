class Square {
    constructor(color, size, svg) {
        this.label = "square";
        this.color = color;
        this.size = size;
        this.svg = svg;
        const svgRect = svg.getBoundingClientRect();
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;
        const canvasSize = Math.min(svgWidth, svgHeight);
        const centerX = svgWidth / 2; // the x of the center of the svg
        const centerY = svgHeight / 2; // the y of the center of the svg
        const halfSize = canvasSize * (size / 200); 
        this.x = centerX - halfSize;
        this.y = centerY - halfSize;
        this.width = halfSize * 2;
        this.height = halfSize * 2;
        this.element = null;

        // bind event handlers
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    draw() {
        // create svg rectangle element
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.element.setAttribute("x", this.x);
        this.element.setAttribute("y", this.y);
        this.element.setAttribute("width", this.width);
        this.element.setAttribute("height", this.height);
        this.element.setAttribute("fill", this.color);
        this.element.setAttribute("class", "shape");

        // append the rectangle element to the svg
        this.svg.appendChild(this.element);

        // add event listener for dragging
        this.element.addEventListener("mousedown", this.startDrag);
    }

    // function to start dragging
    startDrag(event) {
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
        window.addEventListener("mousemove", this.drag);
        window.addEventListener("mouseup", this.endDrag);
    }

    // function to handle dragging
    drag(event) {
        const dx = event.clientX - this.dragStartX;
        const dy = event.clientY - this.dragStartY;
        this.x += dx;
        this.y += dy;
        this.element.setAttribute("x", this.x);
        this.element.setAttribute("y", this.y);
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
    }

    // function to end dragging
    endDrag() {
        window.removeEventListener("mousemove", this.drag);
        window.removeEventListener("mouseup", this.endDrag);
    }
}

export default Square;
