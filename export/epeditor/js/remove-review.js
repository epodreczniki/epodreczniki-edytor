function removeReview(evt) {
    var reviewChild = evt.childNode;
    var review = evt.target;
    if (!evt.duringUndoOrRedo && review.getLocalName() == "review" && reviewChild.getLocalName() == "comment") {
        throw new Editor.RevertingException();
    }
}