import * as FileSystem from 'expo-file-system';
export async function fetchEdgeModel(version:string) {
  const uri = `https://cdn.delivery.com/edge_models/${version}.tflite`;
  const localPath = `${FileSystem.cacheDirectory}edge_model_${version}.tflite`;
  const stat = await FileSystem.getInfoAsync(localPath);
  if (!stat.exists) await FileSystem.downloadAsync(uri, localPath);
  return localPath;
}
