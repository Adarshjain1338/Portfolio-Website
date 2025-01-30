import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from './ui/card';

function QuoteCard() {
    return (
        <Card className="w-full max-w-md">
          <CardContent>
            <div className="flex justify-center mb-4 text-5xl ">
              <h1>Never Stop Exploring </h1>
            </div>
            
          </CardContent>
        </Card>
      );
}

export default QuoteCard