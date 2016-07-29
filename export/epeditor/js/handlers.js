function beforeChildInsertedHandler(evt) {
	authorReviewInsertBlock(evt);
	insertReviewInReview(evt);
	insertIntoGallery(evt);
	
	if(!hasContentEditableRole())
		return;
	
	beforeInsertAnswer(evt);
	blockImproperQuizElement(evt);
	moveZebra(evt)
	blockSectionInsertIntoColumnSection(evt);
}

function afterChildInsertedHandler(evt) {
	if (evt.duringUndoOrRedo) return;

	addId(evt.target);
	addId(evt.childNode);
	insertReview(evt);

	if(!hasContentEditableRole())
		return;

	addSubnodes(evt);
	addInstanceId(evt.target);
	addInstanceId(evt.childNode);
	mathmlOpenDialog(evt);
	updateMdRole(evt);
	exerciseOpenDialog(evt);
	bookmarkOpenDialog(evt);
	glossaryReferenceOpenDialog(evt);
	insertAnswerSet(evt);
	insertAnswer(evt);
	focusOnManualOrganization(evt);
	insertAtrticleNumber(evt);
	focusAfterRevieInsert(evt);

	return true;
}

function afterAttributeModifiedHandler(evt) {
	validateAttribute(evt);
}

function beforeChildRemovedHandler(evt) {
	removeReview(evt);
}

function afterChildRemovedHandler(evt) {
	if(!hasContentEditableRole())
		return;
	removeExercise(evt);
	validateNode(evt);
}

function afterSubtreeModifiedHandler(evt) {
	if(!hasContentEditableRole())
		return;

	preventSubtreeChangingAfterModified(evt);
	updateModuleTitle(evt);
	updateLicense(evt);
	updateMdPerson(evt);
	updateAnswer(evt);
	updateListId(evt);
}

function beforeSubtreeModifiedHandler(evt) {
	preventSubtreeChangingBeforeModified(evt);
}

function blockAbilityMathMl(node) {
	if(blockCoreAbility && 
		hasAncestorInArray(node, ["core-curriculum-ability"])!==null) {
		throw Editor.RevertingException();
	}
}

function loadedHandler(evt) {
	addInsertListScrolling(evt);
	updateWomiMetadataInModule(evt);
	exerciseProcess(evt);
	updateDateEnd();

}

function afterRedrawHandler(evt) {
	setViewToCurrentPage(evt);
	setViewToCurrentReview(evt);
	reformatReviews(evt);
	reformatImageLoaded();
}

function beforePasteHandler(evt) {
	pasteSetIdsContentSeparator(evt);
	pasteReview(evt);
}

function xmlContextChangeHandler(evt) {
}

function afterNodeSplitHandler(evt) {
	if(evt.duringUndoOrRedo)
		return;
	
	preventReviewSplit(evt);
	regenerateId(evt.newNode);
}
