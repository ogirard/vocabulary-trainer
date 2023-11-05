import { addGlobalEventListener, dispatchGlobalEvent } from '../../lib/util';

export interface QuestionAnswer {
  questionId: string;
  questionText: string;
  answerText?: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export class QuestionAnswerEnteredEvent {
  public static EVENT_NAME = 'onQuestionAnswerEntered';

  constructor(public answer: QuestionAnswer) {}

  public static publish(answer: QuestionAnswer) {
    dispatchGlobalEvent(
      new CustomEvent(QuestionAnswerEnteredEvent.EVENT_NAME, {
        detail: new QuestionAnswerEnteredEvent(answer),
      })
    );
  }

  public static subscribe(
    eventHandler: (event: QuestionAnswerEnteredEvent) => void
  ) {
    addGlobalEventListener(QuestionAnswerEnteredEvent.EVENT_NAME, (x) => {
      const event = x as CustomEvent<QuestionAnswerEnteredEvent>;
      eventHandler(event.detail);
    });
  }
}

export class NextQuestionAnswerLoadedEvent {
  public static EVENT_NAME = 'onNextQuestionAnswerLoaded';

  constructor(public question: QuestionAnswer) {}

  public static publish(question: QuestionAnswer) {
    dispatchGlobalEvent(
      new CustomEvent(NextQuestionAnswerLoadedEvent.EVENT_NAME, {
        detail: new NextQuestionAnswerLoadedEvent(question),
      })
    );
  }

  public static subscribe(
    eventHandler: (event: NextQuestionAnswerLoadedEvent) => void
  ) {
    addGlobalEventListener(NextQuestionAnswerLoadedEvent.EVENT_NAME, (x) => {
      const event = x as CustomEvent<NextQuestionAnswerLoadedEvent>;
      eventHandler(event.detail);
    });
  }
}
