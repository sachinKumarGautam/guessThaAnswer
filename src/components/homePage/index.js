import React from 'react';

import './homepage.css';
import { api } from '../../api';
import { useServerData } from '../../state/serverDataContext';

export default function HomepageComp() {
  const serverQuestions = useServerData(data => {
    return data.questions || [];
  });
  const [text, setText] = React.useState('');
  const [questions, setQuestions] = React.useState(serverQuestions);

  const randomIndex = Math.floor(Math.random() * questions.length);
  const qandomQuestion = questions[randomIndex] || {};
  console.log('randomIndex', randomIndex, questions[randomIndex], questions);
  console.log('sss');
  return (
    <div className="container">
      <div className="innerContainer">
        <div>Question: {qandomQuestion.question}</div>
        <div>answer: {qandomQuestion.answer}</div>
      </div>
    </div>
  );
}

HomepageComp.fetchData = () => {
  return api.questions.all().then(questions => {
    const filteredQuestion =
      questions && questions.filter(question => question.question);
    return {
      questions: filteredQuestion
    };
  });
};
