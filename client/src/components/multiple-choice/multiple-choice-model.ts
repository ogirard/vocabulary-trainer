import { addGlobalEventListener, dispatchGlobalEvent } from "../../lib/util";


export interface MultipleChoiceQuestion {
    questionId: number;
    questionText: string;
    answers: MultipleChoiceAnswer[];
}

export interface MultipleChoiceAnswer {
    answerId: string;
    answerText: string;
    isCorrect: boolean;
}

export class MultipleChoiceAnswerClickedEvent {

    public static EVENT_NAME = "onMultipleChoiceAnswerClicked";

    constructor(public answer: MultipleChoiceAnswer) {
    }

    public static publish(answer: MultipleChoiceAnswer) {
        dispatchGlobalEvent(
            new CustomEvent(MultipleChoiceAnswerClickedEvent.EVENT_NAME, {
                detail: new MultipleChoiceAnswerClickedEvent(answer),
            }));
    }

    public static subscribe(eventHandler: (event: MultipleChoiceAnswerClickedEvent) => void) {
        addGlobalEventListener(MultipleChoiceAnswerClickedEvent.EVENT_NAME, x => {
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
        dispatchGlobalEvent(new CustomEvent(NextMultipleChoiceQuestionLoadedEvent.EVENT_NAME, {
            detail: new NextMultipleChoiceQuestionLoadedEvent(question),
        }));
    }

    public static subscribe(eventHandler: (event: NextMultipleChoiceQuestionLoadedEvent) => void) {
        addGlobalEventListener(NextMultipleChoiceQuestionLoadedEvent.EVENT_NAME, x => {
            const event = x as CustomEvent<NextMultipleChoiceQuestionLoadedEvent>;
            eventHandler(event.detail);
        });
    }
}