import { Button } from '@/components/Button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Next.js App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built with React, TypeScript, and Tailwind CSS for a modern development experience
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Fast Development</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Next.js provides the best developer experience with all the features you need for production.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">Learn More</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Beautiful UI</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Tailwind CSS gives you the power to build beautiful, responsive designs without leaving your HTML.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">Explore</Button>
            </CardFooter>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Type Safe</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                TypeScript ensures your code is maintainable and catches errors before they reach production.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Get Started</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" className="px-8">
              Start Building
            </Button>
            <Link 
              href="/billing"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 px-6 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              View Pricing
            </Link>
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>Created with Next.js, React, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}
