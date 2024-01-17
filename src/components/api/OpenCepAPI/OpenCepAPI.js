export const fetchOpenCepApi = async (cep, token) => {
  try {
    const apiEndpoint = `http://opencep.com/v1/${cep}`;
    const response = await fetch(apiEndpoint, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      throw new Error(`Error fetching data. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
