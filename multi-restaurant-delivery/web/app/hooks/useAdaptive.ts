import * as tf from '@tensorflow/tfjs';

export async function predictPreference(features: number[]) {
  const model = await tf.loadLayersModel('/models/adaptive_model.json');
  const input = tf.tensor([features]);
  const output = model.predict(input) as tf.Tensor;
  const score = (await output.data())[0];
  return score > 0.5;
}
