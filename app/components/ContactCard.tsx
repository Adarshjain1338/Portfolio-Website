import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from './ui/button';
import { Select } from './ui/select';

const ContactCard = () => {
  return (
    <Card className={`col-span-3 row-span-1 basecard p-6 text-white border-none`}>
      <CardHeader>
        <CardTitle>Contact Me</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            {/* <Mail className="h-6 w-6" /> */}
            <span>example@email.com</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* <Phone className="h-6 w-6" /> */}
            <span>+1 (555) 555-5555</span>
          </div>
          <Button variant="outline">Get in Touch</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;