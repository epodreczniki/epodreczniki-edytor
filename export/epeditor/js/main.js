var ALLOWED_IFRAME_URLS = [ "http://www.epo.pl" ];

var parentIFrameURL = "UNINITIALIZED";

var strModuleXML = null;

var firstSave = 0;

var loadingWomiMetadata = 1;

var saveCustomXMLCallback = null;

function checkMessage(data, msg) {
    return data.slice(0, msg.length) == msg;
}

function messageBroker(event) {
    if (ALLOWED_IFRAME_URLS.indexOf(event.origin) > -1) {
        if (parentIFrameURL == "UNINITIALIZED") parentIFrameURL = event.origin;
        var msg = "SETCOLLECTIONID";
        if (checkMessage(event.data, msg)) {
            collectionID_EPO_do_not_change = event.data.slice(msg.length);
            console.log("Xopus: collectionID: " + getCollectionId());
        } else {
            msg = "SETMODULEID";
            if (checkMessage(event.data, msg)) {
                moduleID_EPO_do_not_change = event.data.slice(msg.length);
                console.log("Xopus: moduleID: " + getModuleId());
            } else {
                msg = "SETLOCKID";
                if (checkMessage(event.data, msg)) {
                    lockID_EPO_do_not_change = event.data.slice(msg.length);
                    console.log("Xopus: lockID: " + getLockId());
                } else {
                    msg = "SETUSERNAME";
                    if (checkMessage(event.data, msg)) {
                        userName_EPO_do_not_change = event.data.slice(msg.length);
                        console.log("Xopus: userName: " + getUserName());
                    } else {
                        msg = "SETUSERROLES";
                        if (checkMessage(event.data, msg)) {
                            var userRolesStr = event.data.slice(msg.length);
                            userRoles_EPO_do_not_change = userRolesStr.split(" ");
                            userRole_EPO_do_not_change = getUserRoles()[0];
                            console.log("Xopus: userRoles: " + getUserRoles() + " mainRole: " + getUserRole());
                        } else {
                            msg = "LOAD";
                            if (checkMessage(event.data, msg)) {
                                strModuleXML = event.data.slice(msg.length);
                                var canvas = Editor.getActiveCanvas();
                                canvas.loadDocument("../epeditor/document_reading2.xml", false);
                            } else {
                                msg = "SAVED";
                                if (checkMessage(event.data, msg)) {
                                    var res = event.data.slice(msg.length);
                                    res = res == "true";
                                    console.log("Xopus: document saved successfully : ", res);
                                    if (saveCustomXMLCallback) {
                                        saveCustomXMLCallback(res);
                                    } else {
                                        console.log("Xopus: messageBroker. Command SAVED supported but uninitialized!", res);
                                        if (res) {
                                            Editor.alert("Strona główna przesłała potwierdzenie zapisu, lecz edytor nie został poprawnie zainicjalizowany...");
                                        } else {
                                            Editor.alert("Strona główna przesłała informację o błędzie zapisu, lecz edytor nie został poprawnie zainicjalizowany...");
                                        }
                                    }
                                } else {
                                    console.log("Xopus: messageBroker. Command not supported!");
                                    Editor.alert("Strona główna przesłała nierozpoznane polecenie: " + event.data.slice(0, event.data.length > 20 ? 20 : event.data.length));
                                }
                            }
                        }
                    }
                }
            }
        }
        event.stopPropagation();
    } else {
        console.log("Xopus: Not this way!", event.origin, parentIFrameURL);
        Editor.alert("Nieprawidłowy nadawca: " + event.origin);
    }
}

var loadXML = IO.getLoadXMLFunction();

function loadModuleXML(uri) {
    console.log("Xopus: loadModuleXML", uri);
    if (strModuleXML == null) {
        console.log("Module not loaded!");
        return loadXML(uri);
    } else {
        console.log("Module loading......", strModuleXML.substring(0, 100));
        var moduleXML = Editor.XML.createNativeXMLDocument(strModuleXML);
        enrichDocument(moduleXML);
        console.log("Module loaded.", moduleXML);
        return moduleXML;
    }
}

function loadCustomXML(uri) {
    console.log("Xopus: loadCustomXML", uri);
    window.parent.parent.postMessage("LOAD_me", "*");
    IO.setLoadXMLFunction(null);
    IO.setLoadXMLFunction(loadModuleXML);
    var xmlDoc = loadXML(uri);
    enrichDocument(xmlDoc);
    return xmlDoc;
}

function replaceNbsps(str) {
    var re = new RegExp(String.fromCharCode(160), "g");
    return str.replace(re, "<ep:nbsp/>");
}

function enrichDocument(xmlDoc) {
    var elem = xmlDoc.documentElement;
    if (!elem.hasAttributeNS("http://www.w3.org/2000/xmlns/", "epe")) elem.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:epe", "http://epodreczniki.pl/editor");
    if (!elem.hasAttributeNS("http://www.w3.org/2000/xmlns/", "mml")) elem.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:mml", "http://www.w3.org/1998/Math/MathML");
    if (!elem.hasAttributeNS("http://www.w3.org/2000/xmlns/", "q")) elem.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:q", "http://cnx.rice.edu/qml/1.0");
}

function saveCustomXML(uri, xmlDocument, callback) {
    if (firstSave != 1) {
        if (!validateDocument(xmlDocument)) {
            callback(false);
            return false;
        }
        if (getModuleId() == null) {
            saveSourceXml(uri, xmlDocument);
            callback(true);
        } else {
            var str = new XMLSerializer().serializeToString(xmlDocument);
            window.parent.parent.postMessage("SAVE" + str, parentIFrameURL + "/");
            saveCustomXMLCallback = callback;
        }
    } else {
        firstSave = 0;
    }
}

function intSaveModuleXML(xmlDocument, callback) {
    var moduleId = getModuleId().split("/")[0];
    var version = getModuleId().split("/")[1];
    var lockId = getLockId();
    if (lockId == null) {
        Editor.alert("Problem przy zapisywaniu modułu " + moduleId + ", wersja " + version + "\n\nPróba potwierdzenia blokady na pliku, przed zapisem, nie powiodła się.");
        callback(false);
    }
    var uploadUrl = parentIFrameURL + "/edit/store/api/push/module/" + getModuleId() + "?lockid=" + lockId;
    var formData = new FormData();
    var blob = new Blob([ xmlDocument ], {
        type: "text/xml"
    });
    formData.append("xml_file", blob);
    $.ajax({
        url: uploadUrl,
        type: "POST",
        data: formData,
        cache: false,
        dataType: "text",
        processData: false,
        contentType: false,
        xhrFields: {
            withCredentials: true
        },
        error: function(jqXHR, textStatus, errorMessage) {
            var stack = $(jqXHR.responseText);
            var err = _.where(stack, {
                className: "error"
            });
            if (err == "") err = errorMessage;
            Editor.alert("Problem przy zapisywaniu modułu " + moduleId + ", wersja " + version + "\n\n" + err);
            callback(false);
        },
        success: function(jqXHR, textStatus, message) {
            Editor.alert("Raport: moduł " + moduleId + " został zapisany w wersji " + version);
            callback(true);
        }
    });
}

function loadHandler(evt) {
    console.log("Xopus: loadHandler", evt);
    loadedHandler(evt);
    Editor.setUILanguage("pl");
    Editor.setUIGroupEnabled("disable", false);
    var xmlDoc = evt.document;
    xmlDoc.addSimpleListener("XopusBeforeChildInserted", beforeChildInsertedHandler);
    xmlDoc.addSimpleListener("XopusAfterChildInserted", afterChildInsertedHandler);
    xmlDoc.addSimpleListener("XopusAfterAttrModified", afterAttributeModifiedHandler);
    xmlDoc.addSimpleListener("XopusAfterChildRemoved", afterChildRemovedHandler);
    xmlDoc.addSimpleListener("XopusBeforeChildRemoved", beforeChildRemovedHandler);
    xmlDoc.addSimpleListener("XopusAfterSubtreeModified", afterSubtreeModifiedHandler);
    xmlDoc.addSimpleListener("XopusBeforeSubtreeModified", beforeSubtreeModifiedHandler);
    xmlDoc.addSimpleListener("XopusBeforePaste", beforePasteHandler);
    xmlDoc.addSimpleListener("XopusAfterNodeSplit", afterNodeSplitHandler);
    Editor.addEventListener("afterRedraw", afterRedrawHandler);
    Editor.addEventListener("xmlContextChange", xmlContextChangeHandler);
    setExtraSymbols();
}

function saveSourceXml(uri, xmlDocument) {
    HTTPTools.postXML("/dev/save", xmlDocument, "UTF-8");
    return 1;
}

function showMsg(evt) {
    var strMessage = new String(evt.message);
    if (evt.type == "error" && strMessage.indexOf("this.") == 0) {
        console.log("Error detected: this.XXXX is null");
        return false;
    } else {
        console.log("XOPUS_ERROR (" + evt.type + "):\n" + evt.message, evt);
    }
}

window.addEventListener("message", messageBroker, false);

Editor.addSimpleListener("load", loadHandler);

Editor.addEventListener("warn", showMsg);

Editor.addEventListener("error", showMsg);

Editor.addEventListener("info", showMsg);

IO.setLoadXMLFunction(loadCustomXML);

IO.setAsyncSaveXMLFunction(saveCustomXML);
