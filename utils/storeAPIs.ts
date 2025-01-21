import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";

const getPath = (filename: string) => {
  return FileSystem.documentDirectory + `${filename}.json`;
};

export const FileSystemAPI = {
  getItem: async (name: string) =>
    JSON.parse(await FileSystem.readAsStringAsync(getPath(name))),
  setItem: (name: string, value: string) =>
    FileSystem.writeAsStringAsync(getPath(name), JSON.stringify(value)),
  removeItem: (name: string) => FileSystem.deleteAsync(getPath(name)),
};

export const SecureStoreAPI = {
  getItem: async (name: string) => await SecureStore.getItemAsync(name),
  setItem: async (name: string, value: string) =>
    await SecureStore.setItemAsync(name, value),
  removeItem: async (name: string) => await SecureStore.deleteItemAsync(name),
};
