import { rest } from 'msw';

const handlers = [
  rest.get('/login', async (req, res, ctx) => {
    return res(ctx.json({ user: 'alex' }));
  }),
];

export { handlers };
