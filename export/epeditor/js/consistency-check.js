function consistencyCheck(root) {
    var glossaryUniqueValidator = new GlossaryUniqueValidator(root);
    var linkValidator = new LinkValidator(root);
    var referenceValidator = new ReferenceValidator(root);
    return glossaryUniqueValidator.validate() && linkValidator.validate() && referenceValidator.validate();
}

function xmlNodeListToArray(nodesList) {
    var arr = [];
    arr.length = nodesList.length;
    for (var i = 0, ll = nodesList.length; i < ll; i++) arr[i] = nodesList.item(i);
    return arr;
}

function GlossaryUniqueValidator(root) {
    this.root = root;
    this.glossaryContainers = [ "biography", "event", "definition", "concept", "rule", "entry" ];
}

GlossaryUniqueValidator.prototype.validate = function() {
    var gv = this;
    for (var i = 0; i < this.glossaryContainers.length; i++) {
        var nodes;
        if (this.glossaryContainers[i] == "entry") nodes = this.root.selectNodes("./*[local-name()='file']/*[local-name()='" + this.glossaryContainers[i] + "']"); else nodes = this.root.selectNodes("//*[local-name()='" + this.glossaryContainers[i] + "']");
        var nodesArray = xmlNodeListToArray(nodes);
        nodesArray.sort(function(e1, e2) {
            return gv.comparator(e1, e2);
        });
        for (var j = 1; j < nodesArray.length; j++) {
            if (this.comparator(nodesArray[j - 1], nodesArray[j]) == 0) {
                openDialog(null, nodesArray[j], "html-extra/cannot-save/glossary-unique.html", "Błąd walidacji");
                return false;
            }
        }
    }
    return true;
};

GlossaryUniqueValidator.prototype.comparator = function(node1, node2) {
    if (node1 == null || node2 == null || node1.localName != node2.localName) return -1;
    var result = -1;
    switch (node1.localName) {
      case "biography":
      case "event":
        result = this.compareChild(node1, node2, "name");
        break;

      case "definition":
      case "concept":
        result = this.compareChild(node1, node2, "term");
        break;

      case "rule":
        result = this.compareChild(node1, node2, "title");
        break;

      case "entry":
        result = this.compareBib(node1, node2);
        break;
    }
    return result;
};

GlossaryUniqueValidator.prototype.compareChild = function(node1, node2, childName) {
    var child1 = node1.selectSingleNode("./*[local-name()='" + childName + "']").textContent.toLowerCase();
    var child2 = node2.selectSingleNode("./*[local-name()='" + childName + "']").textContent.toLowerCase();
    return (child1 > child2) - (child1 < child2);
};

GlossaryUniqueValidator.prototype.compareBib = function(node1, node2) {
    var a1 = node1.selectSingleNode("./@*[local-name()='target-name']").textContent.toLowerCase();
    var a2 = node2.selectSingleNode("./@*[local-name()='target-name']").textContent.toLowerCase();
    return (a1 > a2) - (a1 < a2);
};

function LinkValidator(root) {
    this.root = root;
}

LinkValidator.prototype.validate = function() {
    var nodes = this.root.selectNodes("//*[local-name()='link' and not(./@*[local-name()='document'])]/@*[local-name()='target-id']");
    for (var i = 0; i < nodes.length; i++) {
        var targetId = nodes.item(i).textContent;
        var bookmark = this.root.selectSingleNode("//*[local-name()='bookmark' and ./@*[local-name()='id' and .='" + targetId + "']]");
        if (!bookmark) {
            openDialog(null, null, "html-extra/cannot-save/missing-link.html", "Błąd walidacji");
            return false;
        }
    }
    return true;
};

function ReferenceValidator(root) {
    this.root = root;
    this.referenceContainers = [ {
        element: "biography",
        reference: "biography-reference"
    }, {
        element: "event",
        reference: "event-reference"
    }, {
        element: "definition|rule",
        reference: "glossary-reference"
    }, {
        element: "concept",
        reference: "concept-reference"
    }, {
        element: "entry",
        reference: "bibliography-reference"
    }, {
        element: "tooltip",
        reference: "tooltip-reference"
    } ];
}

ReferenceValidator.prototype.validate = function() {
    var rv = this;
    for (var i = 0; i < this.referenceContainers.length; i++) {
        var nodes = this.root.selectNodes("//*[local-name()='" + this.referenceContainers[i].reference + "' and 			./@*[local-name()='local-reference' and .='true']]");
        for (var j = 0; j < nodes.length; j++) {
            var reference = nodes.item(j);
            var element = this.root.selectSingleNode(this.getElementXPath(this.referenceContainers[i].element, reference));
            if (!element) {
                openDialog(null, reference, "html-extra/cannot-save/missing-reference.html", "Błąd walidacji");
                return false;
            }
        }
    }
    return true;
};

ReferenceValidator.prototype.getElementXPath = function(elementName, reference) {
    var xpath = "";
    if (elementName == "entry" && reference.parentNode.localName == "source") xpath = "./*[local-name()='file']/*[local-name()='" + elementName + "' and 			./@*[local-name()='id' and .='" + reference.selectSingleNode("./@*[local-name()='id']").textContent + "']]"; else if (elementName == "entry") xpath = "./*[local-name()='file']/*[local-name()='" + elementName + "' and 			./@*[local-name()='target-name' and .='" + reference.selectSingleNode("./@*[local-name()='target-name']").textContent + "']]"; else if (elementName == "definition|rule") xpath = "//*[(local-name()='definition' or local-name()='rule') and 			./@*[local-name()='id' and .='" + reference.selectSingleNode("./@*[local-name()='id']").textContent + "']]"; else xpath = "//*[local-name()='" + elementName + "' and 			./@*[local-name()='id' and .='" + reference.selectSingleNode("./@*[local-name()='id']").textContent + "']]";
    return xpath;
};