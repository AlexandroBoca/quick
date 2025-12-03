export const paddleConfig = {
  environment: process.env.NEXT_PUBLIC_PADDLE_ENV || 'sandbox',
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  apiKey: process.env.PADDLE_API_KEY || '',
  
  // Pricing plans mapped to Paddle price IDs
  priceIds: {
    starter: process.env.PADDLE_STARTER_PRICE_ID || 'pri_01h8x8x8x8x8x8x8x8x8x8x8x',
    professional: process.env.PADDLE_PROFESSIONAL_PRICE_ID || 'pri_01h8x9x9x9x9x9x9x9x9x9x9x',
    enterprise: process.env.PADDLE_ENTERPRISE_PRICE_ID || 'pri_01h8xaxaxaxaxaxaxaxaxaxaxa'
  }
};

export const isPaddleConfigured = () => {
  return !!(
    paddleConfig.clientToken && 
    paddleConfig.environment
  );
};
