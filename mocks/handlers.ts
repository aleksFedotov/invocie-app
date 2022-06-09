import { rest } from 'msw';

const handlers = [
  rest.get('https://test/login', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ user: 'alex' }));
  }),
  rest.get('https://test/error', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ msg: 'something went wrong' }));
  }),
];

export { handlers };
