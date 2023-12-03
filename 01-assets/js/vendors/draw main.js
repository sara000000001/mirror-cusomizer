



window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    //resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

   
    
    //vrialbles

    let painting = false;

    function startingPositon(e){
        painting = true;
        draw(e);

    }
    function finishPosition(){
        painting = false;
        ctx.closePath();
       
    }

    function draw(e){
        if (!painting) return;
        ctx.lineWidth = 10 ;
        ctx.lineCap = "round";

        ctx.lineTo (e.clientX, e.clientY);
        ctx.strokeStyle = ("green");
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        
    }


    //EventListenerss
    canvas.addEventListener("mousedown", startingPositon);
    canvas.addEventListener("mouseup", finishPosition);
    canvas.addEventListener("mousemove", draw);

});


