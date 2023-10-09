

export interface MultipleChoiceQuestion {
    questionText: string;
    answers: MultipleChoiceAnswer[];
}

export interface MultipleChoiceAnswer {
    answerId: number;
    answerText: string;
    isCorrect: boolean;
}

export class MultipleChoiceQuestionModel implements MultipleChoiceQuestion {
    questionText: string;
    answers: MultipleChoiceAnswer[];

    constructor(questionText: string, answers: MultipleChoiceAnswer[]) {
        this.questionText = questionText;
        this.answers = answers;
    }
}

export class MultipleChoiceAnswerModel implements MultipleChoiceAnswer {
    answerId: number;
    answerText: string;
    isCorrect: boolean;

    constructor(answerId: number, answerText: string, isCorrect: boolean) {
        this.answerId = answerId;
        this.answerText = answerText;
        this.isCorrect = isCorrect;
    }
}

export class MultipleChoiceAnswerClickedEvent {

    public static EVENT_NAME = "onMultipleChoiceAnswerClicked";

    constructor(public answer: MultipleChoiceAnswer) {
    }

    public static publish(answer: MultipleChoiceAnswer) {
        document.dispatchEvent(
            new CustomEvent(MultipleChoiceAnswerClickedEvent.EVENT_NAME, {
                detail: new MultipleChoiceAnswerClickedEvent(answer),
            }));
    }

    public static subscribe(eventHandler: (event: MultipleChoiceAnswerClickedEvent) => void) {
        document.addEventListener(MultipleChoiceAnswerClickedEvent.EVENT_NAME, x => {
            const event = x as CustomEvent<MultipleChoiceAnswerClickedEvent>;
            eventHandler(event.detail);
        });
    }
}

export class NextMultipleChoiceQuestionLoadedEvent {

    public static EVENT_NAME = "onNextMultipleChoiceQuestionLoaded";

    constructor(public question: MultipleChoiceQuestion) {
    }

    public static publish(question: MultipleChoiceQuestion) {
        document.dispatchEvent(
            new CustomEvent(NextMultipleChoiceQuestionLoadedEvent.EVENT_NAME, {
                detail: new NextMultipleChoiceQuestionLoadedEvent(question),
            }));
    }

    public static subscribe(eventHandler: (event: NextMultipleChoiceQuestionLoadedEvent) => void) {
        document.addEventListener(NextMultipleChoiceQuestionLoadedEvent.EVENT_NAME, x => {
            const event = x as CustomEvent<NextMultipleChoiceQuestionLoadedEvent>;
            eventHandler(event.detail);
        });
    }
}