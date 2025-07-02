import React from 'react';
import { ViroARSceneNavigator, ViroARScene, ViroText, Viro3DObject } from '@viro-community/react-viro';

const ARScene = () => (
  <ViroARScene>
    <ViroText text="Wählen Sie Ihr Gericht" position={[0, 0, -1]} />
    <Viro3DObject
      source={{ uri: 'https://assets.delivery.com/assets/dish.glb' }}
      position={[0, -0.5, -1]}
      scale={[0.2, 0.2, 0.2]}
      type="GLB"
    />
  </ViroARScene>
);

export default function ARExperience() {
  return <ViroARSceneNavigator initialScene={{ scene: ARScene }} />;
}
