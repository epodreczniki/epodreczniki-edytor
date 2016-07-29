Editor.getScope().declare("whiteSpaceView", false);

var whiteSpaceViewCommand = {
    execute: function(scope) {
        if (Editor.getActiveCanvas().getViewParam("whiteSpaceView") == "true") {
            Editor.getActiveCanvas().setViewParam("whiteSpaceView", "false");
        } else {
            Editor.getActiveCanvas().setViewParam("whiteSpaceView", "true");
        }
        scope.set("whiteSpaceView", !scope.get("whiteSpaceView"));
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        return !!canvas;
    },
    getChecked: function(scope) {
        return scope.get("whiteSpaceView");
    },
    getLabel: function(scope) {
        if (scope.get("whiteSpaceView")) return "Ukryj białe znaki"; else return "Pokaż białe znaki";
    }
};

Editor.addCommand("whiteSpaceViewCommand", whiteSpaceViewCommand);