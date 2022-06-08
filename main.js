
const a4_width = 595;
const a4_height = 842;
const a4_area = a4_height * a4_width;

var handlers = {
    "graph": {
        "render": graph_render,
        "dim": graph_changeDim
    }
};

let config = {
    "grid":{
        "type": "dots",
        "dim": 25
    } ,
    "margin":{
        "uniform": true,
        "l": "50",
        "r": "50",
        "t": "50",
        "b": "50",
    },
    "bg_color": "white",
    "grid_color": "#acacac",
    "guides":{
        "l": {
            "enabled": false
        },
        "r": {
            "enabled": false
        }
    }
}

function render(){
    handlers[config.grid.type].render();
}

// Change pattern
$(".pattern_btn").click(function(){
    $("#grid_svg-grid").attr("fill", "url(#grid_svg_" + this.id + ")");
    config["grid"]['type'] = this.id;
    $(".pattern_btn").removeClass("active");
    $(this).addClass("active");
    $(":root")[0].style.setProperty("--button_color", "white");
    render();
});

function changePatternDim(){
    let dim = $("#ctrl_pattern_dim")[0].value;
    config.grid.dim = dim;
    handlers[config.grid.type].dim();
    render();
}

function changeMargin(type){
    let paper = document.getElementById("paper");
    let grid = document.getElementById("grid_svg-grid");
    let margin = undefined;

    if (type == 'u'){
        margin = document.getElementById("ctrl_margin").value;
        config['margin']['uniform'] = true;
        // config['margin']['margin'] = margin;
        ['l', 'r', 't', 'b'].forEach(side => config["margin"][side] = margin);

        // grid.x.baseVal.value = a4_width * (margin/100);
        grid.x.baseVal.value = margin;
        grid.width.baseVal.value = a4_width - grid.x.baseVal.value * 2;
        
        // grid.y.baseVal.value = a4_height * (margin/100);
        grid.y.baseVal.value = margin;
        grid.height.baseVal.value = a4_height - grid.y.baseVal.value * 2;

    }
    else{
        margin = document.getElementById("ctrl_margin_" + type).value;

        config['margin']['uniform'] = false;

        switch (type) {
            case 'l':
                // margin = Math.round(a4_width * (margin/100));
                grid.x.baseVal.value = margin;
                grid.width.baseVal.value = a4_width - margin - config['margin']['r'];  // adjust right side
                break;
            case 'r':
                // margin = Math.round(a4_width * (margin/100));
                grid.width.baseVal.value = a4_width - grid.x.baseVal.value - margin;
                break;
            case 't':
                // margin = Math.round(a4_height * (margin/100));
                grid.y.baseVal.value = margin;
                grid.height.baseVal.value = a4_height - margin - config['margin']['b'];  // adjust bottom
                break;
            case 'b':
                // margin = Math.round(a4_height * (margin/100));
                grid.height.baseVal.value = a4_height - grid.y.baseVal.value - margin;
                break;
        }

        config['margin'][type] = margin;

    }

    let margin_out = document.getElementById("out_margin_" + type);
    margin_out.innerText = margin + " px";
    render();
}

function ctrlChangeMarginType(){
    let uniformMarginCheckbox = document.getElementById("ctrl_margin_uniform").checked;
    document.getElementById("ctrlG_margin").style.display = uniformMarginCheckbox ? "flex" : "none";
    $("div[id^='ctrlG_margin_']").css('display', uniformMarginCheckbox ? "none" : "flex");
}

function changePaperColor(){
    let paper = document.getElementById("paper");
    let color = document.getElementById("ctrl_bg_color").value;
    paper.style.backgroundColor = color;
    config['bg_color'] = color;
}

function changeGridColor(){
    let color = document.getElementById("ctrl_grid_color").value;
    document.querySelector(":root").style.setProperty('--grid_color', color);
    config["grid_color"] = color;
}

function changeAccentColor(){
    let color = document.getElementById("ctrl_aux_color").value;
    document.querySelector(":root").style.setProperty('--accent_color', color);
    config['aux_color'] = color;
}

function toggleMarginLine(type){
    // TODO
    let checkbox = document.getElementById("ctrl_guide_" + type).checked;
    document.getElementById('grid_svg_guide_' + type).style.display = checkbox ? "initial" : "none";
    config['guides'][type]['enabled'] = checkbox;
}

function moveMarginLine(type){
    let guide = document.getElementById("grid_svg_guide_" + type);
    let width = document.getElementById("ctrl_guide_perc_" + type ).value;
    guide.x1.baseVal.value = a4_width * (width/100);
    guide.x2.baseVal.value = a4_width * (width/100);
    config["guides"][type]["width"] = a4_width * (width/100);
}

function exportConfig(){
    $("#modal-wrap")[0].style.display = "block";
    $("#config")[0].value = JSON.stringify(config, null, 4);
}

function closeModal(){
    $("#modal-wrap")[0].style.display = "none";
}

function drawLine(x1, x2, y1, y2, stroke){
    let svgns = "http://www.w3.org/2000/svg";
    var line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("x2", x2);
    line.setAttribute("y1", y1);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", stroke);
    return line;
}