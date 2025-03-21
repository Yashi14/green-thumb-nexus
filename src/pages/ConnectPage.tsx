
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { 
  MessageCircle, 
  Heart, 
  Share2, 
  Send, 
  Filter, 
  Users, 
  Leaf, 
  Tag, 
  Image as ImageIcon,
  Flower,
  BookOpen
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample user data
const users = [
  {
    id: 1,
    name: "Rahul Singh",
    username: "organicfarmer",
    avatar: "/lovable-uploads/bbc793ea-4a92-4a34-801e-84d1acd983ee.png",
    bio: "Organic farmer from Punjab. Growing tulsi and ginger for over 10 years.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    username: "herbgardener",
    avatar: "/lovable-uploads/8ec10397-adcf-48f6-8da1-02c859733ac9.png",
    bio: "Herbal garden enthusiast. Expert in medicinal plants and ayurvedic remedies.",
  },
  {
    id: 3,
    name: "Aditya Patel",
    username: "plantscientist",
    avatar: "/lovable-uploads/9c862c5b-e573-438f-99db-588dba5a0e10.png",
    bio: "Plant scientist specializing in sustainable farming practices.",
  },
];

// Sample posts data
const initialPosts = [
  {
    id: 1,
    userId: 1,
    content: "Just harvested a fresh batch of organic ginger! The soil quality this season has been exceptional. Who else is experiencing a good harvest?",
    image: "/lovable-uploads/3cf4773e-538e-451b-9630-fadd3c798455.png",
    likes: 24,
    comments: 8,
    shares: 3,
    category: "harvest",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    userId: 2,
    content: "Looking for advice on growing Tulsi in a small apartment balcony. What soil mix would work best? My previous attempts weren't successful.",
    image: "",
    likes: 7,
    comments: 12,
    shares: 1,
    category: "question",
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    userId: 3,
    content: "Excited to showcase our new Aloe Vera plantation kit with enhanced water retention technology! Perfect for beginners and experienced gardeners alike.",
    image: "/lovable-uploads/42ca8551-80ce-48d2-b16b-837d5fea8fc7.png",
    likes: 42,
    comments: 5,
    shares: 15,
    category: "product",
    timestamp: "Yesterday"
  },
  {
    id: 4,
    userId: 1,
    content: "Does anyone know how to prevent root rot in turmeric plants? I've been facing this issue in my latest batch.",
    image: "/lovable-uploads/1e2afca5-211b-46bc-82a9-407ce847cb28.png",
    likes: 11,
    comments: 18,
    shares: 2,
    category: "question",
    timestamp: "1 day ago"
  },
];

const ConnectPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [activeFilter, setActiveFilter] = useState("all");
  const { register, handleSubmit, reset } = useForm();

  const findUser = (userId: number) => {
    return users.find(user => user.id === userId) || users[0];
  };

  // Create a new post
  const onSubmitPost = (data: any) => {
    const newPost = {
      id: posts.length + 1,
      userId: 2, // Assuming current user is Priya
      content: data.content,
      image: "",
      likes: 0,
      comments: 0,
      shares: 0,
      category: data.category || "general",
      timestamp: "Just now"
    };

    setPosts([newPost, ...posts]);
    reset(); // Clear the form
  };

  // Filter posts by category
  const filteredPosts = activeFilter === "all" 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-24 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar - User Info & Popular Topics */}
          <aside className="w-full md:w-1/4 space-y-6">
            <Card className="glass-dark border-plant-500/20">
              <CardHeader className="flex flex-row items-center gap-3 pb-2">
                <Avatar className="h-12 w-12 border-2 border-plant-500">
                  <AvatarImage src="/lovable-uploads/8ec10397-adcf-48f6-8da1-02c859733ac9.png" alt="Your profile" />
                  <AvatarFallback className="bg-plant-700 text-white">PS</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-medium">Priya Sharma</h2>
                  <p className="text-sm text-gray-400">@herbgardener</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-3">Herbal garden enthusiast. Expert in medicinal plants and ayurvedic remedies.</p>
                <div className="flex justify-between text-sm">
                  <span>124 Followers</span>
                  <span>86 Posts</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-dark border-plant-500/20">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <Tag className="h-5 w-5 text-plant-500" />
                  Trending Topics
                </h2>
              </CardHeader>
              <CardContent className="space-y-2">
                <Badge className="bg-plant-600 hover:bg-plant-700 px-3 py-1 mr-2 cursor-pointer">#OrganicFarming</Badge>
                <Badge className="bg-plant-600 hover:bg-plant-700 px-3 py-1 mr-2 cursor-pointer">#Ayurveda</Badge>
                <Badge className="bg-plant-600 hover:bg-plant-700 px-3 py-1 mr-2 cursor-pointer">#MedicinalHerbs</Badge>
                <Badge className="bg-plant-600 hover:bg-plant-700 px-3 py-1 mr-2 cursor-pointer">#SustainableGardening</Badge>
                <Badge className="bg-plant-600 hover:bg-plant-700 px-3 py-1 mr-2 cursor-pointer">#HomeGrown</Badge>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content - Post Form & Feed */}
          <div className="w-full md:w-2/4 space-y-6">
            {/* Post Creation Form */}
            <Card className="glass-dark border-plant-500/20">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-medium">Share with the community</h2>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmitPost)} className="space-y-4">
                  <Textarea 
                    placeholder="What's on your mind about plants and herbs?"
                    className="bg-dark-800/50 border-dark-700 min-h-[100px]"
                    {...register("content", { required: true })}
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm" className="text-gray-400 border-gray-700">
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Image
                    </Button>
                    <select 
                      className="bg-dark-800/50 border-dark-700 rounded text-sm px-2 py-1"
                      {...register("category")}
                    >
                      <option value="general">General</option>
                      <option value="question">Question</option>
                      <option value="harvest">Harvest</option>
                      <option value="product">Product</option>
                      <option value="tip">Gardening Tip</option>
                    </select>
                    <div className="ml-auto">
                      <Button type="submit" className="bg-plant-600 hover:bg-plant-700">
                        <Send className="h-4 w-4 mr-1" />
                        Post
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-medium text-white">Community Feed</h2>
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-1 text-gray-400" />
                <select 
                  className="bg-transparent text-gray-300 text-sm"
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                >
                  <option value="all" className="bg-dark-800">All Posts</option>
                  <option value="question" className="bg-dark-800">Questions</option>
                  <option value="harvest" className="bg-dark-800">Harvests</option>
                  <option value="product" className="bg-dark-800">Products</option>
                  <option value="tip" className="bg-dark-800">Tips</option>
                </select>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map(post => {
                const user = findUser(post.userId);
                return (
                  <Card key={post.id} className="glass-dark border-plant-500/20">
                    <CardHeader className="flex flex-row items-start gap-3 pb-2">
                      <Avatar className="h-10 w-10 border border-plant-500/50">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-plant-700 text-white">
                          {user.name.split(' ').map(part => part[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{user.name}</h3>
                            <p className="text-xs text-gray-400">@{user.username} · {post.timestamp}</p>
                          </div>
                          <Badge className="bg-plant-600/70">{post.category}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-200 mb-3">{post.content}</p>
                      {post.image && (
                        <div className="rounded-md overflow-hidden mt-2 mb-3">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="border-t border-gray-800 pt-3 flex justify-between">
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-plant-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-plant-500">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-plant-500">
                        <Share2 className="h-4 w-4 mr-1" />
                        {post.shares}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar - Who to Follow & Community Links */}
          <aside className="w-full md:w-1/4 space-y-6">
            <Card className="glass-dark border-plant-500/20">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <Users className="h-5 w-5 text-plant-500" />
                  Who to Follow
                </h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {users.slice(0, 2).map((user) => (
                  <div key={user.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-plant-700 text-white">
                          {user.name.split(' ').map(part => part[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-sm font-medium">{user.name}</h3>
                        <p className="text-xs text-gray-400">@{user.username}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="h-8 border-plant-500 text-plant-500 hover:bg-plant-500/10">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-dark border-plant-500/20">
              <CardHeader className="pb-2">
                <h2 className="text-lg font-medium flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-plant-500" />
                  Plant Communities
                </h2>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-plant-600 flex items-center justify-center">
                      <Flower className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Medicinal Plants</h3>
                      <p className="text-xs text-gray-400">2.4K members</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-plant-500 hover:bg-plant-500/10">
                    Join
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Ayurvedic Knowledge</h3>
                      <p className="text-xs text-gray-400">1.8K members</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-plant-500 hover:bg-plant-500/10">
                    Join
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-600 flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Organic Farming</h3>
                      <p className="text-xs text-gray-400">3.7K members</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 text-plant-500 hover:bg-plant-500/10">
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ConnectPage;
