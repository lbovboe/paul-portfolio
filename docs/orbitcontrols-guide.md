# OrbitControls Comprehensive Guide

## Overview

OrbitControls is a camera control system that allows users to orbit around a target point using mouse or touch input. It's one of the most commonly used controls in 3D web applications.

## Installation and Import

```tsx
// Via @react-three/drei (recommended for React)
import { OrbitControls } from '@react-three/drei';

// Direct Three.js (for vanilla JS projects)
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
```

## Basic Usage

### React Three Fiber

```tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

<Canvas>
  <OrbitControls />
  {/* Your 3D objects */}
</Canvas>;
```

### Vanilla Three.js

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
```

## Control Types

### 1. Rotation (Orbiting)

**Input**: Left mouse button + drag (desktop) or single touch + drag (mobile)
**Action**: Rotates camera around the target point
**Use**: Primary navigation method for viewing objects from all angles

```tsx
<OrbitControls
  enableRotate={true} // Enable/disable rotation
  rotateSpeed={1.0} // Rotation sensitivity
  minPolarAngle={0} // Minimum vertical angle (radians)
  maxPolarAngle={Math.PI} // Maximum vertical angle (radians)
  minAzimuthAngle={-Infinity} // Minimum horizontal angle
  maxAzimuthAngle={Infinity} // Maximum horizontal angle
/>
```

### 2. Zooming

**Input**: Mouse wheel (desktop) or pinch gesture (mobile)
**Action**: Moves camera closer to or farther from target
**Use**: Getting detailed views or overview perspectives

```tsx
<OrbitControls
  enableZoom={true} // Enable/disable zoom
  zoomSpeed={1.0} // Zoom sensitivity
  minDistance={1} // Closest zoom distance
  maxDistance={100} // Farthest zoom distance
/>
```

### 3. Panning

**Input**: Right mouse button + drag (desktop) or two-finger drag (mobile)
**Action**: Moves camera and target laterally
**Use**: Repositioning the view without changing distance or angle

```tsx
<OrbitControls
  enablePan={true} // Enable/disable panning
  panSpeed={1.0} // Pan sensitivity
  screenSpacePanning={true} // Pan in screen space vs world space
/>
```

## Complete Configuration Options

### Basic Controls

```tsx
<OrbitControls
  // Enable/disable features
  enableRotate={true}
  enableZoom={true}
  enablePan={true}
  // Speed settings
  rotateSpeed={1.0}
  zoomSpeed={1.0}
  panSpeed={1.0}
  // Distance limits
  minDistance={1}
  maxDistance={100}
  // Angle limits (in radians)
  minPolarAngle={0} // Top limit
  maxPolarAngle={Math.PI} // Bottom limit
  minAzimuthAngle={-Infinity} // Left limit
  maxAzimuthAngle={Infinity} // Right limit
/>
```

### Advanced Settings

```tsx
<OrbitControls
  // Damping for smooth movement
  enableDamping={true}
  dampingFactor={0.05}
  // Auto rotation
  autoRotate={true}
  autoRotateSpeed={2.0}
  // Target position
  target={[0, 0, 0]}
  // Mouse buttons (0=left, 1=middle, 2=right)
  mouseButtons={{
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  }}
  // Touch settings
  touches={{
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  }}
  // Key bindings
  keys={{
    LEFT: 'ArrowLeft',
    UP: 'ArrowUp',
    RIGHT: 'ArrowRight',
    BOTTOM: 'ArrowDown',
  }}
/>
```

## Practical Examples

### Photography Mode

```tsx
// Smooth, cinematic camera movement
<OrbitControls
  enableDamping={true}
  dampingFactor={0.02}
  rotateSpeed={0.5}
  zoomSpeed={0.8}
  panSpeed={0.8}
  minDistance={2}
  maxDistance={20}
  maxPolarAngle={Math.PI * 0.75} // Prevent going below ground
/>
```

### Architectural Walkthrough

```tsx
// Fast, responsive controls for building exploration
<OrbitControls
  rotateSpeed={2.0}
  zoomSpeed={1.5}
  panSpeed={2.0}
  minDistance={0.5}
  maxDistance={50}
  minPolarAngle={Math.PI * 0.1} // Prevent extreme top-down view
  maxPolarAngle={Math.PI * 0.9} // Prevent underground view
/>
```

### Product Showcase

```tsx
// Controlled viewing for product display
<OrbitControls
  enablePan={false} // Disable panning
  enableZoom={true}
  rotateSpeed={0.8}
  zoomSpeed={0.6}
  minDistance={3}
  maxDistance={8}
  minPolarAngle={Math.PI * 0.2}
  maxPolarAngle={Math.PI * 0.8}
  autoRotate={true}
  autoRotateSpeed={1.0}
/>
```

### Mobile-Optimized

```tsx
// Touch-friendly settings
<OrbitControls
  rotateSpeed={1.2}
  zoomSpeed={1.5}
  panSpeed={1.2}
  enableDamping={true}
  dampingFactor={0.08} // Slightly more damping for touch
  touches={{
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY_PAN,
  }}
/>
```

## Event Handling

### React Three Fiber Events

```tsx
function CameraController() {
  const controlsRef = useRef();

  return (
    <OrbitControls
      ref={controlsRef}
      onChange={() => {
        // Called when camera position changes
        console.log('Camera moved');
      }}
      onStart={() => {
        // Called when user starts interaction
        console.log('Control started');
      }}
      onEnd={() => {
        // Called when user ends interaction
        console.log('Control ended');
      }}
    />
  );
}
```

### Custom Event Handlers

```tsx
const [isControlling, setIsControlling] = useState(false)

<OrbitControls
  onStart={() => setIsControlling(true)}
  onEnd={() => setIsControlling(false)}
  onChange={() => {
    // Update UI based on camera changes
    updateCameraUI()
  }}
/>
```

## Animation Integration

### Auto-Rotation with Pause

```tsx
function AutoRotatingControls() {
  const [autoRotate, setAutoRotate] = useState(true);

  return (
    <OrbitControls
      autoRotate={autoRotate}
      autoRotateSpeed={1.0}
      onStart={() => setAutoRotate(false)} // Pause on interaction
      onEnd={() => {
        // Resume after delay
        setTimeout(() => setAutoRotate(true), 3000);
      }}
    />
  );
}
```

### Camera Position Presets

```tsx
function ControlsWithPresets() {
  const controlsRef = useRef();

  const goToPreset = (position, target) => {
    if (controlsRef.current) {
      // Animate to preset position
      gsap.to(controlsRef.current.object.position, {
        duration: 1,
        x: position[0],
        y: position[1],
        z: position[2],
        onUpdate: () => controlsRef.current.update(),
      });
    }
  };

  return (
    <>
      <OrbitControls ref={controlsRef} />
      <button onClick={() => goToPreset([5, 5, 5], [0, 0, 0])}>Front View</button>
    </>
  );
}
```

## Performance Optimization

### Efficient Update Loop

```tsx
// Enable damping but update manually for better performance
<OrbitControls
  enableDamping={true}
  dampingFactor={0.05}
  // Manual update in render loop for better control
/>;

// In your render loop
useFrame(() => {
  if (controlsRef.current) {
    controlsRef.current.update();
  }
});
```

### Reduced Update Frequency

```tsx
function OptimizedControls() {
  const controlsRef = useRef();
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useFrame(() => {
    if (needsUpdate && controlsRef.current) {
      controlsRef.current.update();
      setNeedsUpdate(false);
    }
  });

  return <OrbitControls ref={controlsRef} onChange={() => setNeedsUpdate(true)} />;
}
```

## Troubleshooting

### Common Issues

1. **Controls not working**:

   ```tsx
   // Ensure OrbitControls is inside Canvas
   <Canvas>
     <OrbitControls /> {/* Correct */}
   </Canvas>
   // Not outside the Canvas
   ```

2. **Jumpy movement**:

   ```tsx
   // Add damping for smooth movement
   <OrbitControls enableDamping={true} dampingFactor={0.05} />
   ```

3. **Mobile touch issues**:

   ```tsx
   // Configure touch events properly
   <OrbitControls
     touches={{
       ONE: THREE.TOUCH.ROTATE,
       TWO: THREE.TOUCH.DOLLY_PAN,
     }}
   />
   ```

4. **Camera limits not working**:
   ```tsx
   // Ensure angles are in radians, not degrees
   <OrbitControls
     minPolarAngle={Math.PI * 0.2} // 36 degrees
     maxPolarAngle={Math.PI * 0.8} // 144 degrees
   />
   ```

### CSS Considerations

```css
/* Ensure canvas can receive mouse events */
canvas {
  touch-action: none; /* Prevent default touch behaviors */
  user-select: none; /* Prevent text selection */
}

/* For full-screen canvases */
.canvas-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
```

## Best Practices

1. **Set appropriate limits**: Always set min/max distances and angles
2. **Use damping**: Enables smooth, professional movement
3. **Mobile optimization**: Configure touch events properly
4. **Performance**: Update manually when possible
5. **User feedback**: Provide visual indicators during interaction
6. **Accessibility**: Consider keyboard controls for accessibility

## Integration with Other Systems

### With Animation Libraries

```tsx
// GSAP integration
import gsap from 'gsap';

function AnimatedControls() {
  const controlsRef = useRef();

  const animateCamera = () => {
    gsap.to(controlsRef.current.object.position, {
      duration: 2,
      x: 10,
      y: 5,
      z: 10,
      onUpdate: () => controlsRef.current.update(),
    });
  };

  return <OrbitControls ref={controlsRef} />;
}
```

### With UI Controls

```tsx
function UIIntegratedControls() {
  const [settings, setSettings] = useState({
    autoRotate: true,
    rotateSpeed: 1.0,
    enableZoom: true,
  });

  return (
    <>
      <OrbitControls {...settings} />
      <div className="ui-panel">
        <label>
          Auto Rotate:
          <input
            type="checkbox"
            checked={settings.autoRotate}
            onChange={(e) =>
              setSettings((prev) => ({
                ...prev,
                autoRotate: e.target.checked,
              }))
            }
          />
        </label>
      </div>
    </>
  );
}
```

This comprehensive guide covers all aspects of OrbitControls implementation and usage in 3D web applications.
