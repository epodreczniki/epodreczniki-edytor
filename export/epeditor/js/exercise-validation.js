function validateExercise(element, node) {
	var e = $(element).closest(".validation").find(".status");
	
	var validator = new ExerciseValidator(node);
	var alternativeGenerator = new ExerciseAlternativeGenerator(node);
	var mContainers = $(element).closest(".exercise").find(".validation-messages");
	mContainers.addClass("hidden");
	
	if(validator.isValid() && alternativeGenerator.generate())
		e.removeClass("invalid");
	else {
		e.addClass("invalid");
		
		var messagesList = mContainers.eq(validator.error.setIndex).removeClass("hidden").find("ul");
		messagesList.empty().append("<li>"+validator.error.message+"</li>");
	}
		
	return false;
}
validateExercise = Editor.wrapInTransaction(validateExercise);

function ExerciseValidator(node) {
	this.node = null;
	
	if(node !== null)
		this.node = node.selectSingleNode("./*[local-name()='alternatives']/*[local-name()='alternative' \
			and ./*[local-name()='item'] and ./*[local-name()='formats']/*[local-name()='format' and .= 'classicmobile'] \
			]");
};

ExerciseValidator.prototype.getMessage = function(messageId, messageParams) {
	switch(messageId) {
		case "answer-count": 
			return "Niepoprawna liczba odpowiedzi (obecna {0}, oczekiwana {1})".format(messageParams.current, messageParams.expected);
		case "correct-answer-count": 
			return "Niepoprawna liczba poprawnych odpowiedzi (obecna {0}, oczekiwana {1})".format(messageParams.current, messageParams.expected);
		case "incorrect-answer-count": 
			return "Niepoprawna liczba błędnych odpowiedzi (obecna {0}, oczekiwana {1})".format(messageParams.current, messageParams.expected);
		case "first-n-answer": 
			return "Dokładnie {0} odpowiedź z pierwszych {1} musi być poprawna".format(messageParams.correctInSet, messageParams.presentedAnswers);
		case "hint-for-correct":
			return "Wskazówki (hint) nie można umieszczać pod poprawnymi odpowiedziami";
		case "multiple-hint":
			return "Tylko jedna wskazówka dla jenej odpowiedzi";
		case "correct-in-set-range":
			return "Niepoprawny zakres w polu \"Liczba poprawnych odpowiedzi\"";
		case "low-presented-answers":
			return "Liczba prezentowanych odpowiedzi({0}) powinna być większa niż liczba poprawnych odpowiedzi({1})".format(messageParams.presentedAnswers, messageParams.correctAnswers);
		case "hint-in-multiple-response":
			return "Stosowanie wskazówek do odpowiedzi dozwolone tylko w zadaniach typu 'Jednokrotny wybór'";
	}
	
	return "";
}

ExerciseValidator.prototype.setError = function(setIndex, messageId, messageParams) {
	this.error = {
		messageId: messageId,
		message: this.getMessage(messageId, messageParams),
		setIndex: setIndex 
	};
}

ExerciseValidator.prototype.isValid = function() {
	if(this.node == null)
		return false;
	
	return this.prepare() &&
		this.isPresentedAnswersGreatherOrEqualThenCorrectInSet() &&
		this.isIncorrectAnswersCountValid() &&
		this.isInFirstNAnswersOnlyOneCorrect() &&
		this.isAnswerCountValid() &&
		this.isCorrectAnswerCountValid() &&
		this.isIncorrectAnswersCountValid() &&
		this.isInFirstNAnswersOnlyOneCorrect() &&
		this.areHintsOnlyInSingleResponse() &&
		this.areHintsOnlyForIncorrect() &&
		this.isMaxOneHintPerAnswer();
}

ExerciseValidator.prototype.prepare = function() {
	var tmpNode = null;
	this.type = this.node.selectSingleNode("./*[local-name()='item']").getAttribute("type");
	this.behaviour = this.node.selectSingleNode("./*[local-name()='config']/*[local-name()='behaviour']").getTextContent();
	this.presentedAnswers = +this.node.selectSingleNode("./*[local-name()='config']/*[local-name()='presented-answers']").getTextContent();

	tmpNode = this.node.selectSingleNode("./*[local-name()='config']/*[local-name()='correct-in-set']");
	
	if( !!tmpNode && !/^([0-9]+-)?[1-9][0-9]*$/.test(tmpNode.getTextContent()) ) {
		this.setError(-1, "correct-in-set-range");
		return false;
	}
	this.correctInSet = (!!tmpNode ? tmpNode.getTextContent().split("-") : ["-1"]);
	for(var i=0; i<this.correctInSet.length; i++) { this.correctInSet[i] = +this.correctInSet[i]; }
	
	if(this.correctInSet.length == 2 && this.correctInSet[0] > this.correctInSet[1]) {
		this.setError(-1, "correct-in-set-range");
		return false;
	}
	
	this.answers = [];
	tmpNode = this.node.selectNodes("./*[local-name()='item']/*[local-name()='set']");
	if(tmpNode.getLength() == 0) {
		this.answers.push({
			count: this.node.selectNodes("./*[local-name()='item']/*[local-name()='answer']").getLength(),
			correct: this.node.selectNodes("./*[local-name()='item']/*[local-name()='answer' and ./@*[local-name()='correct' and .='true']]").getLength()
		});
	}
	for(var i=0;i<tmpNode.getLength();i++) {
		this.answers.push({
			count: tmpNode.item(i).selectNodes("./*[local-name()='answer']").getLength(),
			correct: tmpNode.item(i).selectNodes("./*[local-name()='answer' and ./@*[local-name()='correct' and .='true']]").getLength()
		});	
	}
	
	return true;
}

ExerciseValidator.prototype.getSetId = function(itemOrSet) {
	if(itemOrSet.getLocalName()=="item") return 0;
	var tmp = itemOrSet;
	var count=-2;
	while(tmp) {
		tmp = tmp.getPreviousSibling();
		count++;
	}
	
	return count;
}

ExerciseValidator.prototype.isAnswerCountValid = function() {
	if(this.behaviour == "randomize") {
		var result = this.answers[0].count >= this.presentedAnswers;
		if(!result)
			this.setError(0, "answer-count", {current: this.answers[0].count, expected: this.presentedAnswers});
		
		return result;
	} else {
		for(var i=0; i<this.answers.length; i++) {
			var e = this.answers[i];
			if(e.count != this.presentedAnswers) {
				this.setError(i, "answer-count", {current: this.answers[i].count, expected: this.presentedAnswers});
				return false;
			}
		}
	}	
	return true;
}

ExerciseValidator.prototype.isCorrectAnswerCountValid = function() {
	if(this.type == "multiple-response" && this.behaviour == "randomize") {
		if(this.correctInSet[0]<0)
			return true;
		var result = this.answers[0].correct >= this.correctInSet[0];
		if(!result)
			this.setError(0, "correct-answer-count", {current: this.answers[0].correct, expected: this.correctInSet[0]});
		
		return result;
	} else if(this.type == "multiple-response") {
		return true;
	} else if(this.behaviour == "randomize") {
		var result = this.answers[0].count > 0;
		if(!result)
			this.setError(0, "correct-answer-count", {current: this.answers[0].correct, expected: 0});
		
		return result;
	} else {
		for(var i=0; i<this.answers.length; i++) {
			var e = this.answers[i];
			if(e.correct != 1) {
				this.setError(i, "correct-answer-count", {current: this.answers[i].correct, expected: 1});
				
				return false;
			}
		}
	}
	
	return true;
}

ExerciseValidator.prototype.isIncorrectAnswersCountValid = function() {
	if(this.correctInSet[0]<0)
		return true;
	
	if(this.type == "multiple-response" && this.behaviour == "randomize") {
		var e = this.answers[0];
		if(e.count - e.correct < this.presentedAnswers - this.correctInSet[0]) {
			this.setError(0, "incorrect-answer-count", {current: (e.count - e.correct), expected: (this.presentedAnswers - this.correctInSet[0])});
			
			return false;
		}
	}
	
	return true;	
}

ExerciseValidator.prototype.isInFirstNAnswersOnlyOneCorrect = function() {
		var arr = this.node.selectNodes("./*[local-name()='item']/*[local-name()='answer' \
			and ./@*[local-name()='correct' and .='true' ]\
			and position() <= " + (this.presentedAnswers + 1) + "]");
	if(this.type == "single-response" && this.behaviour == "randomize") {	
		if(arr.getLength()!=1) {
			this.setError(0, "first-n-answer", {presentedAnswers: this.presentedAnswers, correctInSet: 1});
			return false;
		}
	} else if(this.type == "multiple-response" && this.behaviour == "randomize") {
		if(arr.getLength()<this.correctInSet[0]) {
			this.setError(0, "first-n-answer", {presentedAnswers: this.presentedAnswers, correctInSet: this.correctInSet[0]});
			return false;
		} else if(this.correctInSet.length>1 && arr.getLength()>this.correctInSet[1]) {
			this.setError(0, "first-n-answer", {presentedAnswers: this.presentedAnswers, correctInSet: this.correctInSet[1]});
			return false;
		}
		
	}
	
	return true;
}

ExerciseValidator.prototype.areHintsOnlyForIncorrect = function() {
	var correctAnswerHint = this.node.selectSingleNode("./*[local-name()='item'] \
		//*[local-name()='answer' and ./@*[local-name()='correct' and .='true'] ] \
		/*[local-name()='hint']");
	
	if(!!correctAnswerHint) {
		this.setError(this.getSetId(correctAnswerHint.getParentNode().getParentNode()), "hint-for-correct");
	}
	
	return !correctAnswerHint;
}

ExerciseValidator.prototype.isMaxOneHintPerAnswer = function() {
	return true;
}

ExerciseValidator.prototype.isPresentedAnswersGreatherOrEqualThenCorrectInSet = function() {
	if(this.presentedAnswers < this.correctInSet[0]) {
		this.setError(-1, "low-presented-answers");
		return false;
	}
	
	return true;
}

ExerciseValidator.prototype.areHintsOnlyInSingleResponse = function() {
	var answerHint = this.node.selectSingleNode("./*[local-name()='item']//*[local-name()='answer'] \
		/*[local-name()='hint']");
	var result = this.type == "single-response"  || !answerHint;
	
	if(!result) {
		this.setError(this.getSetId(answerHint.getParentNode().getParentNode()), "hint-in-multiple-response");
	}
	
	return result;
}
