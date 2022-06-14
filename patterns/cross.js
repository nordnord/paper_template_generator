function cross_render(){
    $("#grid_svg-grid").attr("fill", "url(#pattern_cross)");
    
    var pattern_wrapper = $("#pattern_wrapper")[0];
    pattern_wrapper.innerHTML = "";

    var pattern = document.createElementNS(svgns, "pattern");
    pattern.setAttribute("id", "pattern_cross");
    pattern.setAttribute("x", 0);
    pattern.setAttribute("y", 0);
    pattern.setAttribute("width", sizes[config.format][0]);
    pattern.setAttribute("height", sizes[config.format][1]);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    pattern_wrapper.appendChild(pattern);

    // NOTE: -5 just to prevent preview clipping
    for (
        var x = parseInt(config.margin.l)-5; 
        x < sizes[config.format][0] - parseInt(config.margin.r);
        x += parseInt(config.grid.dim)
    ){
        for (
            var y = parseInt(config.margin.t)-5;
            y < sizes[config.format][1] - parseInt(config.margin.b);
            y += parseInt(config.grid.dim)
        ){
            var vline = drawLine(
                x, x, 
                y-5-config.grid.thickness, 
                y+5+config.grid.thickness, 
                config.grid_color);
            pattern.appendChild(vline);

            var hline = drawLine(
                x-5-config.grid.thickness, 
                x+5+config.grid.thickness, 
                y, y, 
                config.grid_color);
            pattern.appendChild(hline);
        }
    }
}

function cross_dim(){
    cross_render();
}

function cross_export(pdfdoc){
    pdfdoc.setLineWidth(config.grid.thickness * 0.75);
    for (
        var x = parseInt(config.margin.l); 
        x < sizes[config.format][0] - parseInt(config.margin.r);
        x += parseInt(config.grid.dim)
    ){
        for (
            var y = parseInt(config.margin.t);
            y < sizes[config.format][1] - parseInt(config.margin.b);
            y += parseInt(config.grid.dim)
        ){
            pdfdoc.line(
                x * 0.75, 
                (y - 5 - config.grid.thickness)*0.75, 
                x * 0.75, 
                (y + 5 + config.grid.thickness) * 0.75, 
                'S');

            pdfdoc.line(
                (x - 5 - config.grid.thickness) * 0.75, 
                y * 0.75, 
                (x + 5 + config.grid.thickness) * 0.75, 
                y * 0.75, 
                'S');
        }
    }
}