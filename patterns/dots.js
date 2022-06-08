function dots_render(){
    // Lazy rendering: no need to re-render dots as pattern doesn't change
    if ($("#pattern_wrapper").attr("pattern") == "dots") return;

    $("#pattern_wrapper").load("patterns/dots.svg");
    // $("#grid_svg-grid").attr("fill", "url(#pattern_dots)");
    $("#pattern_wrapper").attr("pattern", "dots")

    default_dim();
}