import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from './ui/card';

function QuoteCard() {
    return (
        <Card className={`col-span-6 row-span-2 p-8 border-none basecard`}>
          <CardContent>
            <div className="text-4xl font-serif leading-tight flex items-center justify-between">
              <h1>Never Stop Exploring </h1>
            </div>
            
          </CardContent>
        </Card>
      );
}

export default QuoteCard