# Three.js Components Used in GLB Rendering

## Overview

Three.js is a cross-browser JavaScript library used to create and display animated 3D computer graphics in a web browser using WebGL.

## Installation

```bash
npm install three
npm install @types/three  # For TypeScript support
```

## Core Three.js Objects Used

### 1. THREE.Group

A container for grouping objects together for transformation operations.

```jsx
import * as THREE from 'three';

// In React Three Fiber, accessed via refs
const groupRef = useRef < THREE.Group > null;

// Direct Three.js usage
const group = new THREE.Group();
group.add(mesh1);
group.add(mesh2);
scene.add(group);
```

**Properties:**

- `position`: Vector3 position in 3D space
- `rotation`: Euler rotation angles
- `scale`: Vector3 scale factors
- `children`: Array of child objects

**Use in GLB Component:**

```jsx
const modelRef = useRef < THREE.Group > null;
// Ref is attached to the loaded GLB scene root
```

### 2. THREE.Scene

The scene graph that contains all 3D objects, lights, and cameras.

```jsx
// In React Three Fiber, automatically created by Canvas
// Direct access via useThree hook
import { useThree } from '@react-three/fiber';

function MyComponent() {
  const { scene } = useThree();
  // scene is the THREE.Scene instance
}
```

**Key Methods:**

- `add(object)`: Add object to scene
- `remove(object)`: Remove object from scene
- `traverse(callback)`: Iterate through all descendants

### 3. THREE.Clock

Provides timing functionality for animations.

```jsx
// Accessed through useFrame state
useFrame((state) => {
  const elapsedTime = state.clock.elapsedTime;
  // Use for animations
});

// Direct Three.js usage
const clock = new THREE.Clock();
const deltaTime = clock.getDelta();
const elapsedTime = clock.getElapsedTime();
```

**Methods:**

- `getElapsedTime()`: Total time since clock started
- `getDelta()`: Time since last call
- `start()`: Start the clock
- `stop()`: Stop the clock

## Lighting Components

### 1. ambientLight

Provides uniform lighting from all directions.

```jsx
// React Three Fiber syntax
<ambientLight intensity={0.5} />;

// Equivalent Three.js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
```

**Properties:**

- `intensity`: Light strength (0-1+)
- `color`: Light color (default: white)

**Use Case:** Provides base illumination, prevents completely black shadows.

### 2. directionalLight

Simulates sunlight with parallel rays from a specific direction.

```jsx
<directionalLight
  position={[5, 5, 5]}
  intensity={1}
  castShadow
  shadow-mapSize-width={2048}
  shadow-mapSize-height={2048}
/>;

// Three.js equivalent
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);
```

**Properties:**

- `position`: Direction of light rays
- `intensity`: Light strength
- `castShadow`: Enable shadow casting
- `shadow.mapSize`: Shadow map resolution

### 3. pointLight

Emits light in all directions from a single point.

```jsx
<pointLight position={[-5, 5, 5]} intensity={0.5} />;

// Three.js equivalent
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.set(-5, 5, 5);
scene.add(pointLight);
```

**Properties:**

- `position`: Light source location
- `intensity`: Light strength
- `distance`: Light attenuation distance
- `decay`: Light decay rate

## Geometry and Materials

### 1. boxGeometry

Creates a rectangular cuboid geometry.

```jsx
// React Three Fiber
<boxGeometry args={[1, 1, 1]} />;

// Three.js
const geometry = new THREE.BoxGeometry(1, 1, 1);
```

**Parameters:**

- `width`: Size along X axis
- `height`: Size along Y axis
- `depth`: Size along Z axis

### 2. meshStandardMaterial

Physically-based material that responds to lighting.

```jsx
// React Three Fiber
<meshStandardMaterial color="lightblue" wireframe />;

// Three.js
const material = new THREE.MeshStandardMaterial({
  color: 'lightblue',
  wireframe: true,
});
```

**Properties:**

- `color`: Base color
- `wireframe`: Show wireframe instead of solid
- `metalness`: Metallic appearance (0-1)
- `roughness`: Surface roughness (0-1)

## Animation and Timing

### Frame-based Animation

```jsx
// Using useFrame hook
useFrame((state) => {
  // state.clock.elapsedTime for total time
  // Use for smooth animations
  if (meshRef.current) {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  }
});
```

## Common Three.js Patterns

### Object Manipulation

```jsx
// Position
object.position.set(x, y, z);
object.position.x = 5;

// Rotation (in radians)
object.rotation.y = Math.PI / 2;
object.rotation.set(x, y, z);

// Scale
object.scale.set(2, 2, 2);
object.scale.multiplyScalar(1.5);
```

### Vector3 Operations

```jsx
import { Vector3 } from 'three';

const vector = new Vector3(1, 2, 3);
vector.normalize(); // Make unit length
vector.length(); // Get magnitude
vector.add(otherVector); // Add vectors
```

## Performance Considerations

### Object Disposal

```jsx
// Three.js objects need manual cleanup
geometry.dispose();
material.dispose();
texture.dispose();

// React Three Fiber handles this automatically
// when components unmount
```

### Optimization Tips

1. **Reuse Geometries**: Create once, use multiple times
2. **Texture Management**: Dispose unused textures
3. **Shadow Optimization**: Limit shadow-casting lights
4. **LOD**: Use Level of Detail for distant objects

## Integration with React Three Fiber

### Refs for Direct Access

```jsx
const meshRef = useRef<THREE.Mesh>(null)

useEffect(() => {
  if (meshRef.current) {
    // Direct Three.js manipulation
    meshRef.current.material.color.setHex(0xff0000)
  }
}, [])

return <mesh ref={meshRef}>
```

### Accessing Three.js Context

```jsx
import { useThree } from '@react-three/fiber';

function MyComponent() {
  const { scene, camera, gl } = useThree();
  // scene: THREE.Scene
  // camera: THREE.Camera
  // gl: THREE.WebGLRenderer
}
```
