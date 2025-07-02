import { NativeModules } from 'react-native';
import { fetchEdgeModel } from './useEdgeModel';
const { EdgeModule } = NativeModules;
export async function runInference(input:number[]) {
  const modelPath = await fetchEdgeModel('v1.0.0');
  return EdgeModule.runInference(modelPath, input);
}
