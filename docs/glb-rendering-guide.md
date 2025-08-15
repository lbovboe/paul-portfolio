# GLB Rendering Step-by-Step Guide

## Overview

This guide walks through creating a complete GLB (GLTF Binary) 3D model viewer using React Three Fiber, Drei, and Three.js.

## Prerequisites

- React project setup
- Basic understanding of React hooks
- GLB/GLTF model file

## Step 1: Installation and Setup

### Install Required Dependencies

```bash
npm install @react-three/fiber @react-three/drei three
npm install @types/three  # For TypeScript projects
```

### Project Structure

```
src/
  components/
    GLBViewer.tsx
  public/
    models/
      your-model.glb
```

## Step 2: Basic Component Structure

### Create the Base Component

```tsx
'use client'; // If using Next.js App Router

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';

const GLBViewer: React.FC = () => {
  return <div className="h-96 w-full">{/* Canvas will go here */}</div>;
};

export default GLBViewer;
```

## Step 3: Add the Three.js Canvas

### Setup Canvas with Camera

```tsx
const GLBViewer: React.FC = () => {
  return (
    <div className="h-96 w-full">
      <Canvas
        camera={{
          position: [0, 0, 5], // Camera starting position
          fov: 45, // Field of view
          near: 0.1, // Near clipping plane
          far: 1000, // Far clipping plane
        }}
        style={{ background: 'transparent' }}
      >
        {/* 3D content will go here */}
      </Canvas>
    </div>
  );
};
```

## Step 4: Create the Model Component

### Model Loading and Animation

```tsx
function GLBModel({ modelPath }: { modelPath: string }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  // Auto-rotation animation
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <Center>
      <primitive ref={modelRef} object={scene} scale={[2, 2, 2]} position={[0, 0, 0]} />
    </Center>
  );
}
```

### Explanation of Components:

- **`useGLTF`**: Loads the GLB file and returns the scene
- **`primitive`**: Renders the loaded Three.js object
- **`Center`**: Automatically centers the model
- **`useFrame`**: Hook for per-frame animation
- **`useRef`**: React ref for direct object manipulation

## Step 5: Add Lighting

### Basic Lighting Setup

```tsx
<Canvas>
  {/* Ambient light - provides base illumination */}
  <ambientLight intensity={0.5} />

  {/* Directional light - simulates sunlight */}
  <directionalLight
    position={[5, 5, 5]}
    intensity={1}
    castShadow
    shadow-mapSize-width={2048}
    shadow-mapSize-height={2048}
  />

  {/* Point light - additional lighting */}
  <pointLight position={[-5, 5, 5]} intensity={0.5} />

  {/* Your model goes here */}
</Canvas>
```

## Step 6: Add Environment and Controls

### Environment Lighting

```tsx
import { Environment } from '@react-three/drei';

<Canvas>
  {/* Basic lighting */}
  <ambientLight intensity={0.5} />
  <directionalLight position={[5, 5, 5]} intensity={1} />

  {/* Environment for realistic reflections */}
  <Environment preset="city" />

  {/* Model with Suspense for loading */}
  <Suspense fallback={<LoadingFallback />}>
    <GLBModel modelPath="/your-model.glb" />
  </Suspense>

  {/* Interactive controls */}
  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
</Canvas>;
```

## Step 7: Add Loading States

### Loading Fallback Component

```tsx
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="lightblue" wireframe />
    </mesh>
  );
}
```

### React Loading State

```tsx
const GLBViewer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-96 w-full">
      {/* HTML Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div>Loading 3D Model...</div>
        </div>
      )}

      <Canvas
        onCreated={() => {
          setTimeout(() => setIsLoading(false), 1000);
        }}
      >
        {/* Canvas content */}
      </Canvas>
    </div>
  );
};
```

## Step 8: Performance Optimization

### Preload Models

```tsx
// At the bottom of your component file
useGLTF.preload('/your-model.glb');
```

### Optimize Controls

```tsx
<OrbitControls
  makeDefault // Makes it the default controls
  enableDamping // Smooth camera movements
  dampingFactor={0.05}
/>
```

## Step 9: Complete Implementation

### Full Component Example

```tsx
'use client';

import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';

// Model component
function GLBModel({ modelPath }: { modelPath: string }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

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

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="lightblue" wireframe />
    </mesh>
  );
}

// Main component
const GLBViewer: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center">
            <div>Loading 3D Model...</div>
            <div className="mt-2 h-1 w-32 rounded bg-gray-200">
              <div className="h-full animate-pulse rounded bg-blue-500"></div>
            </div>
          </div>
        </div>
      )}

      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        onCreated={() => {
          setTimeout(() => setIsLoading(false), 1000);
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />

        {/* Environment */}
        <Environment preset="city" />

        {/* Model */}
        <Suspense fallback={<LoadingFallback />}>
          <GLBModel modelPath="/lightModel.glb" />
        </Suspense>

        {/* Controls */}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
      </Canvas>

      {/* Control Instructions */}
      <div className="absolute bottom-4 left-4 rounded bg-black/60 p-2 text-xs text-white">
        <div>• Drag to rotate</div>
        <div>• Scroll to zoom</div>
        <div>• Right-click to pan</div>
      </div>
    </div>
  );
};

// Preload for performance
useGLTF.preload('/lightModel.glb');

export default GLBViewer;
```

## Step 10: Advanced Features

### Error Handling

```tsx
function GLBModel({ modelPath }: { modelPath: string }) {
  try {
    const { scene } = useGLTF(modelPath);
    // ... rest of component
  } catch (error) {
    console.error('Error loading model:', error);
    return <LoadingFallback />; // Fallback on error
  }
}
```

### Custom Materials

```tsx
function GLBModel({ modelPath }: { modelPath: string }) {
  const { scene, materials } = useGLTF(modelPath);

  // Modify materials
  useEffect(() => {
    if (materials.MaterialName) {
      materials.MaterialName.color.setHex(0xff0000);
    }
  }, [materials]);

  return <primitive object={scene} />;
}
```

### Animation Controls

```tsx
function GLBModel({ modelPath, autoRotate = true }: { modelPath: string; autoRotate?: boolean }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}
```

## Troubleshooting

### Common Issues:

1. **Model not loading**:

   - Check file path (must be in public folder)
   - Verify GLB file is valid
   - Check browser console for errors

2. **Performance issues**:

   - Reduce model complexity
   - Use model compression
   - Implement LOD (Level of Detail)

3. **Controls not working**:

   - Ensure OrbitControls is inside Canvas
   - Check for CSS pointer-events interference

4. **Dark model**:
   - Add more lighting
   - Use Environment component
   - Check material properties

### Performance Tips:

- Preload critical models
- Use Suspense for loading states
- Dispose of unused resources
- Optimize model file sizes
- Use appropriate shadow settings

## File Structure Best Practices

```
src/
  components/
    3D/
      GLBViewer.tsx
      ModelComponents/
        GLBModel.tsx
        LoadingFallback.tsx
  public/
    models/
      optimized/
        model-optimized.glb
      original/
        model-original.glb
  docs/
    threejs-setup.md
    model-optimization.md
```

This guide provides a complete foundation for implementing GLB model rendering in React applications using the Three.js ecosystem.
