'use client';

import { PaddleInstance, PaddleCheckoutOptions, PaddleInitializeOptions } from '@/types/paddle';

class PaddleLoader {
  private instance: PaddleInstance | null = null;
  private isLoading = false;
  private loadPromise: Promise<PaddleInstance> | null = null;

  /**
   * Load and initialize Paddle.js
   */
  async load(): Promise<PaddleInstance> {
    // Return existing instance if already loaded
    if (this.instance) {
      return this.instance;
    }

    // Return existing promise if currently loading
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Create loading promise
    this.loadPromise = new Promise<PaddleInstance>((resolve, reject) => {
      if (this.isLoading) {
        // Wait for existing load to complete
        const checkInterval = setInterval(() => {
          if (this.instance) {
            clearInterval(checkInterval);
            resolve(this.instance);
          } else if (!this.isLoading) {
            clearInterval(checkInterval);
            reject(new Error('Paddle loading failed'));
          }
        }, 100);
        return;
      }

      this.isLoading = true;

      // Load Paddle script
      const script = document.createElement('script');
      script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
      script.async = true;
      
      script.onload = () => {
        try {
          if (typeof window !== 'undefined' && window.Paddle) {
            this.instance = window.Paddle;
            this.isLoading = false;
            if (this.loadPromise) {
              resolve(this.instance);
            }
          } else {
            this.isLoading = false;
            reject(new Error('Paddle failed to load'));
          }
        } catch (error) {
          this.isLoading = false;
          reject(error);
        }
      };

      script.onerror = () => {
        this.isLoading = false;
        reject(new Error('Failed to load Paddle script'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  /**
   * Initialize Paddle with configuration
   */
  async initialize(options: PaddleInitializeOptions): Promise<PaddleInstance> {
    const paddle = await this.load();
    paddle.Initialize(options);
    return paddle;
  }

  /**
   * Get Paddle instance (loads if not already loaded)
   */
  async getInstance(): Promise<PaddleInstance> {
    if (!this.instance) {
      return await this.load();
    }
    return this.instance;
  }

  /**
   * Open Paddle checkout
   */
  async openCheckout(options: PaddleCheckoutOptions): Promise<void> {
    const paddle = await this.getInstance();
    paddle.Checkout.open(options);
  }

  /**
   * Close Paddle checkout
   */
  async closeCheckout(): Promise<void> {
    const paddle = await this.getInstance();
    paddle.Checkout.close();
  }

  /**
   * Check if Paddle is loaded and initialized
   */
  isLoaded(): boolean {
    return this.instance !== null;
  }

  /**
   * Reset the loader (useful for testing or re-initialization)
   */
  reset(): void {
    this.instance = null;
    this.isLoading = false;
    this.loadPromise = null;
  }
}

// Export singleton instance
export const paddleLoader = new PaddleLoader();
