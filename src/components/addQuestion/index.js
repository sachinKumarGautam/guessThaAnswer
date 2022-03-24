import React from 'react';

import './addQuestion.css';
import { api } from '../../api';
import { useServerData } from '../../state/serverDataContext';

export default function AddQuestionComp() {
  //   const serverQuestions = useServerData(data => {
  //     return data.questions || [];
  //   });

  const [text, setText] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');

  return (
    <div className="container">
      <div className="innerContainer">
        <div>Question</div>
        <input onChange={e => setQuestion(e.target.value)} />
        <div>Answer</div>
        <input onChange={e => setAnswer(e.target.value)} />
      </div>
    </div>
  );
}

// HomepageComp.fetchData = () => {
//   return api.questions.all().then(questions => {
//     const filteredQuestion =
//       questions && questions.filter(question => question.question);
//     return {
//       questions: filteredQuestion
//     };
//   });
// };
