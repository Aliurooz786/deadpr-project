import React, { useState, useEffect } from 'react';
import { getAllTrainers } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom'; 

const TrainersPage = () => {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                const response = await getAllTrainers();
                setTrainers(response.data);
            } catch (err) {
                setError('Failed to fetch trainers. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    if (error) return <p className="text-center text-red-500 p-10">{error}</p>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Our Trainers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loading ? (
                   
                    Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-1/2" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
               
                    trainers.map((trainer) => (
                        <Link to={`/trainer/${trainer.id}`} key={trainer.id} className="block hover:shadow-lg transition-shadow duration-300 rounded-lg">
                            <Card className="h-full">
                                <CardHeader>
                                    <CardTitle>{trainer.user?.name ?? 'Trainer'}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600">{trainer.description}</p>
                                    <div className="mt-4">
                                        <h4 className="font-semibold">Specializations:</h4>
                                        <p className="text-sm text-gray-500">{trainer.specializations?.join(', ')}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default TrainersPage;

