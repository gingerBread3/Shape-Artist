class Ellipse {
    constructor(color, size, svg) {
        this.label = "ellipse";
        this.color = color;
        this.size = size;
        this.svg = svg;
        const svgRect = svg.getBoundingClientRect();
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;
        const canvasSize = Math.min(svgWidth, svgHeight);
        const centerX = svgWidth / 2; // like with the circle
        const centerY = svgHeight / 2; //like with the cirlce
        const halfSizeX = canvasSize * (size / 200); // like with the circle
        const halfSizeY = canvasSize * (size / 400); // like with the cirl and the radiuses are 1:2
        this.cx = centerX;
        this.cy = centerY;
        this.rx = halfSizeX;
        this.ry = halfSizeY;
        this.element = null;

        // bind event handlers
        this.startDrag = this.startDrag.bind(this);
        this.drag = this.drag.bind(this);
        this.endDrag = this.endDrag.bind(this);
    }

    draw() {
        // create svg ellipse element
        this.element = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        this.element.setAttribute("cx", this.cx);
        this.element.setAttribute("cy", this.cy);
        this.element.setAttribute("rx", this.rx);
        this.element.setAttribute("ry", this.ry);
        this.element.setAttribute("fill", this.color);
        this.element.setAttribute("class", "shape");

        // append the ellipse element to the svg
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
        this.cx += dx;
        this.cy += dy;
        this.element.setAttribute("cx", this.cx);
        this.element.setAttribute("cy", this.cy);
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
    }

    // function to end dragging
    endDrag() {
        window.removeEventListener("mousemove", this.drag);
        window.removeEventListener("mouseup", this.endDrag);
    }
}

export default Ellipse;
