import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTrainerById, getPackagesByTrainerId, bookPackage } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal, Loader2, Star } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from 'sonner';

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
            toast.warning("Login Required", { description: "Please login to book a package." });
            navigate('/login');
            return;
        }
        if (user.role !== 'ROLE_CLIENT') {
            toast.error("Action Not Allowed", { description: "Only clients can book packages." });
            return;
        }
        setSelectedPackage(pkg);
    };

    const handleConfirmBooking = async () => {
        if (!selectedPackage) return;
        setIsBooking(true);
        try {
            await bookPackage(selectedPackage.id);
            toast.success("Booking Successful!", { description: "You can view your booking in the dashboard." });
            navigate('/dashboard');
        } catch (err) {
            toast.error("Booking Failed", { description: err.response?.data?.message || "Please try again." });
        } finally {
            setIsBooking(false);
            setSelectedPackage(null);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <Skeleton className="w-full h-80 rounded-lg" />
                    </div>
                    <div className="md:col-span-2">
                        <Skeleton className="h-12 w-3/4 mb-4" />
                        <Skeleton className="h-6 w-full mb-2" />
                        <Skeleton className="h-6 w-full mb-4" />
                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <p className="text-center text-red-500 p-10">{error}</p>;

    return (
        <>
            <div className="bg-white">
                <div className="container mx-auto py-12 md:py-20 px-4">
                    {/* Profile Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                        <div className="md:col-span-1">
                            <img 
                                src={trainer?.profileImageUrl || `https://placehold.co/400x500/1e293b/ffffff?text=${trainer?.user?.name?.[0]}`}
                                alt={trainer?.user?.name}
                                className="w-full h-auto object-cover rounded-xl shadow-lg"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">{trainer?.user?.name}</h1>
                            <div className="flex items-center gap-2 mt-2 text-yellow-500">
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <Star fill="currentColor" size={20} />
                                <span className="text-slate-600 font-medium ml-2">(15 Reviews)</span>
                            </div>
                            <p className="text-lg text-slate-600 mt-4 max-w-2xl">{trainer?.description}</p>
                            <div className="mt-6">
                                <h3 className="font-semibold text-slate-800 mb-2">Specializations</h3>
                                <div className="flex flex-wrap gap-2">
                                    {trainer?.specializations?.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-50">
                <div className="container mx-auto py-12 md:py-20 px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">Available Packages</h2>
                    {packages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {packages.map(pkg => (
                                <Card key={pkg.id} className="flex flex-col bg-white hover:shadow-xl transition-shadow duration-300">
                                    <CardHeader>
                                        <CardTitle>{pkg.name}</CardTitle>
                                        <CardDescription>Duration: {pkg.durationInDays} days</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-slate-700">{pkg.description}</p>
                                        <p className="text-3xl font-bold text-slate-900 mt-4">₹{pkg.price}</p>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => handleBookNowClick(pkg)}>Book Now</Button>
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

            {/* Confirmation Dialog */}
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

