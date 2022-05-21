import { Request } from "itty-router";
import { Output } from '../helpers/output';

interface AdminSignIn{
    email?: string
    password?: string
}

const SignIn = async (request: Request) => {
    const { email, password }: AdminSignIn = request.json ? await request.json() : {};

    const gqlRequest = await fetch('https://graphql.fauna.com/graphql', {      
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${FAUNA_SECRET}`,
    },
    body: JSON.stringify({
        query: `query adminLoginTempByEmailAndPassword($email: String!, $password: String!) { 
            adminLoginTempByEmailAndPassword(
                email: $email
                password: $password
            ){
                email
            }
        }`,
        variables: {
            email: email,
            password: password
        }
    })
  })
  const data:any = await gqlRequest.json()
  const body = JSON.stringify(data)

  if(data?.[0] === null || data?.errors) {
    return Output(body, 500)
  } else {
    return Output(body, 200)
  }
}

export default SignIn;