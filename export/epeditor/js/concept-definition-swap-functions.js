function conceptToDefinition(concept, document) {
    var definition = document.createElementNS(CNX_XML_URI, "definition");
    var oldId = concept.getAttribute("id");
    definition.setAttribute("id", "");
    addId(definition);
    definition.setAttributeNS(EP_XML_URI, "ep:glossary", concept.getAttributeNS(EP_XML_URI, "glossary"));
    var children = concept.getChildNodes();
    for (var i = 0; i < children.getLength(); i++) {
        definition.appendChild(children.item(i));
    }
    concept.getParentNode().insertAfter(definition, concept);
    concept.getParentNode().removeChild(concept);
    conceptReferenceToGlossaryRefernces(document, oldId, definition.getAttribute("id"));
}

conceptToDefinition = parent.Editor.wrapInTransaction(conceptToDefinition);

function definitionToConcept(definition, document) {
    var concept = document.createElementNS(EP_XML_URI, "ep:concept");
    var oldId = definition.getAttribute("id");
    concept.setAttribute("id", "");
    addId(concept);
    concept.setAttributeNS(EP_XML_URI, "ep:glossary", definition.getAttributeNS(EP_XML_URI, "glossary"));
    var children = definition.getChildNodes();
    for (var i = 0; i < children.getLength(); i++) {
        concept.appendChild(children.item(i));
    }
    definition.getParentNode().insertAfter(concept, definition);
    definition.getParentNode().removeChild(definition);
    glossaryReferncesToConceptReference(document, oldId, concept.getAttribute("id"));
}

definitionToConcept = parent.Editor.wrapInTransaction(definitionToConcept);

function conceptReferenceToGlossaryRefernces(document, oldId, newId) {
    var conceptReferences = document.selectNodes(".//*[local-name()='concept-reference' and ./@*[local-name()='id' and .='" + oldId + "']]");
    for (var i = 0; i < conceptReferences.getLength(); i++) {
        var glossaryReference = document.createElementNS(EP_XML_URI, "glossary-reference");
        var conceptReference = conceptReferences.item(i);
        glossaryReference.setAttributeNS(EP_XML_URI, "ep:id", newId);
        glossaryReference.setAttributeNS(EP_XML_URI, "ep:target-name", conceptReference.getAttributeNS(EP_XML_URI, "target-name"));
        glossaryReference.setAttributeNS(EP_XML_URI, "ep:local-reference", conceptReference.getAttributeNS(EP_XML_URI, "local-reference"));
        var children = conceptReference.getChildNodes();
        for (var j = 0; j < children.getLength(); j++) glossaryReference.appendChild(children.item(j));
        conceptReference.getParentNode().insertAfter(glossaryReference, conceptReference);
        conceptReference.getParentNode().removeChild(conceptReference);
    }
}

function glossaryReferncesToConceptReference(document, oldId, newId) {
    var glossaryReferences = document.selectNodes(".//*[local-name()='glossary-reference' and ./@*[local-name()='id' and .='" + oldId + "']]");
    for (var i = 0; i < glossaryReferences.getLength(); i++) {
        var conceptReference = document.createElementNS(EP_XML_URI, "concept-reference");
        var glossaryReference = glossaryReferences.item(i);
        conceptReference.setAttributeNS(EP_XML_URI, "ep:id", newId);
        conceptReference.setAttributeNS(EP_XML_URI, "ep:target-name", glossaryReference.getAttributeNS(EP_XML_URI, "target-name"));
        conceptReference.setAttributeNS(EP_XML_URI, "ep:local-reference", glossaryReference.getAttributeNS(EP_XML_URI, "local-reference"));
        var children = glossaryReference.getChildNodes();
        for (var j = 0; j < children.getLength(); j++) conceptReference.appendChild(children.item(j));
        glossaryReference.getParentNode().insertAfter(conceptReference, glossaryReference);
        glossaryReference.getParentNode().removeChild(glossaryReference);
    }
}