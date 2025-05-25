import type { Meta, StoryObj } from '@storybook/react';
import { MultipleChoiceQuestion } from '../../../../packages/ui/src/MultipleChoice/component';
 
const meta = {
  title: 'Questions/Multiple choice',
  component: MultipleChoiceQuestion,
  tags: ['autodocs'],
} satisfies Meta<typeof MultipleChoiceQuestion>;
 
export default meta;
type Story = StoryObj<typeof meta>;
 
export const Primary: Story = {
  args: {
    nextQuestion: () => {},
    question: {
      _type: "multipleChoiceQuestion",
      question: "Example question?",
      answers: [
        {
          _key: '1a',
          answer: "Correct",
          isCorrect: true
        },
        {
          _key: '1b',
          answer: "Incorrect",
          isCorrect: false
        }
      ]
    }
  },
};