const API_URL = process.env.API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:8080";

export const getRandomThought = async () => {
  try {
    const response = await fetch(`${API_URL}/random`);
    const json = response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export const postThought = async data => {
  try {
    const response = await fetch(`${API_URL}/thought`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const json = response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export const deleteThought = async data => {
  try {
    const response = await fetch(`${API_URL}/delete`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const json = response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export const putThought = async data => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const json = response.json();
    return json;
  } catch (e) {
    throw e;
  }
};

export default { getRandomThought, postThought, putThought, deleteThought };
