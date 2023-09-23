'use client';

const AnswerButton = (props: { answerId: number; answerText: string }) => {
  function handleClick(answerId: number): void {
    console.log(`Clicked on answer ${answerId}`);
  }

  return (
    <button
      className="bg-gray-200 p-4"
      onClick={() => handleClick(props.answerId)}
    >
      {props.answerText}
    </button>
  );
};

export default AnswerButton;
