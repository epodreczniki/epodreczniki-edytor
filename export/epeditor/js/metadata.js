function updateMdRole(evt) {
    var node = evt.childNode;
    if (node.getLocalName() != "person") return;
    node.setAttribute("userid", generateNextId(node));
    var rolesNode = node.selectSingleNode("//*[local-name()='metadata']/*[local-name()='roles']");
    rolesNode.appendChild(createMdRole(node));
}

function updateLicense(evt) {
    var node = evt.target;
    var result;
    if (isLicenseText(node)) {
        var licenseNode = node.getParentNode();
        switch (licenseNode.getTextContent()) {
          case "":
            result = "";
            break;

          case "E-podręczniki 1.0":
            result = "http://www.epodreczniki.pl/licenses/e-podreczniki/1.0";
            break;

          case "CC 0 1.0":
            result = "http://creativecommons.org/publicdomain/zero/1.0/legalcode";
            break;

          case "CC BY 1.0":
            result = "https://creativecommons.org/licenses/by/1.0/legalcode";
            break;

          case "CC BY 2.0":
            result = "https://creativecommons.org/licenses/by/2.0/pl/legalcode";
            break;

          case "CC BY 2.5":
            result = "https://creativecommons.org/licenses/by/2.5/pl/legalcode";
            break;

          case "CC BY 3.0":
            result = "http://creativecommons.org/licenses/by/3.0/pl/legalcode";
            break;

          case "CC BY 4.0":
            result = "https://creativecommons.org/licenses/by/4.0/legalcode";
            break;

          case "CC BY SA 1.0":
            result = "https://creativecommons.org/licenses/by-sa/1.0/legalcode";
            break;

          case "CC BY SA 2.0":
            result = "https://creativecommons.org/licenses/by-sa/2.0/pl/legalcode";
            break;

          case "CC BY SA 2.5":
            result = "https://creativecommons.org/licenses/by-sa/2.5/pl/legalcode";
            break;

          case "CC BY SA 3.0":
            result = "https://creativecommons.org/licenses/by-sa/3.0/pl/legalcode";
            break;

          case "CC BY SA 4.0":
            result = "https://creativecommons.org/licenses/by-sa/4.0/legalcode";
            break;

          case "CC BY-ND 1.0":
            result = "https://creativecommons.org/licenses/by-nd/1.0/legalcode";
            break;

          case "CC BY-ND 2.0":
            result = "https://creativecommons.org/licenses/by-nd/2.0/pl/legalcode";
            break;

          case "CC BY-ND 2.5":
            result = "https://creativecommons.org/licenses/by-nd/2.5/pl/legalcode";
            break;

          case "CC BY-ND 3.0":
            result = "https://creativecommons.org/licenses/by-nd/3.0/pl/legalcode";
            break;

          case "CC BY-ND 4.0":
            result = "https://creativecommons.org/licenses/by-nd/4.0/legalcode";
            break;

          case "CC BY-NC 1.0":
            result = "https://creativecommons.org/licenses/by-nc/1.0/legalcode";
            break;

          case "CC BY-NC 2.0":
            result = "https://creativecommons.org/licenses/by-nc/2.0/pl/legalcode";
            break;

          case "CC BY-NC 2.5":
            result = "https://creativecommons.org/licenses/by-nc/2.5/pl/legalcode";
            break;

          case "CC BY-NC 3.0":
            result = "https://creativecommons.org/licenses/by-nc/3.0/pl/legalcode";
            break;

          case "CC BY-NC 4.0":
            result = "https://creativecommons.org/licenses/by-nc/4.0/legalcode";
            break;

          case "CC BY-NC-ND 2.0":
            result = "https://creativecommons.org/licenses/by-nc-nd/2.0/pl/legalcode";
            break;

          case "CC BY-NC-ND 2.5":
            result = "https://creativecommons.org/licenses/by-nc-nd/2.5/pl/legalcode";
            break;

          case "CC BY-NC-ND 3.0":
            result = "https://creativecommons.org/licenses/by-nc-nd/3.0/pl/legalcode";
            break;

          case "CC BY-NC-ND 4.0":
            result = "https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode";
            break;

          case "CC BY-NC-SA 1.0":
            result = "https://creativecommons.org/licenses/by-nc-sa/1.0/legalcode";
            break;

          case "CC BY-NC-SA 2.0":
            result = "https://creativecommons.org/licenses/by-nc-sa/2.0/pl/legalcode";
            break;

          case "CC BY-NC-SA 2.5":
            result = "https://creativecommons.org/licenses/by-nc-sa/2.5/pl/legalcode";
            break;

          case "CC BY-NC-SA 3.0":
            result = "https://creativecommons.org/licenses/by-nc-sa/3.0/pl/legalcode";
            break;

          case "CC BY-NC-SA 4.0":
            result = "https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode";
            break;

          case "domena publiczna":
            result = "http://www.epodreczniki.pl/licenses/domena-publiczna/1.0";
            break;

          case "tylko do użytku edukacyjnego":
            result = "http://www.epodreczniki.pl/licenses/tylko-do-uzytku-edukacyjnego/1.0";
            break;

          case "tylko do użytku edukacyjnego na epodreczniki.pl":
            result = "http://www.epodreczniki.pl/licenses/tylko-do-uzytku-edukacyjnego-na-epodreczniki_pl/1.0";
            break;

          case "tylko do użytku niekomercyjnego":
            result = "http://www.epodreczniki.pl/licenses/tylko-do-uzytku-niekomercyjnego/1.0";
            break;
        }
        if (licenseNode.hasAttribute("ep:url")) licenseNode.setAttribute("ep:url", result); else licenseNode.setAttribute("url", result);
    } else if (isLicenseUrl(node)) {
        switch (node.getTextContent()) {
          case "":
            result = "";
            break;

          case "http://www.epodreczniki.pl/licenses/e-podreczniki/1.0":
            result = "E-podręczniki 1.0";
            break;

          case "http://creativecommons.org/publicdomain/zero/1.0/legalcode":
            result = "CC 0 1.0";
            break;

          case "https://creativecommons.org/licenses/by/1.0/legalcode":
            result = "CC BY 1.0";
            break;

          case "https://creativecommons.org/licenses/by/2.0/pl/legalcode":
            result = "CC BY 2.0";
            break;

          case "https://creativecommons.org/licenses/by/2.5/pl/legalcode":
            result = "CC BY 2.5";
            break;

          case "http://creativecommons.org/licenses/by/3.0/pl/legalcode":
            result = "CC BY 3.0";
            break;

          case "https://creativecommons.org/licenses/by/4.0/legalcode":
            result = "CC BY 4.0";
            break;

          case "https://creativecommons.org/licenses/by-sa/1.0/legalcode":
            result = "CC BY SA 1.0";
            break;

          case "https://creativecommons.org/licenses/by-sa/2.0/pl/legalcode":
            result = "CC BY SA 2.0";
            break;

          case "https://creativecommons.org/licenses/by-sa/2.5/pl/legalcode":
            result = "CC BY SA 2.5";
            break;

          case "https://creativecommons.org/licenses/by-sa/3.0/pl/legalcode":
            result = "CC BY SA 3.0";
            break;

          case "https://creativecommons.org/licenses/by-sa/4.0/legalcode":
            result = "CC BY SA 4.0";
            break;

          case "https://creativecommons.org/licenses/by-nd/1.0/legalcode":
            result = "CC BY-ND 1.0";
            break;

          case "https://creativecommons.org/licenses/by-nd/2.0/pl/legalcode":
            result = "CC BY-ND 2.0";
            break;

          case "https://creativecommons.org/licenses/by-nd/2.5/pl/legalcode":
            result = "CC BY-ND 2.5";
            break;

          case "https://creativecommons.org/licenses/by-nd/3.0/pl/legalcode":
            result = "CC BY-ND 3.0";
            break;

          case "https://creativecommons.org/licenses/by-nd/4.0/legalcode":
            result = "CC BY-ND 4.0";
            break;

          case "https://creativecommons.org/licenses/by-nc/1.0/legalcode":
            result = "CC BY-NC 1.0";
            break;

          case "https://creativecommons.org/licenses/by-nc/2.0/pl/legalcode":
            result = "CC BY-NC 2.0";
            break;

          case "https://creativecommons.org/licenses/by-nc/2.5/pl/legalcode":
            result = "CC BY-NC 2.5";
            break;

          case "https://creativecommons.org/licenses/by-nc/3.0/pl/legalcode":
            result = "CC BY-NC 3.0";
            break;

          case "https://creativecommons.org/licenses/by-nc/4.0/legalcode":
            result = "CC BY-NC 4.0";
            break;

          case "https://creativecommons.org/licenses/by-nc-nd/2.0/pl/legalcode":
            result = "CC BY-NC-ND 2.0";
            break;

          case "https://creativecommons.org/licenses/by-nc-nd/2.5/pl/legalcode":
            result = "CC BY-NC-ND 2.5";
            break;

          case "https://creativecommons.org/licenses/by-nc-nd/3.0/pl/legalcode":
            result = "CC BY-NC-ND 3.0";
            break;

          case "https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode":
            result = "CC BY-NC-ND 4.0";
            break;

          case "https://creativecommons.org/licenses/by-nc-sa/1.0/legalcode":
            result = "CC BY-NC-SA 1.0";
            break;

          case "https://creativecommons.org/licenses/by-nc-sa/2.0/pl/legalcode":
            result = "CC BY-NC-SA 2.0";
            break;

          case "https://creativecommons.org/licenses/by-nc-sa/2.5/pl/legalcode":
            result = "CC BY-NC-SA 2.5";
            break;

          case "https://creativecommons.org/licenses/by-nc-sa/3.0/pl/legalcode":
            result = "CC BY-NC-SA 3.0";
            break;

          case "https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode":
            result = "CC BY-NC-SA 4.0";
            break;

          case "http://www.epodreczniki.pl/licenses/domena-publiczna/1.0":
            result = "domena publiczna";
            break;

          case "http://www.epodreczniki.pl/licenses/tylko-do-uzytku-edukacyjnego/1.0":
            result = "tylko do użytku edukacyjnego";
            break;

          case "http://www.epodreczniki.pl/licenses/tylko-do-uzytku-edukacyjnego-na-epodreczniki_pl/1.0":
            result = "tylko do użytku edukacyjnego na epodreczniki.pl";
            break;

          case "http://www.epodreczniki.pl/licenses/tylko-do-uzytku-niekomercyjnego/1.0":
            result = "tylko do użytku niekomercyjnego";
            break;
        }
        node.getOwnerElement().setTextContent(result);
    }
}

function isLicenseText(node) {
    return node.getNodeType() == 3 && node.getParentNode().getLocalName() == "license";
}

function isLicenseUrl(node) {
    return node.getNodeType() == 2 && node.getLocalName() == "url" && node.getOwnerElement().getLocalName() == "license";
}

function createMdRole(node) {
    var id = node.getAttribute("userid");
    var resultNode = node.getOwnerDocument().createElementNS(MD_XML_URI, "role");
    resultNode.setTextContent(id);
    resultNode.setAttribute("type", "author");
    return resultNode;
}

function changeMdView() {
    metadataViewCommand.execute(Editor.getScope());
}

function updateMdPerson(evt) {
    var node = evt.target.getParentNode();
    if (node == null) return;
    var parentNode = node.getParentNode();
    if (node.getLocalName() != "fullname" || node.getTextContent() == "" || parentNode.getLocalName() != "person") return;
    var names = node.getTextContent().split(" ");
    var firstname = parentNode.selectSingleNode("./*[local-name()='firstname']");
    var surname = parentNode.selectSingleNode("./*[local-name()='surname']");
    firstname.setTextContent(names[0]);
    surname.setTextContent(names[names.length - 1]);
}