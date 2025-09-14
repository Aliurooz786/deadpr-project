import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample data for the blog posts
const blogPosts = [
    {
        id: 1,
        title: "The Top 5 Myths About Powerlifting Debunked",
        category: "Fitness",
        excerpt: "Think powerlifting is just for bodybuilders? Think again. We break down the most common misconceptions...",
        imageUrl: "https://placehold.co/600x400/1e293b/ffffff?text=Powerlifting"
    },
    {
        id: 2,
        title: "Nutrition 101: What to Eat Before and After Your Workout",
        category: "Nutrition",
        excerpt: "Fueling your body correctly is key to performance. Learn the science behind pre and post-workout meals...",
        imageUrl: "https://placehold.co/600x400/ef4444/ffffff?text=Nutrition"
    },
    {
        id: 3,
        title: "Mind Over Matter: The Mental Benefits of Regular Exercise",
        category: "Wellness",
        excerpt: "It's not just about physical strength. Discover how fitness can boost your mental health and resilience...",
        imageUrl: "https://placehold.co/600x400/10b981/ffffff?text=Wellness"
    }
];

const BlogPage = () => {
    return (
        <div className="bg-slate-50">
            <div className="container mx-auto py-16 px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Our Fitness Blog</h1>
                    <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
                        Expert advice, tips, and stories to fuel your fitness journey.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img src={post.imageUrl} alt={post.title} className="h-56 w-full object-cover"/>
                            <CardHeader>
                                <Badge variant="destructive" className="w-fit mb-2">{post.category}</Badge>
                                <CardTitle className="text-xl">{post.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-slate-600">{post.excerpt}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild variant="outline">
                                    <Link to="#">Read More</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
