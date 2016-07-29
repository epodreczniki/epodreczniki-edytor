Array.prototype.extend = function(other_array) {
    other_array.forEach(function(v) {
        this.push(v);
    }, this);
};

function getDocument() {
    var canvas = parent.Editor.getActiveCanvas();
    return canvas.getCanvasElement().ownerDocument;
}

function getWindow() {
    var doc = getDocument();
    var win = doc.parentWindow || doc.defaultView;
    if (win.dialogEditor && win.dialogNode) return win;
    return parent;
}

function go() {
    return false;
}

function choose(target) {
    var result = {};
    result["id"] = target;
    parent.choose(result);
}

function onValueButtonClick() {
    var isActive = $(this).hasClass("active");
    $(this).parent().find("button").removeClass("active");
    if (!isActive) {
        $(this).addClass("active");
    } else {
        if ($(this).parent().parent().hasClass("playlist")) $(this).addClass("active");
    }
    return false;
}

var galleryNode = null;

window.onload = function() {
    galleryNode = null;
    if (getWindow().dialogNode != null) {
        galleryNode = getWindow().dialogNode;
        if (galleryNode.getLocalName() == "reference") galleryNode = parent.dialogArguments.node;
    } else {
        galleryNode = parent.dialogArguments.node;
    }
    if (galleryNode == null) {
        console.log("Node is null!");
        return;
    }
    var form = $("#womi_gallery_form");
    $(".gallery_A").hide();
    $(".gallery_B").hide();
    $(".gallery_C").hide();
    $(".gallery_D").hide();
    setFormValues(form, galleryNode);
    parent.Editor.getModalDialog().resizeTo(810, form.outerHeight(true) + 1);
    $("#gallery_A_bt").click(function() {
        $(".gallery_A").show();
        $(".gallery_B").hide();
        $(".gallery_C").hide();
        $(".gallery_D").hide();
        parent.Editor.getModalDialog().resizeTo(810, form.outerHeight(true) + 1);
        return false;
    });
    $("#gallery_B_bt").click(function() {
        $(".gallery_A").hide();
        $(".gallery_B").show();
        $(".gallery_C").hide();
        $(".gallery_D").hide();
        parent.Editor.getModalDialog().resizeTo(810, form.outerHeight(true) + 1);
        return false;
    });
    $("#gallery_C_bt").click(function() {
        $(".gallery_A").hide();
        $(".gallery_B").hide();
        $(".gallery_C").show();
        $(".gallery_D").hide();
        parent.Editor.getModalDialog().resizeTo(810, form.outerHeight(true) + 1);
        return false;
    });
    $("#gallery_D_bt").click(function() {
        $(".gallery_A").hide();
        $(".gallery_B").hide();
        $(".gallery_C").hide();
        $(".gallery_D").show();
        parent.Editor.getModalDialog().resizeTo(810, form.outerHeight(true) + 1);
        return false;
    });
    form.find(".form_grid .value button").on("click", onValueButtonClick);
    form.find(".form_grid .value input").on("change", formValidator);
    form.find(".functional_buttons button.cancel").on("click", closeDialog);
    form.find(".functional_buttons button.save").on("click", saveAndCloseDialog);
};

function setFormValues(form, node) {
    var child, child2;
    $("#gallery_A_bt").removeClass("active");
    $(".gallery_A button").removeClass("active");
    child = node.selectSingleNode("./@*[local-name()='view-width']");
    if (child != null) {
        console.log("gallery B");
        $(".gallery_B").show();
        $("#gallery_B_bt").addClass("active");
        $(".gallery_B #view-width_value").val(child.getValue());
        $(".gallery_B #view-height_value").val(node.selectSingleNode("./@*[local-name()='view-height']").getValue());
    } else {
        child = node.selectSingleNode("./@*[local-name()='miniatures-only']");
        if (child != null) {
            console.log("gallery C");
            $(".gallery_C").show();
            $("#gallery_C_bt").addClass("active");
            $(".gallery_C #miniatures-only").prop("checked", child.getTextContent() == "true");
            var thumbnails = node.selectSingleNode("./@*[local-name()='thumbnails']");
            if (thumbnails != null) $(".gallery_C .thumbnails ." + thumbnails.getValue()).addClass("active");
            var titles = node.selectSingleNode("./@*[local-name()='titles']");
            if (titles != null) $(".gallery_C .titles ." + titles.getValue()).addClass("active");
            var format_contents = node.selectSingleNode("./@*[local-name()='format-contents']");
            if (format_contents != null) $(".gallery_C .format-contents ." + format_contents.getValue()).addClass("active");
        } else {
            child = node.selectSingleNode("./@*[local-name()='playlist']");
            if (child != null) {
                console.log("gallery D");
                $(".gallery_D").show();
                $("#gallery_D_bt").addClass("active");
                var start_on = node.selectSingleNode("./@*[local-name()='start-on']");
                if (start_on != null) $(".gallery_D #start-on_D_value").val(start_on.getValue());
                var thumbnails = node.selectSingleNode("./@*[local-name()='thumbnails']");
                if (thumbnails != null) $(".gallery_D .thumbnails ." + thumbnails.getValue()).addClass("active");
                var titles = node.selectSingleNode("./@*[local-name()='titles']");
                if (titles != null) $(".gallery_D .titles ." + titles.getValue()).addClass("active");
                var format_contents = node.selectSingleNode("./@*[local-name()='format-contents']");
                if (format_contents != null) $(".gallery_D .format-contents ." + format_contents.getValue()).addClass("active");
                if (child.getValue() != "") {
                    $(".gallery_D .playlist button").removeClass("active");
                }
                $(".gallery_D .playlist ." + child.getValue()).addClass("active");
            } else {
                console.log("gallery A");
                $(".gallery_A").show();
                $("#gallery_A_bt").addClass("active");
                var start_on = node.selectSingleNode("./@*[local-name()='start-on']");
                if (start_on != null) $(".gallery_A #start-on_A_value").val(start_on.getValue());
                var thumbnails = node.selectSingleNode("./@*[local-name()='thumbnails']");
                if (thumbnails != null) $(".gallery_A .thumbnails ." + thumbnails.getValue()).addClass("active");
                var titles = node.selectSingleNode("./@*[local-name()='titles']");
                if (titles != null) $(".gallery_A .titles ." + titles.getValue()).addClass("active");
                var format_contents = node.selectSingleNode("./@*[local-name()='format-contents']");
                if (format_contents != null) $(".gallery_A .format-contents ." + format_contents.getValue()).addClass("active");
            }
        }
    }
}

function getWOMINumber() {
    if (galleryNode == null) return 1;
    var referenceNumber = galleryNode.selectNodes("./*[local-name()='reference']").getLength();
    if (referenceNumber == 0) return 1;
    return referenceNumber;
}

function formValidator() {
    var f_width = $("#view-width_value");
    if (~~Number(f_width.val()) > 0 && ~~Number(f_width.val()) < 9) {
        f_width.addClass("validInput");
        f_width.removeClass("invalidInput");
    } else {
        f_width.addClass("invalidInput");
        f_width.removeClass("validInput");
    }
    var f_height = $("#view-height_value");
    if (~~Number(f_height.val()) > 0 && ~~Number(f_height.val()) < 9) {
        f_height.addClass("validInput");
        f_height.removeClass("invalidInput");
    } else {
        f_height.addClass("invalidInput");
        f_height.removeClass("validInput");
    }
    var f_start_on = $("#start-on_D_value");
    if (f_start_on.val() == "" || ~~Number(f_start_on.val()) > 0 && ~~Number(f_start_on.val()) <= getWOMINumber()) {
        f_start_on.addClass("validInput");
        f_start_on.removeClass("invalidInput");
    } else {
        f_start_on.addClass("invalidInput");
        f_start_on.removeClass("validInput");
    }
    f_start_on = $("#start-on_A_value");
    if (f_start_on.val() == "" || ~~Number(f_start_on.val()) > 0 && ~~Number(f_start_on.val()) <= getWOMINumber()) {
        f_start_on.addClass("validInput");
        f_start_on.removeClass("invalidInput");
    } else {
        f_start_on.addClass("invalidInput");
        f_start_on.removeClass("validInput");
    }
}

function addGalleryId(target) {
    if (target === null) return;
    var id = generateNextId(target);
    [ CNX_XML_URI, EP_XML_URI, EPE_XML_URI ].forEach(function(ns) {
        if (target.getAllowedAttributes().containsNS(ns, "id") || target.hasAttributeNS(ns, "id") && target.getAttributeNS(ns, "id").length == 0) {
            target.setAttributeNS(ns, "id", id);
        }
    });
    if (target.getAllowedAttributes().contains("id") || target.hasAttribute("id") && target.getAttribute("id").length == 0) {
        target.setAttribute("id", id);
    }
}

function setNodeValues(form, node) {
    var galleryType = $(".gallery_type .value .active");
    var galleryPanel = null;
    if (galleryType) {
        galleryPanel = $("div." + galleryType.attr("id").substr(0, 9));
    } else return;
    var attrList = node.getAttributes();
    for (var i = 0; i < attrList.getLength(); i++) {
        var elem = attrList.item(i);
        if (elem.getName() == "ep:id") continue;
        node.removeAttribute(elem.getName());
    }
    switch (galleryType.attr("id")) {
      case "gallery_A_bt":
        if (form.find("#start-on_A_value").val() != "") {
            setAttrOrCreate(node, "start-on", form.find("#start-on_A_value").val());
        }
        [ "thumbnails", "titles", "format-contents" ].forEach(function(e) {
            var field = form.find(".form_grid .gallery_A ." + e + " .value button.active");
            if (field.length > 0) setAttrOrCreate(node, e, field.attr("name"));
        });
        break;

      case "gallery_B_bt":
        setAttrOrCreate(node, "view-width", form.find("#view-width_value").val());
        setAttrOrCreate(node, "view-height", form.find("#view-height_value").val());
        break;

      case "gallery_C_bt":
        setAttrOrCreate(node, "miniatures-only", "true");
        [ "thumbnails", "titles", "format-contents" ].forEach(function(e) {
            var field = form.find(".form_grid .gallery_C ." + e + " .value button.active");
            if (field.length > 0) setAttrOrCreate(node, e, field.attr("name"));
        });
        break;

      case "gallery_D_bt":
        if (form.find("#start-on_D_value").val() != "") {
            setAttrOrCreate(node, "start-on", form.find("#start-on_D_value").val());
        }
        [ "thumbnails", "titles", "format-contents", "playlist" ].forEach(function(e) {
            var field = form.find(".form_grid .gallery_D ." + e + " .value button.active");
            if (field.length > 0) setAttrOrCreate(node, e, field.attr("name"));
        });
        break;
    }
}

setNodeValues = parent.Editor.wrapInTransaction(setNodeValues);

function getAttrOrCreate(node, name) {
    if (node === null) return node;
    var r = node.selectSingleNode("./@*[local-name() = '" + name + "']");
    if (r !== null) return r;
    var child = node.getOwnerDocument().createAttributeNS(EP_XML_URI, name);
    node.setAttributeNode(child);
    return child;
}

function setAttrOrCreate(node, name, value) {
    var tmp = getAttrOrCreate(node, name);
    if (tmp === null) return null;
    tmp.setTextContent(value);
    return tmp;
}

function saveAndCloseDialog(evt) {
    evt.preventDefault();
    if (galleryNode == null) {
        console.log("Node is null!");
        return;
    }
    if ($("#gallery_B_bt").hasClass("active") && ($("#view-width_value").hasClass("invalidInput") || $("#view-height_value").hasClass("invalidInput"))) {
        parent.Editor.alert('Nieprawidłowa wartość w polu "Wysokość"/"Szerokość". \nPrawidłowe wartości to cyfry od 1 do 8');
        return;
    }
    if ($("#gallery_D_bt").hasClass("active") && $("#start-on_D_value").hasClass("invalidInput")) {
        parent.Editor.alert('Nieprawidłowa wartość w polu "Zacznij od".\nPrawidłowe wartości to cyfry od 1 do liczby elementów w galerii.');
        return;
    }
    if ($("#gallery_A_bt").hasClass("active") && $("#start-on_A_value").hasClass("invalidInput")) {
        parent.Editor.alert('Nieprawidłowa wartość w polu "Zacznij od".\nPrawidłowe wartości to cyfry od 1 do liczby elementów w galerii.');
        return;
    }
    var form = $("#womi_gallery_form");
    if (galleryNode.selectSingleNode("./@*[local-name() = 'id']").getValue() == "") {
        choose(generateNextId(galleryNode));
    }
    setNodeValues(form, galleryNode);
    closeDialog();
}

function closeDialog(evt) {
    if (evt !== undefined) {
        evt.preventDefault();
    }
    getWindow().dialogNode = null;
    parent.Editor.getModalDialog().close();
}