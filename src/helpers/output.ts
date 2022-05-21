export const Output = (body: string, status: number) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json'
  }
  return new Response(body, { headers, status: status })
}