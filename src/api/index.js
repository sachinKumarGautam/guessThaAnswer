import { httpClient } from './httpClient';
import { questionsApi } from './questionsApi';
import { todosApi } from './todosApi';

export function apiFactory(http) {
  return {
    todos: todosApi(http),
    questions: questionsApi(http)
  };
}

const http = httpClient('http://localhost:3000');
export const api = apiFactory(http);
