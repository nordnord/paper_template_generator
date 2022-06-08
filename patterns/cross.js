function cross_render(){
    // Lazy rendering: no need to re-render dots as pattern doesn't change
    if ($("#pattern_wrapper").attr("pattern") == "cross") return;

    $("#pattern_wrapper").load("patterns/cross.svg");
    $("#pattern_wrapper").attr("pattern", "cross")

    cross_dim();
}

function cross_dim(){
    default_dim();
}