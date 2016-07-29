function onAlternativesChange(element) {
    var e = $(element);
    var format = e.val().split(" ")[0];
    var alternativesContainer = e.closest(".alternatives");
    var alternative = alternativesContainer.find(".alternative").addClass("hidden").filter(function() {
        return $(this).data("formats").split(" ").indexOf(format) >= 0;
    }).removeClass("hidden");
    return false;
}