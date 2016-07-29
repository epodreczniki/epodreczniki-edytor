function ExerciseAlternativeGenerator(node) {
    this.node = node;
    if (node !== null) {
        this.classicAlternative = node.selectSingleNode("./*[local-name()='alternatives']/*[local-name()='alternative' 			and ./*[local-name()='item'] and ./*[local-name()='formats']/*[local-name()='format' and .= 'classicmobile'] 			]");
        this.staticAlternative = node.selectSingleNode("./*[local-name()='alternatives']/*[local-name()='alternative' 			and ./*[local-name()='item'] and ./*[local-name()='formats']/*[local-name()='format' and (.= 'static' or .='static-mono')] 			]");
    }
}

ExerciseAlternativeGenerator.prototype.generate = function() {
    if (!this.node || !this.classicAlternative || !this.staticAlternative) return false;
    var staticItem = this.cloneClassicToStatic();
    if (this.isRandomize()) {
        var presentedAnswers = this.getPresentedAnswers();
        var answers = staticItem.selectNodes("./*[local-name()='answer']");
        for (var i = presentedAnswers; i < answers.getLength(); i++) {
            staticItem.removeChild(answers.item(i));
        }
        return true;
    }
    var epSets = staticItem.selectNodes("./*[local-name()='set']");
    for (var i = 1; i < epSets.getLength(); i++) {
        staticItem.removeChild(epSets.item(i));
    }
    return true;
};

ExerciseAlternativeGenerator.prototype.isRandomize = function() {
    return !!this.classicAlternative.selectSingleNode("./*[local-name()='config']/*[local-name()='behaviour' and .='randomize']");
};

ExerciseAlternativeGenerator.prototype.getPresentedAnswers = function() {
    return this.classicAlternative.selectSingleNode("./*[local-name()='config']/*[local-name()='presented-answers']").getTextContent();
};

ExerciseAlternativeGenerator.prototype.cloneClassicToStatic = function() {
    var classicItem = this.classicAlternative.selectSingleNode("./*[local-name()='item']");
    var staticItem = this.staticAlternative.selectSingleNode("./*[local-name()='item']");
    this.staticAlternative.removeChild(staticItem);
    staticItem = classicItem.cloneNode(true);
    staticItem = this.staticAlternative.appendChild(staticItem);
    this.regenerateId(staticItem);
    return staticItem;
};

ExerciseAlternativeGenerator.prototype.regenerateId = function(node) {
    if (!node || node.getNodeType() != 1) return;
    if (/^(|.*\-)reference$/.test(node.getLocalName())) {
        var id = generateNextId(node);
        var idNode = node.selectSingleNode("./@*[local-name()='instance-id']");
        if (!!idNode) idNode.setNodeValue(id);
    } else {
        var id = generateNextId(node);
        var idNode = node.selectSingleNode("./@*[local-name()='id']");
        if (!!idNode) idNode.setNodeValue(id);
    }
    var childs = node.getChildNodes();
    for (var i = 0; i < childs.getLength(); i++) {
        this.regenerateId(childs.item(i));
    }
};