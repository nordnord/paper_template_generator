function line_render(){
    $("#grid_svg-grid").attr("fill", "url(#pattern_line)");
    var pattern_wrapper = $("#pattern_wrapper")[0];
    pattern_wrapper.innerHTML = "";
    
    var pattern = document.createElementNS(svgns, "pattern");
    pattern.setAttribute("id", "pattern_line");
    pattern.setAttribute("x", 0);
    pattern.setAttribute("y", 0);
    pattern.setAttribute("width", sizes[config.format][0]);
    pattern.setAttribute("height", sizes[config.format][1]);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    pattern_wrapper.appendChild(pattern);

    for (
        var y = parseInt(config.margin.t);
        y < sizes[config.format][1] - parseInt(config.margin.b);
        y += parseInt(config.grid.dim)
    ){
        var line = document.createElementNS(svgns, "line");
        line.setAttribute("x1", config.margin.l);
        line.setAttribute("x2", sizes[config.format][0] - config.margin.r);
        line.setAttribute("y1", y);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", "var(--grid_color)");
        line.setAttribute("stroke-width", config.grid.thickness);

        pattern.appendChild(line);
        
    }
}

function line_dim(){
    line_render();
}

function line_export(pdfdoc){
    for (
        var y = parseInt(config.margin.t);
        y < sizes[config.format][1] - parseInt(config.margin.b);
        y += parseInt(config.grid.dim)
    ){
        pdfdoc.setLineWidth(config.grid.thickness * 0.75);
        pdfdoc.line(
            config.margin.l * 0.75, y*0.75, 
            (sizes[config.format][0] - parseInt(config.margin.r)) * 0.75, y * 0.75, 
            "S"
        );
    }
}