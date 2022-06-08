function line_render(){
    $("#grid_svg-grid").attr("fill", "url(#pattern_line)");
    var pattern_wrapper = $("#pattern_wrapper")[0];
    pattern_wrapper.innerHTML = "";
    
    var pattern = document.createElementNS(svgns, "pattern");
    pattern.setAttribute("id", "pattern_line");
    pattern.setAttribute("x", 0);
    pattern.setAttribute("y", 0);
    pattern.setAttribute("width", a4_width);
    pattern.setAttribute("height", a4_height);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    pattern_wrapper.appendChild(pattern);

    for (
        var y = parseInt(config.margin.t);
        y < a4_height - parseInt(config.margin.b);
        y += parseInt(config.grid.dim)
    ){
        var line = document.createElementNS(svgns, "line");
        line.setAttribute("x1", config.margin.l);
        line.setAttribute("x2", a4_width - config.margin.r);
        line.setAttribute("y1", y);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "var(--grid_color)");

        pattern.appendChild(line);
        
    }
}

function line_dim(){
    line_render();
}

function line_export(pdfdoc){
    console.log(a4_width - config.margin.r);
    for (
        var y = parseInt(config.margin.t);
        y < a4_height - parseInt(config.margin.b);
        y += parseInt(config.grid.dim)
    ){
        pdfdoc.line(
            config.margin.l * 0.75, y*0.75, 
            (a4_width - parseInt(config.margin.r)) * 0.75, y * 0.75, 
            "S"
        );
    }
}