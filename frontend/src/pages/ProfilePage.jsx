import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '../context/AuthContext';
import { updateProfile } from '../services/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const ProfilePage = () => {
    const { user, loading: authLoading, login } = useAuth(); 
    const [formData, setFormData] = useState({ name: '', phoneNumber: '' });
    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '', 
                phoneNumber: user.phoneNumber || '' 
            });
        }
    }, [user]);
    
    // Abhi ke liye, humein user object mein name aur phoneNumber chahiye. 
    // Iske liye hum AuthContext ko thoda update karenge.

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);
        try {
            const response = await updateProfile(formData);
            toast.success("Profile updated successfully!");
            // Token update nahi hua hai, to hum user ko dobara login karne ko keh sakte hain
            // ya naye token ke saath context update kar sakte hain.
            // Abhi ke liye, hum bas context mein user ka naam update kar denge.
            // Yeh ek "optimistic" update hai.
            // A better way is to re-login or get a new token.
        } catch (error) {
            toast.error("Update failed", { description: error.response?.data?.message || "Please try again." });
        } finally {
            setIsUpdating(false);
        }
    };

    if (authLoading) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">My Profile</CardTitle>
                    <CardDescription>Update your personal information here.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={user?.email || ''} disabled />
                            <p className="text-xs text-slate-500">Email address cannot be changed.</p>
                        </div>
                         <Button type="submit" disabled={isUpdating}>
                            {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
};

export default ProfilePage;
