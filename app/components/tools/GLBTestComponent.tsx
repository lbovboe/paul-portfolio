'use client';

/*
 * 3D MODEL RENDERING EXPLANATION FOR BEGINNERS
 * =============================================
 *
 * This component demonstrates how to render 3D models in React using Three.js.
 * Here's what each major concept means:
 *
 * 🎯 MAIN LIBRARIES:
 * - Three.js: The core 3D graphics library for web browsers
 * - React Three Fiber (@react-three/fiber): React wrapper for Three.js
 * - React Three Drei (@react-three/drei): Helper components and utilities
 *
 * 🏗️ KEY 3D CONCEPTS:
 * - Scene: The 3D world container that holds all objects
 * - Camera: Your viewpoint into the 3D world (like your eyes)
 * - Mesh: A 3D object made of geometry (shape) + material (appearance)
 * - Lighting: Illuminates objects so they're visible and look realistic
 * - Controls: Allow user interaction (rotate, zoom, pan)
 *
 * 📐 COORDINATE SYSTEM:
 * - X-axis: Left (-) to Right (+)
 * - Y-axis: Down (-) to Up (+)
 * - Z-axis: Away from screen (-) to Toward screen (+)
 * - Origin (0,0,0): Center point of the 3D space
 *
 * 🔄 RENDERING PIPELINE:
 * 1. Load 3D model file (GLB format)
 * 2. Set up camera position and settings
 * 3. Add lighting to illuminate the model
 * 4. Apply materials and textures
 * 5. Enable user controls for interaction
 * 6. Render everything to the screen
 */

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';

// GLB Model Component - This loads and displays the 3D model
function GLBModel() {
  // useRef creates a reference to the 3D model group so we can manipulate it directly
  // THREE.Group is a container that holds multiple 3D objects together
  const modelRef = useRef<THREE.Group>(null);

  // useGLTF is a hook that loads GLB/GLTF 3D model files
  // GLB files are compressed 3D models that include geometry, materials, textures, and animations
  // The 'scene' contains all the 3D objects, lights, and cameras from the model file
  const { scene } = useGLTF('/lightModel.glb');

  // useFrame runs every frame (60fps) and allows us to animate the model
  // 'state' provides access to the Three.js scene state including time and camera info
  useFrame((state) => {
    if (modelRef.current) {
      // Rotate the model around the Y-axis (vertical axis) continuously
      // state.clock.elapsedTime gives us the time since the scene started
      // Multiplying by 0.5 makes the rotation slower (half speed)
      // rotation.y controls rotation around the vertical axis (left-right rotation)
      modelRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    // Center component automatically centers the 3D model at the origin (0,0,0)
    <Center>
      {/* primitive allows us to use any Three.js object directly in React Three Fiber */}
      <primitive
        ref={modelRef} // Reference for direct manipulation
        object={scene} // The 3D model scene to render
        scale={[2, 2, 2]} // Makes model 2x larger in all directions [X, Y, Z]
        position={[0, 0, 0]} // Position in 3D space [X, Y, Z] - currently at origin
      />
    </Center>
  );
}

// Loading Component for Three.js - Shows a simple shape while the model loads
function LoadingFallback() {
  return (
    // mesh is the basic building block of 3D objects (combines geometry + material)
    <mesh>
      {/* boxGeometry creates a cube shape with width, height, depth of 1 unit each */}
      {/* args={[1, 1, 1]} sets dimensions [width, height, depth] */}
      <boxGeometry args={[1, 1, 1]} />

      {/* meshStandardMaterial creates a realistic material that responds to lighting */}
      {/* color="lightblue" sets the base color of the material */}
      {/* wireframe={true} shows only the edges/lines of the geometry, not filled faces */}
      <meshStandardMaterial color="lightblue" wireframe />
    </mesh>
  );
}

// Main GLB Test Component
const GLBTestComponent: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Perspective Container for 3D Effects */}
      <div className="relative min-h-screen" style={{ perspective: '1000px' }}>
        <div className="container relative mx-auto px-4 py-12 lg:px-8 lg:py-20">
          {/* Futuristic Header */}
          <div className="mb-12 text-center lg:mb-20">
            <div className="mb-6 inline-flex lg:mb-8">
              <span className="relative overflow-hidden rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-6 py-2 backdrop-blur-xl dark:border-cyan-500/30 dark:from-cyan-500/10 dark:to-blue-500/10 lg:px-8 lg:py-3">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-cyan-500/20 dark:to-blue-500/20"></div>
                <div className="relative flex items-center space-x-2 lg:space-x-3">
                  <svg
                    className="h-4 w-4 text-blue-600 dark:text-cyan-400 lg:h-5 lg:w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2L3 7v11h14V7l-7-5zM8 16v-4h4v4H8z" />
                  </svg>
                  <span className="text-xs font-semibold text-blue-700 dark:text-cyan-300 lg:text-sm">
                    INTERACTIVE 3D EXPERIENCE
                  </span>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-500 dark:bg-green-400"></div>
                </div>
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl lg:mb-6 lg:text-8xl">
              <span className="block bg-gradient-to-r from-gray-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent dark:from-white dark:via-cyan-200 dark:to-blue-200">
                3D MODEL
              </span>
              <span className="block animate-pulse bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400">
                PLAYGROUND
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-blue-700/80 dark:text-cyan-200/80 lg:text-xl">
              Interactive GLB model loaded with Three.js. Explore, rotate, and interact with 3D content.
            </p>
          </div>

          {/* 3D Canvas Container */}
          <div className="relative mx-auto h-96 w-full max-w-4xl overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-xl dark:border-cyan-500/20 dark:from-white/5 dark:to-cyan-900/60 lg:h-[500px]">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-2 text-sm font-medium text-blue-600 dark:text-cyan-300">Loading 3D Model...</div>
                  <div className="h-1 w-32 overflow-hidden rounded-full bg-blue-200 dark:bg-cyan-800">
                    <div className="h-full w-full animate-pulse bg-blue-500 dark:bg-cyan-400"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Three.js Canvas - The main container for all 3D content */}
            <Canvas
              // Camera configuration - defines how we view the 3D scene
              camera={{
                position: [0, 0, 5], // Camera position in 3D space [X, Y, Z] - 5 units back from origin
                fov: 45, // Field of View in degrees (45° is natural, like human vision)
                near: 0.1, // Nearest distance the camera can see (objects closer are clipped)
                far: 1000, // Farthest distance the camera can see (objects farther are clipped)
              }}
              style={{
                background: 'transparent', // Makes canvas background transparent (inherits parent's background)
              }}
              // onCreated fires when the Three.js scene is fully initialized
              onCreated={() => {
                // Simulate loading time, then hide loading indicator after 1 second
                setTimeout(() => setIsLoading(false), 1000);
              }}
            >
              {/* Lighting Setup - Multiple light sources for realistic illumination */}

              {/* Ambient Light - Provides soft, even lighting from all directions */}
              {/* intensity={0.5} makes it dimmer (0 = no light, 1 = full brightness) */}
              {/* This prevents completely dark shadows and adds overall brightness */}
              <ambientLight intensity={0.5} />

              {/* Directional Light - Acts like sunlight, parallel rays from one direction */}
              <directionalLight
                position={[5, 5, 5]} // Light comes from top-right-front position [X, Y, Z]
                intensity={1} // Full brightness (main light source)
                castShadow // Enables this light to create shadows
                shadow-mapSize-width={2048} // Shadow quality (higher = sharper shadows, more GPU intensive)
                shadow-mapSize-height={2048} // Shadow quality (2048x2048 is high quality)
              />

              {/* Point Light - Radiates light in all directions from a single point (like a light bulb) */}
              {/* position={[-5, 5, 5]} places it top-left-front for additional fill lighting */}
              {/* intensity={0.5} makes it dimmer to provide subtle fill light */}
              <pointLight position={[-5, 5, 5]} intensity={0.5} />

              {/* Environment - Provides realistic environmental lighting and reflections */}
              {/* preset="city" loads a pre-made HDR environment image of a city skyline */}
              {/* This creates realistic reflections on metallic/glass surfaces */}
              <Environment preset="city" />

              {/* Model with Suspense - Handles loading states gracefully */}
              {/* Suspense shows fallback content while the 3D model loads asynchronously */}
              {/* fallback={<LoadingFallback />} displays our wireframe cube while waiting */}
              <Suspense fallback={<LoadingFallback />}>
                <GLBModel />
              </Suspense>

              {/* Orbit Controls - Enables mouse/touch interaction with the 3D scene */}
              <OrbitControls
                enablePan={true} // Allows right-click and drag to move camera around
                enableZoom={true} // Allows mouse wheel to zoom in/out
                enableRotate={true} // Allows left-click and drag to rotate around model
                minDistance={2} // Closest the camera can get to the target (prevents going inside model)
                maxDistance={10} // Farthest the camera can move away from target
                minPolarAngle={0} // Minimum vertical rotation (0 = can look straight down)
                maxPolarAngle={Math.PI} // Maximum vertical rotation (Math.PI = can look straight up)
              />
            </Canvas>

            {/* Control Instructions */}
            <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-sm">
              <div className="mb-1 font-medium">Controls:</div>
              <div>• Drag to rotate</div>
              <div>• Scroll to zoom</div>
              <div>• Right-click to pan</div>
            </div>

            {/* Model Info */}
            <div className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-3 py-2 text-xs text-white backdrop-blur-sm">
              <div className="mb-1 font-medium">Model Info:</div>
              <div>• File: lightModel.glb</div>
              <div>• Auto-rotating</div>
              <div>• Interactive controls</div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-white/60 to-blue-50/40 p-4 backdrop-blur-xl dark:border-cyan-500/20 dark:from-white/5 dark:to-cyan-900/20">
              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">Auto Rotation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Model automatically rotates for better viewing</p>
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-white/60 to-blue-50/40 p-4 backdrop-blur-xl dark:border-cyan-500/20 dark:from-white/5 dark:to-cyan-900/20">
              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">Interactive Controls</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Full orbit controls with zoom and pan capabilities
              </p>
            </div>

            <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-white/60 to-blue-50/40 p-4 backdrop-blur-xl dark:border-cyan-500/20 dark:from-white/5 dark:to-cyan-900/20">
              <h4 className="mb-2 font-semibold text-gray-800 dark:text-white">Responsive Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">Adapts to different screen sizes and devices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Preload the GLB file for better performance
useGLTF.preload('/lightModel.glb');

export default GLBTestComponent;
