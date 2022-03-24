import { getQuestions, insertQuestion, getDb, findUser } from '../dbConnection';

export const addQuestion = async dataProps => {
  const dataObj = {
    question: 'hey this is question',
    answer: 'this is answer'
  };
  const data = await insertQuestion(dataObj);
  return data;
};

export const getAllQuestions = async () => {
  const data = await getQuestions();
  return data;
};

export const checkOldUser = async email => {
  const user = await findUser(email);
  return user;
};

export const createNewUser = async body => {
  const db = await getDb();
  const newUserCollection = await db.collection('auth');
  return await newUserCollection.insertOne(body);
};
// export { addQuestion, getAllQuestions };
