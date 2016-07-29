function insertMetadata() {
		var xmlDoc = null;
		var node = null;
		var manifest = null;
		var metadata = null;
		var child = null;
		var child2 = null;
		for(var j = 2; j < arguments.length; j+=3) {
			node = arguments[j-2];
			manifest = arguments[j-1][0];
			metadata = arguments[j][0];
			child = null;
			if(j == 2) {
				xmlDoc = node.getOwnerDocument();
			}
			if(child = node.selectSingleNode("*[local-name() = 'author']") ) {
				if(child.getTextContent() != metadata.author)
					child.setTextContent(metadata.author);
			} else {
				child = xmlDoc.createElementNS(EPE_XML_URI, "author");
				child.setTextContent(metadata.author);
				child = node.appendChild(child);
			}

			if(child = node.selectSingleNode("*[local-name() = 'license']")) {
				if(child.getTextContent() != metadata.license)
					child.setTextContent(metadata.license);
				if(child.hasAttribute('url')) {
					child.removeAttribute('url');
				}
			} else {
				child = xmlDoc.createElementNS(EPE_XML_URI, "license");
				child.setTextContent(metadata.license);
				child = node.appendChild(child);
			}
			var title = metadata.title;
			if(title == null && metadata.fullMetadata != null && metadata.fullMetadata.IdentyfikatorWlasny != null) {
				title = metadata.fullMetadata.IdentyfikatorWlasny;
			}
			if(title == null || title == "") {
				title = metadata.customId;
			}
			
			if(child = node.selectSingleNode("*[local-name() = 'title']")) {
				if(child.getTextContent() != title)
					child.setTextContent(title);
			} else {
				child = xmlDoc.createElementNS(EPE_XML_URI, "title");
				child.setTextContent(title);
				child = node.appendChild(child);
			}

			if(child = node.selectSingleNode("*[local-name() = 'alternativeText']")) {
				if(child.getTextContent() != metadata.alternativeText)
					child.setTextContent(metadata.alternativeText);
			} else {
				child = xmlDoc.createElementNS(EPE_XML_URI, "alternativeText");
				child.setTextContent(metadata.alternativeText);
				child = node.appendChild(child);
			}

			if(child = node.selectSingleNode("*[local-name() = 'womiType']")) {
				if(child.getTextContent() != metadata.womiType)
					child.setTextContent(metadata.womiType);
			} else {
				child = xmlDoc.createElementNS(EPE_XML_URI, "womiType");
				child.setTextContent(metadata.womiType);
				child = node.appendChild(child);
			}

			if(manifest.hasOwnProperty('engine')) {
				if(child = node.selectSingleNode("*[local-name() = 'engine']")) {
					if(child.getTextContent() != manifest.engine)
						child.setTextContent(manifest.engine);
				} else {
					child = xmlDoc.createElementNS(EPE_XML_URI, "engine");
					child.setTextContent(manifest.engine);
					child = node.appendChild(child);
				}
			}
			if(metadata.hasOwnProperty('fullMetadata') && metadata.fullMetadata.hasOwnProperty('StanWeryfikacji')) {
				if(child = node.selectSingleNode("*[local-name() = 'StanWeryfikacji']")) {
					if(child.getTextContent() != metadata.fullMetadata.StanWeryfikacji)
						child.setTextContent(metadata.fullMetadata.StanWeryfikacji);
				} else {
					child = xmlDoc.createElementNS(EPE_XML_URI, "StanWeryfikacji");
					child.setTextContent(metadata.fullMetadata.StanWeryfikacji);
					child = node.appendChild(child);
				}
			}
			node.makeValid();
		}
	}

insertMetadata = Editor.wrapInTransaction(insertMetadata);

function updateWomiMetadataInModule(evt) {
	var xmlDoc = evt.document;
	if(xmlDoc.getDocumentURI().indexOf("document_reading.xml") > -1)
		return
	var docElement = xmlDoc.getDocumentElement();
	var nodes = docElement.selectNodes("//*[local-name() = 'reference']");
	loadWomiMetadata(nodes);
}

function loadWomiMetadata(nodes) {
    showLoadingIndicator();
    var callingFunction = arguments.callee.caller.name;
    var deferreds = [];
    var xmlDoc = null;
    if (nodes.getLength() > 0) xmlDoc = nodes.item(0).getOwnerDocument();
    var previewAddr = "http://preview.epo.pl/content/womi/";
    for (var i = 0; i < nodes.getLength(); i++) {
        node = nodes.item(i);
        if (i == 0) {
            xmlDoc = node.getOwnerDocument();
        }
        deferreds.push(node);
        deferreds.push($.ajax({
            url: previewAddr + node.getAttributeNS(EP_XML_URI,'id') + "/manifest.json",
            async: true,
            dataType: "json"
        }));
        deferreds.push($.ajax({
            url: previewAddr + node.getAttributeNS(EP_XML_URI,'id') + "/metadata.json",
            async: true,
            dataType: "json"
        }));
    }
    $.when.apply($, deferreds).then(insertMetadata).then(function() {
        if (callingFunction != "choose") {
            loadingWomiMetadata = 0;
            if (nodes.getLength() > 0) {
                firstSave = 1;
                xmlDoc.save();
                console.log('xmlDoc saved.');
            } else {
                console.log('xmlDoc not saved. There are no WOMIs');
            }

		}
	}).fail(function(){
	    console.log('loadWomiMetadata ajax fail');
	}).always(function(){
		console.log('loadWomiMetadata ajax always');
		hideLoadingIndicator();
	});
	console.log('end loadWomiMetadata() ');
}

function showLoadingIndicator() {

    if ($("#loading-metadata").length==0) {
        $("body").append($("<div id='loading-metadata'>Ładowanie danych womi</div>"));

    }
    $("#loading-metadata").show();
    $(window.parent.document.getElementById('SaveButton')).removeClass("enabled-toolbarbutton").addClass("disabled-toolbarbutton");
}

function hideLoadingIndicator() {
    $("#loading-metadata").hide();
}
