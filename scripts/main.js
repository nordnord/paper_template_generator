const svgns = "http://www.w3.org/2000/svg";

const a4_width = 595;
const a4_height = 842;
const a4_area = a4_height * a4_width;

var handlers = {
    "graph": {
        "render": graph_render,
        "dim": graph_changeDim,
        "export": graph_export
    },
    "dots": {
        "render": dots_render,
        "dim": dots_dim,
        "export": dots_export
    },
    "cross": {
        "render": cross_render,
        "dim": cross_dim,
        "export": cross_export
    },
    "line": {
        "render": line_render,
        "dim": line_dim,
        "export": line_export
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
    "bg_color": "#ffffff",
    "grid_color": "#acacac",
    "aux_color": "#C16069",
    "guides":{
        "l": {
            "enabled": false
        },
        "r": {
            "enabled": false
        }
    }
}

document.onreadystatechange = function(){
    // Initial value setting
    changeMargin("u");
    changePatternDim();
}

function render(){
    handlers[config.grid.type].render();
    $("#grid_svg-grid").attr("fill", `url(#pattern_${config.grid.type})`);
}

// Change pattern
$(".pattern_btn").click(function(){
    config["grid"]['type'] = this.id;
    $(".pattern_btn").removeClass("active");
    $(this).addClass("active");
    $(":root")[0].style.setProperty("--button_color", "white");

    render();
});

function default_dim(){
    let dim = $("#ctrl_pattern_dim")[0].value;
    config['grid']['dim'] = dim;
    $("#pattern_" + config['grid']['type']).attr("height", dim);
    $("#pattern_" + config['grid']['type']).attr("width", dim);
}

function changePatternDim(){
    let dim = $("#ctrl_pattern_dim")[0].value;
    config.grid.dim = dim;
    handlers[config.grid.type].dim();
    $("#out_spacing")[0].innerText = dim + " px";
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

        moveMarginLine('l');
        moveMarginLine('r');
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
        moveMarginLine(type);

    }

    let margin_out = document.getElementById("out_margin_" + type);
    margin_out.innerText = margin + " px";
    render();
    
}

function ctrlChangeMarginType(){
    let uniformMarginCheckbox = document.getElementById("ctrl_margin_uniform").checked;
    document.getElementById("ctrlG_margin").style.display = uniformMarginCheckbox ? "flex" : "none";
    // $("div[id^='ctrlG_margin_']").css('display', uniformMarginCheckbox ? "none" : "flex");
    $("#ctrlG_margin_custom").css('display', uniformMarginCheckbox ? "none" : "grid");
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
    moveMarginLine(type);
}

function moveMarginLine(type){
    // Vertical guides aren't supported yet
    if (type == 't' || type == 'b') return;

    let guide = document.getElementById("grid_svg_guide_" + type);
    let width = document.getElementById("ctrl_guide_perc_" + type ).value;
    guide.x1.baseVal.value = a4_width * (width/100);
    guide.y1.baseVal.value = config.margin.t;
    guide.x2.baseVal.value = a4_width * (width/100);
    guide.y2.baseVal.value = a4_height - config.margin.b;
    config["guides"][type]["width"] = a4_width * (width/100);
}

function exportConfig(){
    $("#modal-wrap")[0].style.display = "block";
    $("#config")[0].value = JSON.stringify(config, null, 4);
}

function closeModal(){
    $("#modal-wrap")[0].style.display = "none";
}

function hexToRgb(hex){
    // Source: https://convertingcolors.com/blog/article/convert_hex_to_rgb_with_javascript.html
    var rgbhex = hex.substring(1, hex.length).match(/.{1,2}/g);
    var rgb = [
        parseInt(rgbhex[0], 16),
        parseInt(rgbhex[1], 16),
        parseInt(rgbhex[2], 16)
    ]
    return rgb;
}

function genPDF(){
    var pdf = new jsPDF({
        'orientation': 'p', 
        'unit':'px', 
        'format': "a4",
        'hotfixes': ['px_scaling']
    });
    pdf.setLineWidth(0.1);

    var bg_color = hexToRgb(config.bg_color);
    pdf.setFillColor(bg_color[0], bg_color[1], bg_color[2]);
    pdf.setDrawColor(bg_color[0], bg_color[1], bg_color[2]);
    pdf.rect(0, 0, a4_width, a4_height, "F");


    var grid_color = hexToRgb(config.grid_color);
    pdf.setFillColor(grid_color[0], grid_color[1], grid_color[2]);
    pdf.setDrawColor(grid_color[0], grid_color[1], grid_color[2]);

    handlers[config.grid.type].export(pdf);

    var accent_color = hexToRgb(config.aux_color);
    pdf.setDrawColor(accent_color[0], accent_color[1], accent_color[2]);
    pdf.setLineWidth(1);
    
    if (config.guides.l.enabled){
        pdf.line(
            config.guides.l.width * 0.75,
            config.margin.t * 0.75,
            config.guides.l.width * 0.75,
            (a4_height - config.margin.b)*0.75,
            'S'
        );
    }
        
    if (config.guides.r.enabled){
        pdf.line(
            config.guides.r.width * 0.75,
            config.margin.t * 0.75,
            config.guides.r.width * 0.75,
            (a4_height - config.margin.b)*0.75,
            'S'
        );
    }
    window.open(pdf.output("bloburl", { filename: "my.pdf" }));
}
