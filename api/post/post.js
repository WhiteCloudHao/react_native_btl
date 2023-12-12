import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export const getListPosts = async(requestData) => {

  try {
    const authToken = await AsyncStorage.getItem('token');
    const response = await fetch(`${baseURL}get_list_posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${authToken}`,
      },
      body: JSON.stringify(requestData), // Chuyển đối tượng JSON thành chuỗi
    });

    const data = await response.json();
    // console.log(data)
    return data.data.post;

  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }  

}