'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { paddleLoader } from '@/lib/paddle-loader';
import { PaddleCheckoutOptions } from '@/types/paddle';

interface SubscribeButtonProps {
  priceId: string;
  planName: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  priceId,
  planName,
  variant = 'primary',
  size = 'md',
  className = '',
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaddleReady, setIsPaddleReady] = useState(false);

  // Initialize Paddle on component mount
  useEffect(() => {
    const initializePaddle = async () => {
      try {
        const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
        const environment = process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox';

        if (!clientToken || clientToken.includes('your_paddle')) {
          console.warn('Paddle client token not configured');
          return;
        }

        await paddleLoader.initialize({
          token: clientToken,
          environment: environment as 'sandbox' | 'production',
          debug: environment === 'sandbox'
        });

        setIsPaddleReady(true);
      } catch (error) {
        console.error('Failed to initialize Paddle:', error);
      }
    };

    initializePaddle();
  }, []);

  const handleSubscribe = async () => {
    if (!isPaddleReady) {
      alert('Payment system is not ready. Please refresh the page and try again.');
      return;
    }

    if (!priceId || priceId.includes('your_paddle')) {
      alert('Please configure your Paddle price IDs in the environment variables.');
      return;
    }

    setIsLoading(true);

    try {
      const checkoutOptions: PaddleCheckoutOptions = {
        items: [
          {
            priceId: priceId,
            quantity: 1
          }
        ],
        settings: {
          displayMode: 'overlay',
          allowLogout: true
        }
      };

      await paddleLoader.openCheckout(checkoutOptions);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to open checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleSubscribe}
      disabled={isLoading || !isPaddleReady}
    >
      {isLoading ? 'Loading...' : !isPaddleReady ? 'Unavailable' : children}
    </Button>
  );
};
