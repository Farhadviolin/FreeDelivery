import * as tff from '@tensorflow/tfjs-federated';
async function trainLocal(modelWeights) {
  const localData = await fetchLocalTrainingData();
  const clientData = tff.sequence(localData);
  const clientUpdate = await tff.localUpdate(modelFn, modelWeights, clientData);
  return clientUpdate;
}
export async function federatedRound() {
  const currentWeights = await fetch('/model/weights').then(r=>r.json());
  const update = await trainLocal(currentWeights);
  const { metrics } = await fetch('/federate', {
    method:'POST', body: JSON.stringify({ weights: update }),
    headers:{'Content-Type':'application/json'}
  }).then(r=>r.json());
  return metrics;
}
