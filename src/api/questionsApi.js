export function questionsApi(http) {
  return {
    all: () => {
      return http.get('/api/questions');
    },

    create: newQuestion => {
      return http.post('/api/question/add', newQuestion);
    }
  };
}
