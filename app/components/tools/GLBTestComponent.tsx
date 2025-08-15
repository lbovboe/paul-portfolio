'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import * as THREE from 'three';

// GLB Model Component
function GLBModel() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/lightModel.glb');

  // Auto-rotate the model
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

// Loading Component for Three.js
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
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

            {/* Three.js Canvas */}
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
                setTimeout(() => setIsLoading(false), 1000);
              }}
            >
              {/* Lighting */}
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 5, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <pointLight position={[-5, 5, 5]} intensity={0.5} />

              {/* Environment for better reflections */}
              <Environment preset="city" />

              {/* Model with Suspense */}
              <Suspense fallback={<LoadingFallback />}>
                <GLBModel />
              </Suspense>

              {/* Controls */}
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={10}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
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
