# React Three Fiber (@react-three/fiber)

## Overview

React Three Fiber is a React renderer for Three.js that allows you to build 3D scenes using React components and JSX syntax.

## Installation

```bash
npm install @react-three/fiber three
```

## Core Components Used in GLB Component

### 1. Canvas

The root component that creates the WebGL context and Three.js scene.

```jsx
import { Canvas } from '@react-three/fiber';

<Canvas
  camera={{
    position: [0, 0, 5],
    fov: 45,
    near: 0.1,
    far: 1000,
  }}
  style={{
    background: 'transparent',
  }}
  onCreated={() => {
    // Callback when canvas is ready
  }}
>
  {/* 3D content goes here */}
</Canvas>;
```

**Props:**

- `camera`: Camera configuration object
- `style`: CSS styles for the canvas element
- `onCreated`: Callback function when the canvas is created

### 2. useFrame Hook

A hook that allows you to run code on every frame render.

```jsx
import { useFrame } from '@react-three/fiber';

function AnimatedComponent() {
  const meshRef = useRef();

  useFrame((state) => {
    // Runs every frame (~60fps)
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return <mesh ref={meshRef}>...</mesh>;
}
```

**Parameters:**

- `state`: Object containing scene state
  - `clock`: Three.js clock for timing
  - `camera`: Current camera
  - `scene`: Three.js scene
  - `gl`: WebGL renderer

## Key Features

### Declarative 3D

Write 3D scenes using familiar React patterns:

```jsx
// Instead of imperative Three.js code:
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial()
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Use declarative JSX:
<mesh>
  <boxGeometry />
  <meshBasicMaterial />
</mesh>
```

### React Lifecycle

Components follow React lifecycle patterns with useEffect, useState, etc.

### Performance

Automatically handles disposal of Three.js objects when components unmount.

## Usage in GLB Component

1. **Canvas Setup**: Creates the 3D rendering context
2. **Animation Loop**: useFrame hook handles auto-rotation
3. **React Integration**: Manages loading states with React hooks

## Best Practices

1. **Refs for Direct Access**: Use refs when you need direct access to Three.js objects
2. **Performance**: Avoid creating objects in render loops
3. **Cleanup**: Let React Three Fiber handle object disposal
4. **State Management**: Use React state for UI, Three.js objects for 3D data

## Common Patterns

### Conditional Rendering

```jsx
{
  isLoaded && <MyModel />;
}
```

### Event Handling

```jsx
<mesh onClick={() => console.log('clicked')}>
```

### Refs

```jsx
const meshRef = useRef()
return <mesh ref={meshRef}>
```
