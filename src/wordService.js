export async function getWord() {
  let response = await fetch(`https://random-word-api.vercel.app/api?words=1`)
  let responseJson = await response.json()
  // console.log(responseJson[0]);

  return responseJson[0]
}
