import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainerById, getPackagesByTrainerId, bookPackage } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Loader2 } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const TrainerDetailPage = () => {
    const { trainerId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [trainer, setTrainer] = useState(null);
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    const [selectedPackage, setSelectedPackage] = useState(null); 
    const [isBooking, setIsBooking] = useState(false); 

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const [trainerResponse, packagesResponse] = await Promise.all([
                    getTrainerById(trainerId),
                    getPackagesByTrainerId(trainerId)
                ]);
                setTrainer(trainerResponse.data);
                setPackages(packagesResponse.data);
            } catch (err) {
                setError('Failed to fetch trainer details. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [trainerId]);
    
   
    const handleBookNowClick = (pkg) => {
        if (!user) {
            alert("Please login to book a package.");
            navigate('/login');
            return;
        }
        if (user.role !== 'ROLE_CLIENT') {
            alert("Only clients can book packages.");
            return;
        }
        setSelectedPackage(pkg);
    };

    
    const handleConfirmBooking = async () => {
        if (!selectedPackage) return;

        setIsBooking(true);
        try {
            await bookPackage(selectedPackage.id);
            alert("Booking successful! You can view your booking in the dashboard.");
            navigate('/dashboard');
        } catch (err) {
            alert(err.response?.data?.message || "Booking failed. Please try again.");
        } finally {
            setIsBooking(false);
            setSelectedPackage(null); 
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <Skeleton className="h-12 w-1/2 mb-4" />
                <Skeleton className="h-6 w-3/4 mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-20 w-full" /></CardContent></Card>
                    <Card><CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader><CardContent><Skeleton className="h-20 w-full" /></CardContent></Card>
                </div>
            </div>
        );
    }

    if (error) return <p className="text-center text-red-500 p-10">{error}</p>;

    return (
        <>
            <div className="container mx-auto py-10 px-4">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{trainer?.user?.name}</h1>
                    <p className="text-lg text-gray-600 mt-2 max-w-3xl">{trainer?.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {trainer?.specializations?.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                    </div>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-6">Available Packages</h2>
                    {packages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map(pkg => (
                                <Card key={pkg.id} className="flex flex-col hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle>{pkg.name}</CardTitle>
                                        <CardDescription>Duration: {pkg.durationInDays} days</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-gray-700">{pkg.description}</p>
                                        <p className="text-3xl font-bold mt-4">₹{pkg.price}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" onClick={() => handleBookNowClick(pkg)}>Book Now</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Alert>
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>No Packages Found</AlertTitle>
                            <AlertDescription>
                                This trainer has not added any packages yet. Please check back later.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>

            <Dialog open={!!selectedPackage} onOpenChange={() => setSelectedPackage(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirm Booking</DialogTitle>
                        <DialogDescription>
                            You are about to book the following package. Please confirm.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p><strong>Package:</strong> {selectedPackage?.name}</p>
                        <p><strong>Price:</strong> ₹{selectedPackage?.price}</p>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setSelectedPackage(null)}>Cancel</Button>
                        <Button onClick={handleConfirmBooking} disabled={isBooking}>
                            {isBooking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isBooking ? 'Booking...' : 'Confirm & Book'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default TrainerDetailPage;

