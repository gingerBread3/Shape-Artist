class Triangle {
    constructor(color, size, svg) {
        this.label = "triangle";
        this.color = color;
        this.size = size;
        this.svg = svg;
        const svgRect = svg.getBoundingClientRect();
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;
        const canvasSize = Math.min(svgWidth, svgHeight);
        const centerX = svgWidth / 2; // the x of the center of the svg
        const centerY = svgHeight / 2; // the y of the center of the svg
        const halfSize = canvasSize * (size / 200); // Adjust size based on canvas size
        this.points = [
            [centerX, centerY - halfSize], // top
            [centerX - halfSize, centerY + halfSize], //bottom left
            [centerX + halfSize, centerY + halfSize] // bottom right
        ];
        this.element = null;

        // bind event handlers
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    draw() {
        // create svg polygon element
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this.element.setAttribute("points", `${this.points[0][0]},${this.points[0][1]} ${this.points[1][0]},${this.points[1][1]} ${this.points[2][0]},${this.points[2][1]}`);
        this.element.setAttribute("fill", this.color);
        this.element.setAttribute("class", "shape");

        // append the polygon element to the svg
        this.svg.appendChild(this.element);

        // add event listeners for dragging
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
        for (let i = 0; i < 3; i++) {
            this.points[i][0] += dx;
            this.points[i][1] += dy;
        }
        this.element.setAttribute("points", `${this.points[0][0]},${this.points[0][1]} ${this.points[1][0]},${this.points[1][1]} ${this.points[2][0]},${this.points[2][1]}`);
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
    }

    // function to end dragging
    endDrag() {
        window.removeEventListener("mousemove", this.drag);
        window.removeEventListener("mouseup", this.endDrag);
    }
}

export default Triangle;
