function dots_render(){
    $("#grid_svg-grid").attr("fill", "url(#pattern_dots)");
    
    var pattern_wrapper = $("#pattern_wrapper")[0];
    removeChildren(pattern_wrapper);

    var pattern = document.createElementNS(svgns, "pattern");
    pattern.setAttribute("id", "pattern_dots");
    pattern.setAttribute("x", 0);
    pattern.setAttribute("y", 0);
    pattern.setAttribute("width", sizes[config.format][0]);
    pattern.setAttribute("height", sizes[config.format][1]);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    pattern_wrapper.appendChild(pattern);

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
            var circle = document.createElementNS(svgns, "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", config.grid.thickness);
            circle.setAttribute("stroke", config.grid_color);
            circle.setAttribute("fill", config.grid_color);

            pattern.appendChild(circle);
        }
    };
}

function dots_dim(){
    dots_render();
}

function dots_export(pdfdoc){
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
            pdfdoc.circle(x * 0.75, y * 0.75, config.grid.thickness * 0.75, "F");
        }
    }
}