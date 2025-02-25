class Canvas{
   constructor(){
     this.shapes = [];
     this.size = 0;
   }   
   addElement(shape){
     this.shapes[this.size]=shape;
     this.size++;
   }
}

export default Canvas;