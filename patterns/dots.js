function dots_render(){
    // Lazy rendering: no need to re-render dots as pattern doesn't change
    // if ($("#pattern_wrapper").attr("pattern") == "dots") return;

    // $("#pattern_wrapper").load("patterns/dots.svg");
    $("#grid_svg-grid").attr("fill", "url(#pattern_dots)");
    
    var pattern_wrapper = $("#pattern_wrapper")[0];
    pattern_wrapper.innerHTML = "";

    var pattern = document.createElementNS(svgns, "pattern");
    pattern.setAttribute("id", "pattern_dots");
    pattern.setAttribute("x", 0);
    pattern.setAttribute("y", 0);
    pattern.setAttribute("width", a4_width);
    pattern.setAttribute("height", a4_height);
    pattern.setAttribute("patternUnits", "userSpaceOnUse");

    pattern_wrapper.appendChild(pattern);

    for (
        var x = parseInt(config.margin.l); 
        x < a4_width - parseInt(config.margin.r);
        x += parseInt(config.grid.dim)
    ){
        for (
            var y = parseInt(config.margin.t);
            y < a4_height - parseInt(config.margin.b);
            y += parseInt(config.grid.dim)
        ){
            var circle = document.createElementNS(svgns, "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", config.grid.thickness);
            circle.setAttribute("stroke", "var(--grid_color)");
            circle.setAttribute("fill", "var(--grid_color)");


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
        x < a4_width - parseInt(config.margin.r);
        x += parseInt(config.grid.dim)
    ){
        for (
            var y = parseInt(config.margin.t);
            y < a4_height - parseInt(config.margin.b);
            y += parseInt(config.grid.dim)
        ){
            pdfdoc.circle(x * 0.75, y * 0.75, config.grid.thickness * 0.75, "F");
        }
    }
}