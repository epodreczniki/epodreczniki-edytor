var collectionID_EPO_do_not_change = null;

var moduleID_EPO_do_not_change = null;

var lockID_EPO_do_not_change = null;

var userName_EPO_do_not_change = "null";

var userRole_EPO_do_not_change = null;

var userRoles_EPO_do_not_change = [];

function getCollectionId() {
    return collectionID_EPO_do_not_change;
}

function getModuleId() {
    return moduleID_EPO_do_not_change;
}

function getLockId() {
    return lockID_EPO_do_not_change;
}

function getUserName() {
    return userName_EPO_do_not_change;
}

function getUserRole() {
    return userRole_EPO_do_not_change;
}

function getUserRoles() {
    return userRoles_EPO_do_not_change;
}

function hasContentEditableRole() {
    return getUserRoles().containsAny([ AUTHOR_ROLE, EDITOR_ROLE, PUBLISHER_ROLE ]);
}
