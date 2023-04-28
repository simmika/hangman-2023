export const Img = ({ incorrectCount }) => (
  <img
    className="mx-auto"
    alt="state"
    src={`./img/hangman${incorrectCount}.png`}
    width="200"
    height="400"
  />
)
