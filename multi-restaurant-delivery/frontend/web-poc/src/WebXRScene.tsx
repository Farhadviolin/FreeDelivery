import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function DishModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export function WebXRScene() {
  const canvasRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (canvasRef.current && typeof window !== 'undefined') {
      // Dynamischer Import von VRButton nur im Browser-Kontext
      import('three/examples/jsm/webxr/VRButton')
        .then(({ VRButton }) => {
          // Dummy-Renderer für VRButton
          const dummyRenderer = { xr: { setSession: async (_: any) => {} } } as any;
          canvasRef.current!.appendChild(VRButton.createButton(dummyRenderer));
        })
        .catch(() => {
          /* ignore in test env */
        });
    }
  }, []);
  return (
    <div ref={canvasRef}>
      <span>Virtuelles Restaurant-Erlebnis</span>
      <Canvas>
        <ambientLight />
        <Suspense fallback={null}>
          <DishModel url="/assets/dish.glb" />
        </Suspense>
      </Canvas>
    </div>
  );
}
