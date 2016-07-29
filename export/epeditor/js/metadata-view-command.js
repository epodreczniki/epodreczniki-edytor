Editor.getScope().declare("metadataView", false);

var metadataViewCommand = {
    execute: function(scope) {
        if (Editor.getActiveCanvas().getViewParam("metadataView") == "true") Editor.getActiveCanvas().setViewParam("metadataView", "false"); else Editor.getActiveCanvas().setViewParam("metadataView", "true");
        scope.set("metadataView", !scope.get("metadataView"));
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        return !!canvas;
    },
    getChecked: function(scope) {
        return scope.get("metadataView");
    },
    getLabel: function(scope) {
        if (scope.get("metadataView")) return "Widok główny"; else return "Widok metadanych";
    }
};

Editor.addCommand("metadataViewCommand", metadataViewCommand);