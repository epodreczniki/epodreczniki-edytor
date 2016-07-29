function addInsertListScrolling(evt) {
    var sheet = parent.document.styleSheets[0];
    sheet.insertRule(".checked-dropdownButton-children { overflow-y: scroll; max-height: 500px;}", 1);
    sheet.insertRule(".submenuitem-children2 .menu { overflow-y: scroll; max-height: 500px;}", 1);
    sheet.insertRule(".breadcrumbButton-child { overflow-y: scroll; max-height: 500px;}", 1);
}