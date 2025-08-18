'use client';

import { useEffect, useState } from 'react';

export default function DockerDownloadPage() {
  const [downloadStatus, setDownloadStatus] = useState<'downloading' | 'success' | 'error'>('downloading');

  useEffect(() => {
    const downloadFile = async () => {
      try {
        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = '/docker-compose.yml';
        link.download = 'docker-compose.yml';

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setDownloadStatus('success');
      } catch (error) {
        console.error('Download failed:', error);
        setDownloadStatus('error');
      }
    };

    // Start download immediately when component mounts
    downloadFile();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        <div className="mb-6">
          {downloadStatus === 'downloading' && (
            <div className="flex flex-col items-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
              <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Downloading...</h1>
              <p className="text-gray-600 dark:text-gray-300">
                Your docker-compose.yml file is being downloaded automatically.
              </p>
            </div>
          )}

          {downloadStatus === 'success' && (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Download Complete!</h1>
              <p className="text-gray-600 dark:text-gray-300">
                The docker-compose.yml file has been downloaded to your device.
              </p>
            </div>
          )}

          {downloadStatus === 'error' && (
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <svg
                  className="h-6 w-6 text-red-600 dark:text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">Download Failed</h1>
              <p className="mb-4 text-gray-600 dark:text-gray-300">There was an error downloading the file.</p>
              <button
                onClick={() => {
                  setDownloadStatus('downloading');
                  window.location.reload();
                }}
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        <div className="border-t pt-6 dark:border-gray-700">
          <h2 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white">What&apos;s included?</h2>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
            <p>• Sensor Backend Server (Port 3001)</p>
            <p>• Sensor Simulation Site (Port 3000)</p>
            <p>• Sensor 3D Model Frontend (Port 3002)</p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
