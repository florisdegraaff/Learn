export function checkAnswerWithGPT (question: string, answer: string, userAnswer: string) {
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