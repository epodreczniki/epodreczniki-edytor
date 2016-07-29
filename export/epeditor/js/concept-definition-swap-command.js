Editor.getScope().declare("concDefSwap", false);

var conceptDefinitionSwapCommand = {
    execute: function(scope) {
        var range = Editor.Selection.getRange();
        var document = Editor.getActiveDocument();
        var rangeStartDefinitionAncestor = range.getStartContainer().selectSingleNode("./ancestor-or-self::*[local-name()='definition']");
        var rangeEndDefinitionAncestor = range.getEndContainer().selectSingleNode("./ancestor-or-self::*[local-name()='definition']");
        var rangeStartConceptAncestor = range.getStartContainer().selectSingleNode("./ancestor-or-self::*[local-name()='concept']");
        var rangeEndConceptAncestor = range.getEndContainer().selectSingleNode("./ancestor-or-self::*[local-name()='concept']");
        if (rangeStartDefinitionAncestor != null && rangeStartDefinitionAncestor == rangeEndDefinitionAncestor) {
            definitionToConcept(rangeStartDefinitionAncestor, document);
        } else {
            if (rangeStartConceptAncestor != null && rangeStartConceptAncestor == rangeEndConceptAncestor) {
                conceptToDefinition(rangeStartConceptAncestor, document);
            }
        }
    },
    getEnabled: function(scope) {
        var canvas = Editor.Canvas.getActiveCanvas();
        if (!canvas) return false;
        var xmlSelect = scope.get("xmlSelection");
        var range = xmlSelect.getRange();
        if (range != null) {
            var rangeStartDefinitionAncestor = range.getStartContainer().selectSingleNode("./ancestor-or-self::*[local-name()='definition']");
            var rangeEndDefinitionAncestor = range.getEndContainer().selectSingleNode("./ancestor-or-self::*[local-name()='definition']");
            var rangeStartConceptAncestor = range.getStartContainer().selectSingleNode("./ancestor-or-self::*[local-name()='concept']");
            var rangeEndConceptAncestor = range.getEndContainer().selectSingleNode("./ancestor-or-self::*[local-name()='concept']");
            return rangeStartDefinitionAncestor != null && rangeStartDefinitionAncestor == rangeEndDefinitionAncestor || rangeStartConceptAncestor != null && rangeStartConceptAncestor == rangeEndConceptAncestor;
        } else {
            return false;
        }
    },
    getChecked: function(scope) {
        return scope.get("concDefSwap");
    },
    getLabel: function(scope) {
        return "Zamień: definicja ↔ pojęcie";
    }
};

Editor.addCommand("conceptDefinitionSwapCommand", conceptDefinitionSwapCommand);