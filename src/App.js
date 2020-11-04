import React, {useRef, useEffect, useState} from 'react';
import jsPDF from 'jspdf'
import './App.css'

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth*2 ;
    canvas.height = window.innerHeight*2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`
   
    
    const context = canvas.getContext("2d");
   /* context.fillStyle = 'green'
    context.fillRect(200, 10, 150, 100);*/
   
    context.scale(2,2)
    
    context.linecap = 'round'
    context.strokeStyle = 'green'
    context.lineWidth = 5
    contextRef.current = context;
  }, [])
  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)


  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)

  }
const blue =() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
    context.strokeStyle = 'yellow'
  
 
}
const red =() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
    context.strokeStyle = 'red'
  
 
}
const green =() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
    context.strokeStyle = 'green'
  
 
}
const pink =() => {
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");
    context.strokeStyle = 'pink'
  
 
}
const download =() =>{
  const myCanvas = document.querySelector('#myCanvas')
  const dataURI = myCanvas.toDataURL();
  console.log(dataURI)

  const a = document.createElement("a");
  document.body.appendChild(a);
  a.href = myCanvas.toDataURL("image/jpeg");
 /* a.download = "image2.jpg";*/

  var img = myCanvas.toDataURL('image/png'),
  doc = new jsPDF({
    unit: 'px',
    format: 'a4',
  });
doc.addImage(img, 'JPEG',0,0, 400,400 );
doc.save('download.pdf');
  a.click();
  document.body.removeChild(a);
}
  const draw =({nativeEvent}) => {
    if(!isDrawing){
      return
    }
const {offsetX, offsetY} = nativeEvent;
contextRef.current.lineTo(offsetX, offsetY)
contextRef.current.stroke()
  }
  return (
    <>
    <div className='div_container'>
      <img src='http://icons.iconarchive.com/icons/wwalczyszyn/iwindows/512/Paint-icon.png'></img>
      <h1>Paint3D</h1>
    </div>
    
    <button id='download' style={{backgroundColor:'rgb(26, 194, 26)'}} onClick={download}>Download PDF</button>
    <div className='colors'>
      
      <h2> Pallette</h2>
  <button className='size' onClick={blue} style={{backgroundColor:'yellow'}}></button>
  <button   className='size' onClick={red} style={{backgroundColor:'red'}}></button>
  <button  className='size' onClick={green} style={{backgroundColor:'green'}}></button>
  <button  className='size' onClick={pink} style={{backgroundColor:'pink'}}></button>
  
  </div>
  <canvas id="myCanvas" width='200px'
  height='300px'
  onMouseDown ={startDrawing}
  onMouseUp={finishDrawing}
  onMouseMove={draw}
  ref={canvasRef}
  
  />
  
  </>
  );
}

export default App;
