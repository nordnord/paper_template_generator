function graph_render()
{
    let grid = $("#grid_svg_graph")[0];
    grid.innerHTML = "";
    grid.setAttribute("x", config.margin.l);
    grid.setAttribute("y", config.margin.t);
    grid.setAttribute("height", a4_height - config.margin.t - config.margin.b);
    grid.setAttribute("width", a4_width - config.margin.l - config.margin.r);

    for (
        var i = 0; 
        i < (a4_width - parseInt(config.margin.r) - parseInt(config.margin.l)); 
        i += parseInt(config.grid.dim)
    ){
        var vline = drawLine(i, i, 0, a4_height - config.margin.t - config.margin.b, "var(--grid_color)")
        grid.appendChild(vline);
    }
    grid.appendChild(
        drawLine(
            a4_width - config.margin.l - config.margin.r,
            a4_width - config.margin.l - config.margin.r,
            0,
            a4_height - config.margin.t - config.margin.b,
            "var(--grid_color)"
        )
    );

    for(
        var i = 0;
        i < (a4_height - parseInt(config.margin.t) - parseInt(config.margin.b));
        i += parseInt(config.grid.dim)
    ){
        var hline = drawLine(0, a4_width - config.margin.l - config.margin.r, i, i, "var(--grid_color)")
        grid.appendChild(hline);
    }
    grid.appendChild(
        drawLine(
            0,
            a4_width - config.margin.l - config.margin.r,
            a4_height - config.margin.t - config.margin.b,
            a4_height - config.margin.t - config.margin.b,
            "var(--grid_color)"
        )
    );
}

function graph_changeDim(){
    return;
}