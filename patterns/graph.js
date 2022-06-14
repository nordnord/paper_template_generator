function graph_render()
{
    // let grid = $("#grid_svg_graph")[0];
    let pattern_wrapper = $("#pattern_wrapper")[0];
    pattern_wrapper.innerHTML = '';
    
    let grid = document.createElementNS(svgns, "pattern")
    grid.setAttribute("id", "pattern_graph");
    grid.setAttribute("patternUnits", "userSpaceOnUse");
    grid.setAttribute("x", config.margin.l);
    grid.setAttribute("y", config.margin.t);
    grid.setAttribute("height", sizes[config.format][1] - config.margin.t - config.margin.b);
    grid.setAttribute("width", sizes[config.format][0] - config.margin.l - config.margin.r);

    pattern_wrapper.appendChild(grid);

    // Vertical lines
    for (
        var i = 0; 
        i < (sizes[config.format][0] - parseInt(config.margin.r) - parseInt(config.margin.l)); 
        i += parseInt(config.grid.dim)
    ){
        var vline = drawLine(i, i, 0, sizes[config.format][1] - config.margin.t - config.margin.b, config.grid_color)
        grid.appendChild(vline);
    }
    // Vertical trailing line
    grid.appendChild(
        drawLine(
            sizes[config.format][0] - config.margin.l - config.margin.r,
            sizes[config.format][0] - config.margin.l - config.margin.r,
            0,
            sizes[config.format][1] - config.margin.t - config.margin.b,
            config.grid_color
        )
    );

    // Horizontal line
    for(
        var i = 0;
        i < (sizes[config.format][1] - parseInt(config.margin.t) - parseInt(config.margin.b));
        i += parseInt(config.grid.dim)
    ){
        var hline = drawLine(0, sizes[config.format][0] - config.margin.l - config.margin.r, i, i, config.grid_color)
        grid.appendChild(hline);
    }
    // Horizontal trailing line
    grid.appendChild(
        drawLine(
            0,
            sizes[config.format][0] - config.margin.l - config.margin.r,
            sizes[config.format][1] - config.margin.t - config.margin.b,
            sizes[config.format][1] - config.margin.t - config.margin.b,
            config.grid_color
        )
    );

    $("#pattern_wrapper").attr("pattern", "graph");
}

function graph_changeDim(){
    graph_render();
}


function drawLine(x1, x2, y1, y2, stroke){
    var line = document.createElementNS(svgns, "line");
    line.setAttribute("x1", x1);
    line.setAttribute("x2", x2);
    line.setAttribute("y1", y1);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", stroke);
    line.setAttribute("stroke-width", config.grid.thickness);
    return line;
}

function graph_export(pdfdoc){
    pdfdoc.setLineWidth(config.grid.thickness * 0.75);

    // Vertical lines
    for (
        var i = parseInt(config.margin.l); 
        i < (sizes[config.format][0] - parseInt(config.margin.r)); 
        i += parseInt(config.grid.dim)
    ){
        pdfdoc.line(
            i * 0.75, 
            config.margin.t * 0.75, 
            i * 0.75, 
            (sizes[config.format][1] - config.margin.b)*0.75,
            "S"
        );
    }

    // Vertical trailing line
    pdfdoc.line(
        (sizes[config.format][0] - config.margin.r) * 0.75,
        config.margin.t * 0.75,
        (sizes[config.format][0] - config.margin.r)*0.75,
        (sizes[config.format][1] - config.margin.b) * 0.75,
    );

    // Horizontal line
    for(
        var i = parseInt(config.margin.t);
        i < (sizes[config.format][1] - parseInt(config.margin.b));
        i += parseInt(config.grid.dim)
    ){
        pdfdoc.line(
            parseInt(config.margin.t) * 0.75,
            i*0.75, 
            (sizes[config.format][0] - config.margin.r)*0.75,
            i * 0.75, 
            'S');
    }
    // Horizontal trailing line
    pdfdoc.line(
        config.margin.l * 0.75,
        (sizes[config.format][1] - config.margin.b) * 0.75,
        (sizes[config.format][0] - config.margin.r)*0.75,
        (sizes[config.format][1] - config.margin.b)*0.75,
        'S'
    );
}