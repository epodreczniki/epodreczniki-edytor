function exerciseOpenDialog(evt) {
    var node = evt.childNode;
    if (node.getLocalName() != "exercise" || !isExerciseEmpty(node)) return;
    dialogNode = node;
    dialogEditor = Editor;
    dialogWindow = Editor.getModalDialog();
    dialogWindow.open("html-extra/exercise-dialog.html", "Zadanie", function() {
        if (isExerciseEmpty(dialogNode)) {
            var parent = dialogNode.getParentNode();
            parent.removeChild(dialogNode);
        }
        dialogNode = null;
    }, true);
    return true;
}

function isExerciseEmpty(node) {
    return node !== null && node.getChildNodes().getLength() == 0;
}

function removeExercise(evt) {
    if (evt.duringUndoOrRedo && evt.target.getLocalName() == "exercise" && evt.target.getChildNodes().getLength() == 0 && evt.childNode.getLocalName() != "review") {
        var parent = evt.target.getParentNode();
        parent.removeChild(evt.target);
        return true;
    }
    return false;
}

function exerciseConfigOpenDialog(element, node) {
    dialogNode = node;
    dialogEditor = Editor;
    exerciseTmp = {
        elementNode: element
    };
    dialogWindow = Editor.getModalDialog();
    dialogWindow.resizeTo(560, 400);
    dialogWindow.open("html-extra/exercise-config-dialog.html", "Edytuj quiz", function() {
        dialogNode = null;
        exerciseTmp = {};
        $(element).closest(".validation").find(".check").trigger("click");
    }, true);
    return true;
}