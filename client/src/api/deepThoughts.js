const API_URL = "http://localhost:8080";

export const getRandomThought = async () => {
  try {
    const response = await fetch(`${API_URL}/random`);
    const json = response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export const postThought = async () => {};

export const deleteThought = async () => {};

export const putThought = async () => {};

export default { getRandomThought, postThought, putThought, deleteThought };
