import React, { useState, useEffect } from 'react';
import { getMyClients, uploadPlan } from '../../services/api'; // uploadPlan ko import karein
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
// Modal ke liye naye imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from 'lucide-react';

const TrainerDashboard = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Modal ke liye naye state variables
    const [isUploading, setIsUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    
    const fetchClients = async () => {
        try {
            const response = await getMyClients();
            setClients(response.data);
        } catch (err) {
            setError('Failed to fetch your clients. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Plan upload ka asli logic
    const handleUpload = async () => {
        if (!selectedFile || !selectedBookingId) {
            alert("Please select a file.");
            return;
        }
        setIsUploading(true);
        try {
            await uploadPlan(selectedBookingId, selectedFile);
            alert("Plan uploaded successfully!");
            setSelectedBookingId(null); // Modal band karein
            setSelectedFile(null);
            fetchClients(); // List ko refresh karein
        } catch (err) {
            alert("Upload failed. Please try again.");
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };
    
    // ... (loading aur error states waise hi rahenge)

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Clients</h1>
                <Button onClick={handleLogout} variant="destructive">Logout</Button>
            </div>
            
            <Dialog onOpenChange={(isOpen) => { if (!isOpen) setSelectedBookingId(null); }}>
                <div className="border rounded-lg">
                    <Table>
                        <TableCaption>A list of your current clients.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Client Name</TableHead>
                                <TableHead>Package</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Booking Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.length > 0 ? (
                                clients.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell className="font-medium">{booking?.client?.name ?? 'N/A'}</TableCell>
                                        <TableCell>{booking?.trainingPackage?.name ?? 'N/A'}</TableCell>
                                        <TableCell>
                                            <Badge variant={booking.status === 'ACTIVE' ? 'default' : 'destructive'}>
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{booking.bookingDate ? new Date(booking.bookingDate).toLocaleDateString() : 'N/A'}</TableCell>
                                        <TableCell className="text-right">
                                            {booking.planDocumentUrl ? (
                                                <Button variant="secondary" asChild><a href={booking.planDocumentUrl} target="_blank" rel="noopener noreferrer">View Plan</a></Button>
                                            ) : (
                                                <DialogTrigger asChild>
                                                    <Button variant="outline" onClick={() => setSelectedBookingId(booking.id)}>Upload Plan</Button>
                                                </DialogTrigger>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="5" className="text-center">You have no clients yet.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload Plan</DialogTitle>
                        <DialogDescription>
                            Select a PDF file to upload as the training plan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="plan-file" className="text-right">
                                Plan File
                            </Label>
                            <Input id="plan-file" type="file" className="col-span-3" onChange={(e) => setSelectedFile(e.target.files[0])} accept=".pdf" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setSelectedBookingId(null)}>Cancel</Button>
                        <Button type="submit" onClick={handleUpload} disabled={isUploading}>
                            {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Upload
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default TrainerDashboard;

