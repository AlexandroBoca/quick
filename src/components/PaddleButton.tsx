'use client';

import { Button } from '@/components/Button';
import { useState } from 'react';
import { openPaddleCheckout } from '@/lib/paddle';
import { paddleConfig } from '@/config/paddle';

interface PaddleButtonProps {
  priceId: string;
  planName: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const PaddleButton: React.FC<PaddleButtonProps> = ({
  priceId,
  planName,
  variant = 'primary',
  size = 'md',
  className = '',
  children
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!priceId || priceId.includes('your_paddle')) {
      alert('Please configure your Paddle price IDs in the .env.local file');
      return;
    }

    setIsLoading(true);
    
    try {
      await openPaddleCheckout(priceId);
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
      onClick={handleCheckout}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </Button>
  );
};
