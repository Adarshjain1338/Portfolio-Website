import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import "../../global.scss"

const ContactPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data); // Handle form submission (e.g., send data to backend)
    };

    return (
        <div className=''>
            <Card className="max-w-md mx-auto p-6  shadow-lg rounded-lg mt-6 basecard_color_primary p-2 text-white">
                <h3 className="text-2xl font-playfair mb-6 text-center">Contact Me</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium " htmlFor="name">
                            Name
                        </label>
                        <Input
                            id="name"
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium " htmlFor="email">
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            {...register('email', { required: 'Email is required' })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium " htmlFor="message">
                            Message
                        </label>
                        <Textarea
                            id="message"
                            rows={4}
                            {...register('message', { required: 'Message is required' })}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">{String(errors.message.message)}</p>
                        )}
                    </div>
                    <Button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                        Send
                    </Button>
                </form>
            </Card>

        </div>
    );
};

export default ContactPage;