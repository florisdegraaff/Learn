export function checkAnswerWithGPT (question: string, answer: string, userAnswer: string):
  Promise<{
    response: {
      result: "correct" | "incorrect",
      feedback: "string"
    }
  }>
{
  return fetch('/api/gpt', {
    method: 'post',
    body: JSON.stringify({
      question,
      answer,
      userAnswer
    })
  })
  .then(response => response.json())
}