export const REQUEST_GAME = 'REQUEST_GAME';
export const RECEIVE_GAME = 'RECEIVE_GAME';

const requestGame = () => ({
  type: REQUEST_GAME,
});

const receiveGame = (data) => ({
  type: RECEIVE_GAME,
  data,
});

export function fetchGame(amount, token) {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&token=${token}`;
  return (dispatch) => {
    dispatch(requestGame());
    return fetch(endpoint)
      .then((response) => response.json())
      .then((obj) => dispatch(receiveGame(obj)));
  };
}
