var WOMIURI = "http://www.epo.pl";

$(document).ready(function() {
    var node = null;
    if(getWindow().dialogNode != null) {
	node = getWindow().dialogNode;
	if(node.getLocalName() != 'reference')
		node = parent.dialogArguments.node;
    } else {
	node = parent.dialogArguments.node;
    }
    var form = $("#womi_form");
    setFormValues(form, node);
    parent.Editor.getModalDialog().resizeTo(form.outerWidth(true), Math.min(form.outerHeight(true), 500));
    form.find(".form_grid .value button").on("click", onValueButtonClick);
    $("#width_slider").on("change", function() {
        $("#width_value").val($(this).val());
    });
    $("#width_value").on("change", function() {
        var v = $(this).val();
        if (v > 100) v = 100;
        if (v < 25) v = 25;
        $(this).val(v);
        $("#width_slider").val(v);
    });
    form.find(".preview").on("click", function() {
        window.open(WOMIURI + "/preview/reader/w/" + node.selectSingleNode("./@*[local-name()='id']").getNodeValue() + "/v/1/embed", "_blank");
        return false;
    });
    form.find(".functional_buttons button.cancel").on("click", closeDialog);
    form.find(".functional_buttons button.save").on("click", saveAndCloseDialog);
});

function onValueButtonClick() {
    $(this).parent().find("button").removeClass("active");
    $(this).addClass("active");
    return false;
}

function setWomiWidthOnForm(form, val) {
    form.find(".form_grid .max_width .value input").val(val);
}

function setEmbeddedContextOnForm(form, emb, con) {
    var button = form.find(".form_grid .context_embeded .value");
    if (emb && con) {
        button = form.find("button[name='embedded&context']");
    } else if (emb) {
        button = form.find("button[name='embedded']");
    } else if (con) {
        button = form.find("button[name='context']");
    } else {
        return;
    }
    button.addClass("active");
}

function getEmbeddedValFromForm(form) {
    var tmp = form.find(".form_grid .context_embeded .value button.active");
    return tmp.attr("name") == "embedded" || tmp.attr("name") == "embedded&context";
}

function getContextValFromForm(form) {
    var tmp = form.find(".form_grid .context_embeded .value button.active");
    return tmp.attr("name") == "context" || tmp.attr("name") == "embedded&context";
}

function setWomiAvatarOnForm(form, val) {
    form.find(".form_grid .avatar .value input").prop("checked", val);
}

function getWOMITypeName(type) {
    switch (type) {
      case "graphics":
        return "Ilustracja";

      case "icon":
        return "Ikona";

      case "movie":
        return "Film";

      case "sound":
        return "Klip dźwiękowy";

      case "interactive":
        return "Obiekt interaktywny";
    }
    return "Nieznany";
}

function setFormValues(form, node) {
    var child, child2;
    if(node.selectSingleNode("./@*[local-name()='id']") != null)
	form.find(".identifier .id_value").text("ID: "+node.selectSingleNode("./@*[local-name()='id']").getNodeValue());
    if (node.selectSingleNode("./*[local-name()='title']") != null) {
        form.find(".title .title_value").text("Tytuł: " + node.selectSingleNode("./*[local-name()='title']").getTextContent());
        var womi_type_div = form.find(".womi_type");
        var womi_type = node.selectSingleNode("./*[local-name()='womiType']").getTextContent();
        womi_type_div.addClass(womi_type);
        womi_type_div.attr("title", getWOMITypeName(womi_type));
    }
    child = node.selectSingleNode("./*[local-name()='width']");
    if (child === null) form.find(".form_grid .max_width").css("display", "none"); else setWomiWidthOnForm(form, child.getTextContent());
    child = node.selectSingleNode("./*[local-name()='embedded']");
    child2 = node.selectSingleNode("./*[local-name()='context']");
    if (child === null && child2 === null) form.find(".form_grid .context_embeded").css("display", "none"); else setEmbeddedContextOnForm(form, !!child && child.getTextContent() == "true", !!child2 && child2.getTextContent() == "true");
    child = node.selectSingleNode("./*[local-name()='avatar']");
    if (child === null) form.find(".form_grid .avatar").css("display", "none"); else setWomiAvatarOnForm(form, child.getTextContent() == "true");
    [ "hide-caption", "zoomable" ].forEach(function(e) {
        var attrNode = node.selectSingleNode("./*[local-name()='" + e + "']");
        if (attrNode === null) {
            form.find(".form_grid ." + womiAttrToCss(e)).css("display", "none");
            return;
        }
        var value = attrNode.getTextContent();
        var field = form.find(".form_grid ." + womiAttrToCss(e) + " .value button[name='" + value + "']");
        field.addClass("active");
    });
    var aside = node.selectSingleNode("./*[local-name()='aside']");
    var value = aside ? aside.getTextContent() : "normal";
    form.find(".form_grid ." + womiAttrToCss("aside") + " .value button[name='" + value + "']").addClass("active");
}

function cssToWomiAttr(css) {
    switch (css) {
      case "max_width":
        return "width";

      case "context_embeded":
        return "embedded";

      case "hide-caption":
      case "zoomable":
      case "avatar":
      case "aside":
        return attr;
    }
    return null;
}

function womiAttrToCss(attr) {
    switch (attr) {
      case "width":
        return "max_width";

      case "embedded":
        return "context_embeded";

      case "hide-caption":
      case "zoomable":
      case "avatar":
      case "aside":
        return attr;
    }
    return null;
}

function setNodeValues(form, node) {
    var child, child2;
    child = node.selectSingleNode("./*[local-name()='width']");
    if (child !== null) child.setTextContent(form.find(".form_grid .max_width .value input").val());
    child = node.selectSingleNode("./*[local-name()='embedded']");
    child2 = node.selectSingleNode("./*[local-name()='context']");
    if (child !== null && child2 !== null) {
        child.setTextContent(getEmbeddedValFromForm(form) ? "true" : "false");
        child2.setTextContent(getContextValFromForm(form) ? "true" : "false");
    }
    child = node.selectSingleNode("./*[local-name()='avatar']");
    if (child !== null) child.setTextContent(form.find(".form_grid .avatar .value input").prop("checked"));
    [ "hide-caption", "zoomable" ].forEach(function(e) {
        var attrNode = node.selectSingleNode("./*[local-name()='" + e + "']");
        if (attrNode === null) {
            return;
        }
        var field = form.find(".form_grid ." + womiAttrToCss(e) + " .value button.active");
        attrNode.setTextContent(field.attr("name"));
    });
    var aside = node.selectSingleNode("./*[local-name()='aside']");
    var asideNewVal = form.find(".form_grid ." + womiAttrToCss("aside") + " .value button.active").attr("name");
    if (asideNewVal != "normal") {
        console.log("A", asideNewVal, aside);
        if (!aside) {
            var tmpNode = node.selectSingleNode("./*[namespace-uri()='" + EPE_XML_URI + "' or local-name()='content']");
            console.log(tmpNode);
            aside = node.getOwnerDocument().createElementNS(EP_XML_URI, "aside");
            node.insertBefore(aside, tmpNode);
        }
        aside.setTextContent(asideNewVal);
    } else if (aside) {
        node.removeChild(aside);
    }
}

setNodeValues = parent.Editor.wrapInTransaction(setNodeValues);

function saveAndCloseDialog(evt) {
    evt.preventDefault();
    var node = getWindow().dialogNode;
    var form = $("#womi_form");
    setNodeValues(form, node);
    closeDialog();
}
