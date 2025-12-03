'use client';

import { paddleConfig, isPaddleConfigured } from '@/config/paddle';

let paddleInstance: any = null;
let isPaddleLoading = false;
let paddleLoadPromise: Promise<any> | null = null;

export const loadPaddle = async (): Promise<any> => {
  // Return existing instance if already loaded
  if (paddleInstance) {
    return paddleInstance;
  }

  // Return existing promise if currently loading
  if (paddleLoadPromise) {
    return paddleLoadPromise;
  }

  // Check if Paddle is configured
  if (!isPaddleConfigured()) {
    throw new Error('Paddle is not configured. Please check your environment variables.');
  }

  // Create loading promise
  paddleLoadPromise = new Promise((resolve, reject) => {
    if (isPaddleLoading) {
      // Wait for existing load to complete
      const checkInterval = setInterval(() => {
        if (paddleInstance) {
          clearInterval(checkInterval);
          resolve(paddleInstance);
        } else if (!isPaddleLoading) {
          clearInterval(checkInterval);
          reject(new Error('Paddle loading failed'));
        }
      }, 100);
      return;
    }

    isPaddleLoading = true;

    // Load Paddle script
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
    script.async = true;
    
    script.onload = () => {
      try {
        // Initialize Paddle
        if (typeof window !== 'undefined' && window.Paddle) {
          window.Paddle.Initialize({
            token: paddleConfig.clientToken,
            environment: paddleConfig.environment as 'sandbox' | 'production'
          });
          
          paddleInstance = window.Paddle;
          isPaddleLoading = false;
          resolve(paddleInstance);
        } else {
          isPaddleLoading = false;
          reject(new Error('Paddle failed to load'));
        }
      } catch (error) {
        isPaddleLoading = false;
        reject(error);
      }
    };

    script.onerror = () => {
      isPaddleLoading = false;
      reject(new Error('Failed to load Paddle script'));
    };

    document.head.appendChild(script);
  });

  return paddleLoadPromise;
};

export const getPaddleInstance = async (): Promise<any> => {
  if (!paddleInstance) {
    return await loadPaddle();
  }
  return paddleInstance;
};

export const openPaddleCheckout = async (priceId: string, customerEmail?: string) => {
  try {
    const paddle = await getPaddleInstance();
    
    const checkoutItems = [
      {
        priceId: priceId,
        quantity: 1
      }
    ];

    const checkoutOptions: any = {
      items: checkoutItems
    };

    // Add customer email if provided
    if (customerEmail) {
      checkoutOptions.customer = {
        email: customerEmail
      };
    }

    paddle.Checkout.open(checkoutOptions);
  } catch (error) {
    console.error('Error opening Paddle checkout:', error);
    throw error;
  }
};

// Type declarations for Paddle
declare global {
  interface Window {
    Paddle: any;
  }
}
