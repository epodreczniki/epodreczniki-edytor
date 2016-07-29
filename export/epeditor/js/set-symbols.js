function setExtraSymbols() {
    extendSymbols([ "&#x2013", "&#x201e", "&#x201d" ]);
}

function extendSymbols(arr) {
    Editor.setSymbols(null);
    var base = Editor.getSymbols();
    extended = base.concat(arr);
    Editor.setSymbols(extended);
}