import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  const getItem = async (key) => {
    try {
      const proposals = await AsyncStorage.getItem(key);
      return JSON.parse(proposals) || [];
    } catch (error) {
      console.log("Erro na busca", error);
      return [];
    }
  };
  const saveItem = async (key, data) => {
    try {
      let proposals = await AsyncStorage.getItem(key);
      proposals = proposals ? JSON.parse(proposals) : [];
      proposals.push(data);
  
      await AsyncStorage.setItem(key, JSON.stringify(proposals));
    } catch (error) {
      console.log("Erro em salvar", error);
      return [];
    }
  };
  const removeItem = async (key, data) => {
    try {
      let proposals = await AsyncStorage.getItem(key);
      proposals = proposals ? JSON.parse(proposals) : [];
  
      let allProposals = proposals.filter((proposal) => {
        return proposal.id !== data.id;
      });
  
      await AsyncStorage.setItem(key, JSON.stringify(allProposals));
      return allProposals;
    } catch (error) {
      console.log("Erro em remover", error);
      return [];
    }
  };

  const logAsyncStorageItems = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
      }
    } catch (error) {
      console.error("Error reading AsyncStorage:", error);
    }
  };
  return { getItem, saveItem, removeItem, logAsyncStorageItems };
};

export default useStorage;
