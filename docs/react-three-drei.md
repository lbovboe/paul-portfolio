# React Three Drei (@react-three/drei)

## Overview

React Three Drei is a collection of useful helpers and abstractions for React Three Fiber, providing ready-to-use components for common 3D scenarios.

## Installation

```bash
npm install @react-three/drei
```

## Components Used in GLB Component

### 1. OrbitControls

Provides mouse/touch controls for orbiting around a target.

```jsx
import { OrbitControls } from '@react-three/drei';

<OrbitControls
  enablePan={true}
  enableZoom={true}
  enableRotate={true}
  minDistance={2}
  maxDistance={10}
  minPolarAngle={0}
  maxPolarAngle={Math.PI}
/>;
```

**Props:**

- `enablePan`: Allow panning (right-click drag)
- `enableZoom`: Allow zooming (scroll wheel)
- `enableRotate`: Allow rotation (left-click drag)
- `minDistance/maxDistance`: Zoom limits
- `minPolarAngle/maxPolarAngle`: Vertical rotation limits

**Controls:**

- **Left-click + drag**: Rotate camera around target
- **Right-click + drag**: Pan camera position
- **Scroll wheel**: Zoom in/out

### 2. useGLTF Hook

Loads GLTF/GLB 3D model files.

```jsx
import { useGLTF } from '@react-three/drei';

function Model() {
  const { scene } = useGLTF('/path/to/model.glb');
  return <primitive object={scene} />;
}

// Preload for better performance
useGLTF.preload('/path/to/model.glb');
```

**Returns:**

- `scene`: The loaded 3D scene
- `animations`: Animation clips (if any)
- `materials`: Materials used in the model
- `nodes`: Individual mesh nodes

**Usage Patterns:**

```jsx
// Basic usage
const { scene } = useGLTF('/model.glb')
<primitive object={scene} scale={[2, 2, 2]} />

// Access specific nodes
const { nodes, materials } = useGLTF('/model.glb')
<mesh geometry={nodes.MeshName.geometry} material={materials.MaterialName} />
```

### 3. Environment

Provides environment lighting and reflections.

```jsx
import { Environment } from '@react-three/drei';

<Environment preset="city" />;
```

**Presets Available:**

- `"city"`: Urban environment
- `"forest"`: Natural forest setting
- `"studio"`: Photography studio lighting
- `"sunset"`: Warm sunset lighting
- `"dawn"`: Cool morning lighting
- `"night"`: Dark night environment
- `"warehouse"`: Industrial setting

**Custom Environment:**

```jsx
<Environment files="/path/to/hdri.hdr" />
```

**Benefits:**

- Realistic lighting and reflections
- Enhances material appearance
- No manual light setup required

### 4. Center

Automatically centers objects in the scene.

```jsx
import { Center } from '@react-three/drei';

<Center>
  <primitive object={scene} />
</Center>;
```

**Props:**

- `position`: Offset from center
- `alignTop/alignBottom`: Vertical alignment options

**Use Cases:**

- Ensuring models appear centered regardless of their original pivot point
- Consistent positioning across different models

### 5. Suspense Integration

Drei components work seamlessly with React Suspense.

```jsx
import { Suspense } from 'react';

<Suspense fallback={<LoadingComponent />}>
  <Model />
</Suspense>;
```

## Advanced Features

### Preloading

```jsx
// Preload models before component mounts
useGLTF.preload('/model1.glb');
useGLTF.preload('/model2.glb');
```

### Error Handling

```jsx
const { scene, error } = useGLTF('/model.glb');
if (error) return <ErrorComponent />;
```

## Performance Tips

1. **Preload Models**: Use `useGLTF.preload()` for better UX
2. **Dispose Resources**: Drei handles cleanup automatically
3. **Use Suspense**: Prevent render blocking during loads
4. **Environment Optimization**: Choose appropriate environment presets

## Common Patterns in GLB Component

### Model Loading with Auto-rotation

```jsx
function GLBModel() {
  const modelRef = useRef();
  const { scene } = useGLTF('/lightModel.glb');

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Center>
      <primitive ref={modelRef} object={scene} scale={[2, 2, 2]} />
    </Center>
  );
}
```

### Complete Scene Setup

```jsx
<Canvas>
  <Environment preset="city" />
  <Suspense fallback={<Loader />}>
    <GLBModel />
  </Suspense>
  <OrbitControls />
</Canvas>
```

## Troubleshooting

### Model Not Loading

- Check file path is correct
- Ensure GLB file is in public folder
- Verify file is valid GLB format

### Performance Issues

- Use model compression tools
- Implement LOD (Level of Detail)
- Preload critical models

### Control Issues

- Ensure OrbitControls is inside Canvas
- Check if other elements are blocking mouse events
- Verify enablePan/enableZoom/enableRotate settings
