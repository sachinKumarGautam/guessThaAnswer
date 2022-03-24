import { Router } from 'express';
import Bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import auth from './middleware/auth';

import {
  addQuestion,
  getAllQuestions,
  createNewUser,
  checkOldUser
} from './services/postServices';
// import User from './model/authUser';

export const apiRoutes = () => {
  const router = new Router();
  const todos = [{ id: 1, text: 'server-fetched todo' }];

  router.get('/api/todos', (_req, res) => {
    setTimeout(() => {
      res.json(todos);
    }, 300);
  });

  router.post('/api/question/add', auth, async (_req, res) => {
    try {
      console.log('inside');
      const data1 = await addQuestion();
      console.log('insertQuestion', data1);
      res.json(data1);
    } catch (err) {
      console.log(err);
    }
  });

  router.get('/api/questions', async (_req, res) => {
    try {
      console.log('inside', process.env.TOKEN_KEY, `${process.env.TOKEN_KEY}`);
      const data1 = await getAllQuestions();
      res.json(data1);
    } catch (err) {
      console.log(err);
      res.status(400).send('Some boo boo happened');
    }
  });

  router.post('/api/register', async (req, res) => {
    const body = req.body;
    try {
      const { first_name, email, password } = body;
      if (!(email && password && first_name)) {
        res.status(400).send('All input is required');
      }
      const oldUser = await checkOldUser(email);
      if (oldUser) {
        res
          .status(409)
          .send('This user already exists! Do not try to fool us!!');
      }
      const encrptedPassword = await Bcrypt.hash(password, 10);
      const newUserBody = {
        email: email.toLowerCase(),
        first_name,
        password: encrptedPassword
      };
      const newUser = await createNewUser(newUserBody);
      console.log('newUser', process.env.TOKEN_KEY);
      const token = jwt.sign(
        { user_id: newUser._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      );
      // save user token
      newUserBody.token = token;
      res.status(201).send(newUserBody);
      // const user = await User.create({
      //   first_name,
      //   last_name,
      //   email: email.toLowerCase(), // sanitize: convert email to lowercase
      //   password: encryptedPassword,
      // });
    } catch (err) {
      console.log('err', err);
    }
    // our register logic goes here...
  });

  // Login
  router.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        res.status(400).send('All Input are required');
      }
      const oldUser = await checkOldUser(email);
      const checkIfPasswordIsSame = await Bcrypt.compare(
        password,
        oldUser.password
      );

      if (oldUser && checkIfPasswordIsSame) {
        const token = jwt.sign(
          { user_id: oldUser._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: '2h'
          }
        );
        oldUser.token = token;
        delete oldUser.password;
        delete oldUser._id;
        res.status(200).json(oldUser);
      }
      res.status(400).send('Invalid Credentials');
    } catch (err) {
      console.log(err);
    }
    // our login logic goes here
  });

  // apiRoutes.post('/api/todos', (req, res) => {
  //   const newTodo = req.body;
  //   newTodo.id = Date.now();
  //   todos.push(newTodo);
  //   setTimeout(() => {
  //     res.json(newTodo);
  //   }, 100);
  // });

  return router;
};
