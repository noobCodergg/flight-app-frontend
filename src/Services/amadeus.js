import axios from "axios";

const clientId = "Zjdnt5vjWbztWQmtDuIuXnRG0VGJe50J";
const clientSecret = "FMP8D46HCO7mIgkq";

export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error.response.data);
    throw error;
  }
};

export const fetchCities = async (keyword) => {
    try {
      const token = await getAccessToken();
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/locations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            subType: "CITY",
            keyword: keyword, // Example: Fetch cities matching the keyword
          },
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching cities:", error.response.data);
      throw error;
    }
  };
  