import React from 'react';
import { ViroARScene, Viro360Image } from 'react-viro';

export default function ARScene({ restaurantId }) {
  const [url, setUrl] = React.useState();
  React.useEffect(()=>{
    fetch(`https://api.delivery.com/content/360/${restaurantId}`)
      .then(r=>r.json())
      .then(urls=>setUrl(urls[0]));
  }, []);
  return (
    <ViroARScene>
      {url && <Viro360Image source={{ uri: url }} />}
    </ViroARScene>
  );
}
