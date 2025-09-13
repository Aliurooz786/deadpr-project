import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getRecentClients, getRecentBookings, createTrainer, getAllTrainers, createPackage } from '../../services/api';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BookCopy, Dumbbell, Loader2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    
    const [stats, setStats] = useState({ totalClients: 0, totalTrainers: 0, totalBookings: 0 });
    const [recentClients, setRecentClients] = useState([]);
    const [recentBookings, setRecentBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allTrainers, setAllTrainers] = useState([]);

    // Create Trainer State
    const [isCreatingTrainer, setIsCreatingTrainer] = useState(false);
    const [isTrainerDialogOpen, setIsTrainerDialogOpen] = useState(false);
    const [trainerForm, setTrainerForm] = useState({ name: '', email: '', password: '', phoneNumber: '', description: '', specializations: '' });

    // Create Package State
    const [isCreatingPackage, setIsCreatingPackage] = useState(false);
    const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
    // Yahan badlaav kiya gaya hai
    const [packageForm, setPackageForm] = useState({ description: '', price: '', trainerId: '' });


    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const [statsRes, clientsRes, bookingsRes, trainersRes] = await Promise.all([
                getDashboardStats(), getRecentClients(), getRecentBookings(), getAllTrainers()
            ]);
            setStats(statsRes.data);
            setRecentClients(clientsRes.data);
            setRecentBookings(bookingsRes.data);
            setAllTrainers(trainersRes.data);
        } catch (error) {
            console.error("Failed to fetch admin dashboard data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleTrainerFormChange = (e) => setTrainerForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    // Naye handlers
    const handlePackageFormChange = (e) => setPackageForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
    const handleTrainerSelect = (trainerId) => setPackageForm(prev => ({ ...prev, trainerId }));
    
    const handleCreateTrainer = async (e) => {
        e.preventDefault();
        setIsCreatingTrainer(true);
        try {
            const specializationsArray = trainerForm.specializations.split(',').map(s => s.trim()).filter(s => s);
            const trainerData = { ...trainerForm, specializations: specializationsArray };
            await createTrainer(trainerData);
            alert('Trainer created successfully!');
            setIsTrainerDialogOpen(false);
            setTrainerForm({ name: '', email: '', password: '', phoneNumber: '', description: '', specializations: '' });
            fetchDashboardData();
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create trainer.');
        } finally {
            setIsCreatingTrainer(false);
        }
    };
    
    const handleCreatePackage = async (e) => {
        e.preventDefault();
        if (!packageForm.trainerId) {
            alert("Please select a trainer.");
            return;
        }
        setIsCreatingPackage(true);
        try {
    
            const packageData = {
                ...packageForm,
                name: "1 Month Powerlifting Basics",
                durationInDays: 30,
            };
            await createPackage(packageData);
            alert('Package created successfully!');
            setIsPackageDialogOpen(false);
            setPackageForm({ description: '', price: '', trainerId: '' }); 
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to create package.');
        } finally {
            setIsCreatingPackage(false);
        }
    };


    if (loading) {
        return (
            <div className="container mx-auto py-10">
                <Skeleton className="h-8 w-1/4 mb-8" />
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                    <Skeleton className="h-28 w-full" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <div className="flex items-center gap-4">
                    {/* Create Trainer Dialog */}
                     <Dialog open={isTrainerDialogOpen} onOpenChange={setIsTrainerDialogOpen}>
                        <DialogTrigger asChild><Button>Create Trainer</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleCreateTrainer}>
                                <DialogHeader><DialogTitle>Create New Trainer</DialogTitle></DialogHeader>
                                <div className="grid gap-2 py-4">
                                    <Input id="name" placeholder="Name" value={trainerForm.name} onChange={handleTrainerFormChange} required />
                                    <Input id="email" type="email" placeholder="Email" value={trainerForm.email} onChange={handleTrainerFormChange} required />
                                    <Input id="password" type="password" placeholder="Password" value={trainerForm.password} onChange={handleTrainerFormChange} required />
                                    <Input id="phoneNumber" placeholder="Phone Number" value={trainerForm.phoneNumber} onChange={handleTrainerFormChange} required />
                                    <Textarea id="description" placeholder="Description" value={trainerForm.description} onChange={handleTrainerFormChange} required />
                                    <Input id="specializations" placeholder="Specializations (e.g., Yoga, Powerlifting)" value={trainerForm.specializations} onChange={handleTrainerFormChange} />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isCreatingTrainer}>
                                        {isCreatingTrainer && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    {/* Create Package Dialog (Partially hardcoded) */}
                    <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
                        <DialogTrigger asChild><Button variant="outline">Create Package</Button></DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleCreatePackage}>
                                <DialogHeader><DialogTitle>Create New Package</DialogTitle></DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className='text-sm p-3 bg-slate-50 rounded-md border'>
                                        <p><strong>Package Name:</strong> 1 Month Powerlifting Basics</p>
                                        <p><strong>Duration:</strong> 30 days</p>
                                    </div>
                                    <Textarea id="description" placeholder="Description" value={packageForm.description} onChange={handlePackageFormChange} required />
                                    <Input id="price" type="number" placeholder="Price" value={packageForm.price} onChange={handlePackageFormChange} required />
                                    <Select onValueChange={handleTrainerSelect} required>
                                        <SelectTrigger><SelectValue placeholder="Select a trainer" /></SelectTrigger>
                                        <SelectContent>
                                            {allTrainers.map(trainer => (
                                                <SelectItem key={trainer.id} value={trainer.id}>{trainer.user.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <DialogFooter>
                                    <Button type="submit" disabled={isCreatingPackage}>
                                        {isCreatingPackage && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleLogout} variant="destructive">Logout</Button>
                </div>
            </div>
            
            {/* Stats Cards & Tables */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Clients</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.totalClients}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Trainers</CardTitle><Dumbbell className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.totalTrainers}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Bookings</CardTitle><BookCopy className="h-4 w-4 text-muted-foreground" /></CardHeader>
                    <CardContent><div className="text-2xl font-bold">{stats.totalBookings}</div></CardContent>
                </Card>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <h2 className="text-2xl font-bold mb-4">Recent Clients</h2>
                    <Card>
                        <Table>
                            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {recentClients.map(client => (
                                    <TableRow key={client.id}><TableCell>{client.name}</TableCell><TableCell>{client.email}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
                    <Card>
                        <Table>
                            <TableHeader><TableRow><TableHead>Client</TableHead><TableHead>Trainer</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {recentBookings.map(booking => (
                                    <TableRow key={booking.id}><TableCell>{booking.client?.name}</TableCell><TableCell>{booking.trainer?.user?.name}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

