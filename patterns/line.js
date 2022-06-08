function line_render(){
    // Lazy rendering: no need to re-render dots as pattern doesn't change
    if ($("#pattern_wrapper").attr("pattern") == "line") return;

    $("#pattern_wrapper").load("patterns/line.svg");
    $("#pattern_wrapper").attr("pattern", "line")

    default_dim();
}