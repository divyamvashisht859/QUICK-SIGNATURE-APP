const colorPicker= document.getElementById("colorPicker");
const canvascolor=document.getElementById("canvascolor");
const canvas=document.getElementById("myCanvas");
const clearButton=document.getElementById("clearButton");
const saveButton=document.getElementById("saveButton");
const fontsize=document.getElementById("fontsize");
const retrieveButton=document.getElementById("retrieveButton")
const ctx=canvas.getContext('2d')

colorPicker.addEventListener('change',(event)=>
{
    ctx.strokeStyle=event.target.value;
    ctx.fillStyle=event.target.value;
})

canvas.addEventListener('mousedown',(e)=>
{
    isDrawing=true;
    lastX=event.offsetX;
    lastY=event.offsetY;
})
canvas.addEventListener('mousemove',(e)=>
{
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }
})
canvas.addEventListener('mouseup',()=>
{
    isDrawing =false;
})

canvascolor.addEventListener('change',(e)=>
{
    ctx.fillStyle=e.target.value;
    ctx.fillRect(0,0,800,500);
})

fontsize.addEventListener('change',(e)=>
{
    ctx.lineWidth=e.target.value;
})

clearButton.addEventListener('click',()=>
{
    ctx.clearRect(0,0,canvas.width,canvas.height)
})
///////////////////////////////////////////////////////////////////////////////////////

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    // Create a new <a> element
    let link = document.createElement('a');

    // Set the download attribute and the href attribute of the <a> element
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();

    // Dispatch a click event on the <a> element
    link.click();
});

// Add event listener for the retrieve button
retrieveButton.addEventListener('click', () => {
    // Retrieve the saved canvas contents from local storage
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
});
