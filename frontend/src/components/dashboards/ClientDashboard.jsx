import React, { useState, useEffect } from 'react';
import { getMyBookings } from '../../services/api';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const fetchBookings = async () => {
        try {
            const response = await getMyBookings();
            setBookings(response.data);
        } catch (err) {
            setError('Failed to fetch your bookings. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">My Bookings</h1>
                    <Button onClick={handleLogout} variant="destructive">Logout</Button>
                </div>
                <div className="border rounded-lg p-4">
                    <Skeleton className="h-8 w-1/4 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) return <p className="text-center text-red-500 p-10">{error}</p>;

    return (
        <div className="container mx-auto py-10">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Bookings</h1>
                <Button onClick={handleLogout} variant="destructive">Logout</Button>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableCaption>A list of your recent bookings.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Package Name</TableHead>
                            <TableHead>Trainer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Expiry Date</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bookings.length > 0 ? (
                            bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">{booking?.trainingPackage?.name ?? 'Not available'}</TableCell>
                                    <TableCell>{booking?.trainer?.user?.name ?? 'Not available'}</TableCell>
                                    <TableCell>
                                        <Badge variant={booking.status === 'ACTIVE' ? 'default' : 'destructive'}>
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{booking.expiryDate ? new Date(booking.expiryDate).toLocaleDateString() : 'N/A'}</TableCell>
                                    <TableCell className="text-right">
                                        {/* YAHAN FINAL BADLAAV KIYA GAYA HAI */}
                                        {booking.planDocumentUrl ? (
                                            <Button variant="secondary" asChild>
                                                <a href={booking.planDocumentUrl} target="_blank" rel="noopener noreferrer">
                                                    View Plan
                                                </a>
                                            </Button>
                                        ) : (
                                            <Badge variant="outline">Pending</Badge>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="5" className="text-center">You have no bookings yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default ClientDashboard;

