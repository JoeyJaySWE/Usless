const page = document.querySelector("main");
const bin = document.querySelector("figure");
let startX = 0;
let startY = 0;
let posX = 0;
let posY = 0;
let drag = false;
setTimeout(function(){
    console.log(page);
    page.style.cursor = "grab";
    
    function mouseDown(e){
        e.currentTarget.style.cursor = "grabbing";
        e.currentTarget.style.transform = "scale(0.04)";
        e.currentTarget.style.borderRadious = "100%";
        startX = e.clientX;
        startY = e.clientY;
        page.addEventListener("mousemove", mouseMove);
        drag = true;
    }

    function mouseMove(e){
        console.log(e);
        posX = startX - e.clientX;
        posY = startY - e.clientY;
        startX = e.clientX;
        startY = e.clientY;

        if(drag === true){
            
            page.style.left = (page.offsetLeft - posX)+"px";
            page.style.right = (page.offsetTop - posY)+"px";
            console.log("X: "+page.offsetLeftX+" Y: "+page.offsetTop);
        
        }
    };
    
    page.addEventListener("mousedown", mouseDown);


    page.addEventListener("mouseup", function mouseUp(e){
        e.currentTarget.style.cursor = "grab";
        page.removeEventListener("mousemove", mouseDown());
        page.removeEventListener("mousemove", mouseMove());
        drag = false;
    });

}, 1000);