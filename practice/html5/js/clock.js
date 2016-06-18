window.onload = function(){
    //canvas clock setting
    // panel
    var panel = document.getElementById("c-panel");
    var panelCtx = panel.getContext("2d");

    // pointer
    var pointer = document.getElementById("c-pointer");
    var pointerCtx = pointer.getContext("2d");
    panel.width = pointer.width = 933;
    panel.height = pointer.height = 622;

    var r = 14 * 18;
    // draw panel
    for(var i = 1; i<61; i++){
        var $reg = Math.PI/30*i, x = panel.width/2+r*Math.sin($reg), y = r - r*Math.cos($reg) + 20;
        panelCtx.save();
        panelCtx.beginPath();
        panelCtx.moveTo(x, y);
        if(i==15 || i==30 || i==45 || i==60){
            panelCtx.fillStyle = "18px Verdana";
            panelCtx.fillText(i/5+'', x, y);
        }else{
            // NOTE 一开始是想先画线 再旋转 发现貌似不行
            // 后来只好计算好角度直接画线了
            panelCtx.lineTo(x+18*Math.sin($reg), y-18*Math.cos($reg));
            panelCtx.stroke();
        }
        panelCtx.fill();
        panelCtx.closePath();
        panelCtx.restore();
    }

    // draw pointer
    setInterval(function(){
        drawPointer();
    }, 1000);
    drawPointer();
    function drawPointer(){
        var arr = ["h","m","s"], x = panel.width/ 2, y = r, date = new Date(), h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
        pointerCtx.clearRect(0, 0, pointer.width, pointer.height);
        for(var i = 0, len = arr.length; i<len;i ++ ){
            var d = arr[i], dis = 30, color = '';
            switch (d) {
                case "h":
                    dis = 72;
                    color = "#000";
                    $reg = h%12*Math.PI/6;
                    break;
                case "m":
                    dis = 144;
                    color = "#ccc";
                    $reg = m*Math.PI/30;
                    break;
                case "s":
                    dis = 216;
                    color = "red";
                    $reg = s*Math.PI/30;
                    break;
            }
            pointerCtx.save();
            pointerCtx.beginPath();
            pointerCtx.moveTo(x, y);
            pointerCtx.lineWidth = 1;
            // 同上 NOTE
            pointerCtx.lineTo(x+dis*Math.sin($reg), y - dis*Math.cos($reg));
            pointerCtx.fill();
            pointerCtx.strokeStyle = color;
            pointerCtx.stroke();
            pointerCtx.closePath();
            pointerCtx.restore();
        }
    }
};





