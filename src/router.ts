import { Request, Router } from 'itty-router';
import { Output } from './helpers/output';
import SignIn from './routes/signin';

const router = Router()

router
  .post('/signin', request => SignIn(request))
  .all('*', () => {
     return Output(JSON.stringify({
      error: {
        message: "API route not found!"
      }
    }), 400)})

export const handleRequest = (request: Request) => router.handle(request)