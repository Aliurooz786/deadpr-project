import React, { useState, useEffect } from 'react';
import { getAllTrainers } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

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
        <div className="bg-slate-50">
            <div className="container mx-auto py-16 px-4">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Meet Our Professionals</h1>
                    <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
                        Find the perfect certified trainer to guide you on your fitness journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {loading ? (
                        // Loading state ke liye naye, behtar Skeleton cards
                        Array.from({ length: 4 }).map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                                <Skeleton className="h-56 w-full" />
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2 mt-2" />
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-2">
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                        <Skeleton className="h-6 w-20 rounded-full" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        // Data aane ke baad asli cards
                        trainers.map((trainer) => (
                            <Link to={`/trainer/${trainer.id}`} key={trainer.id} className="block group">
                                <Card className="overflow-hidden h-full transform transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                                    <div className="aspect-[4/5] overflow-hidden">
                                        <img 
                                            src={trainer.profileImageUrl || `https://placehold.co/400x500/e2e8f0/1e293b?text=${trainer.user?.name}`}
                                            alt={trainer.user?.name}
                                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-xl">{trainer.user?.name ?? 'Trainer'}</CardTitle>
                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                            <Star fill="currentColor" className="text-yellow-400" size={14} />
                                            <span>5.0 (15 reviews)</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {trainer.specializations?.slice(0, 2).map(spec => (
                                                <Badge key={spec} variant="secondary">{spec}</Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrainersPage;

