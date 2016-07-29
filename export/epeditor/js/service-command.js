Editor.getScope().declare("serviceView", false);

var serviceViewCommand = {
    execute: function(scope) {
        openDialog(null, Editor.getActiveDocument(), "html-extra/service-dialog.html", "Serwis");
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        return !!canvas;
    },
    getChecked: function(scope) {
        return false;
    },
    getLabel: function(scope) {
        return "Dialog serwisowy";
    }
};

Editor.addCommand("serviceDialogCommand", serviceViewCommand);