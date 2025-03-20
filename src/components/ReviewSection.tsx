
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, UserIcon, Calendar, Flag, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  id: number;
  user: string;
  initials: string;
  date: string;
  rating: number;
  title: string;
  comment: string;
  helpful: number;
  notHelpful: number;
  verified: boolean;
}

interface ReviewSectionProps {
  productId: number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  // Mock reviews data - in a real app, this would come from an API
  const reviews: Review[] = [
    {
      id: 1,
      user: "John D.",
      initials: "JD",
      date: "May 15, 2023",
      rating: 5,
      title: "Excellent Quality Kit",
      comment: "I've been using this kit for about a month now, and I'm amazed at how well my Tulsi plant is growing. The soil quality is excellent, and the instructions are very clear.",
      helpful: 24,
      notHelpful: 2,
      verified: true
    },
    {
      id: 2,
      user: "Priya S.",
      initials: "PS",
      date: "June 3, 2023",
      rating: 4,
      title: "Great for beginners",
      comment: "This was my first time growing herbs at home, and this kit made it so easy. The Aloe Vera is thriving! The only reason I'm giving 4 stars is because I wish the pot was slightly bigger.",
      helpful: 18,
      notHelpful: 1,
      verified: true
    },
    {
      id: 3,
      user: "Michael T.",
      initials: "MT",
      date: "April 22, 2023",
      rating: 5,
      title: "Perfect gift for plant lovers",
      comment: "I bought this as a gift for my wife who loves gardening, and she absolutely loved it. The packaging is beautiful and everything needed is included. The ginger is growing well!",
      helpful: 32,
      notHelpful: 0,
      verified: true
    },
    {
      id: 4,
      user: "Anita R.",
      initials: "AR",
      date: "July 10, 2023",
      rating: 3,
      title: "Good but slow growth",
      comment: "The kit is well made and has all the essentials, but my Turmeric is growing much slower than expected. Following all the instructions carefully. May need more patience.",
      helpful: 7,
      notHelpful: 3,
      verified: true
    },
    {
      id: 5,
      user: "David K.",
      initials: "DK",
      date: "August 5, 2023",
      rating: 5,
      title: "Amazing results with minimal effort",
      comment: "I've never had a green thumb, but this kit made it so easy! My lavender is flourishing and the fragrance is amazing. Will definitely buy more kits from this company.",
      helpful: 41,
      notHelpful: 2,
      verified: true
    },
    {
      id: 6,
      user: "Sanjay M.",
      initials: "SM",
      date: "May 30, 2023",
      rating: 4,
      title: "Quality product, great customer service",
      comment: "When I first received my kit, there was a small issue with the spray bottle. Customer service responded quickly and sent a replacement. The Eucalyptus is growing beautifully now.",
      helpful: 15,
      notHelpful: 1,
      verified: true
    },
    {
      id: 7,
      user: "Lina H.",
      initials: "LH",
      date: "July 22, 2023",
      rating: 5,
      title: "Medicinal garden dream come true",
      comment: "I've always wanted to grow my own medicinal herbs, and this kit made it possible even in my small apartment. The quality of everything is top-notch. My Tulsi is thriving!",
      helpful: 28,
      notHelpful: 0,
      verified: true
    }
  ];

  // Filter reviews for specific product (in real app)
  // const filteredReviews = reviews.filter(review => review.productId === productId);
  const filteredReviews = reviews; // For demo purposes, show all reviews

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const averageRating = filteredReviews.reduce((acc, review) => acc + review.rating, 0) / filteredReviews.length;

  const ratingCounts = {
    5: filteredReviews.filter(r => r.rating === 5).length,
    4: filteredReviews.filter(r => r.rating === 4).length,
    3: filteredReviews.filter(r => r.rating === 3).length,
    2: filteredReviews.filter(r => r.rating === 2).length,
    1: filteredReviews.filter(r => r.rating === 1).length,
  };

  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Customer Reviews</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Rating summary */}
        <div className="glass-card p-6 rounded-xl">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className="h-5 w-5 text-yellow-400" 
                  fill={star <= Math.round(averageRating) ? "currentColor" : "none"} 
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Based on {filteredReviews.length} reviews
            </div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <div className="flex items-center w-16">
                  <span className="text-sm">{rating}</span>
                  <Star className="h-4 w-4 text-yellow-400 ml-1" fill="currentColor" />
                </div>
                <div className="w-full h-2 bg-dark-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-plant-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(ratingCounts[rating as keyof typeof ratingCounts] / filteredReviews.length) * 100}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                </div>
                <div className="w-10 text-right text-sm text-muted-foreground">
                  {ratingCounts[rating as keyof typeof ratingCounts]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Button className="w-full bg-plant-500 hover:bg-plant-600 text-dark-900">
              Write a Review
            </Button>
          </div>
        </div>

        {/* Reviews list */}
        <div className="lg:col-span-3 space-y-6">
          {currentReviews.map((review) => (
            <motion.div 
              key={review.id} 
              className="glass-card p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 bg-plant-700/30 text-plant-200 border-2 border-plant-600/30">
                    <AvatarFallback>{review.initials}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="font-medium">{review.user}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {review.date}
                      {review.verified && (
                        <span className="ml-2 flex items-center text-green-500">
                          <Flag className="h-3 w-3 mr-1" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className="h-4 w-4 text-yellow-400" 
                      fill={star <= review.rating ? "currentColor" : "none"} 
                    />
                  ))}
                </div>
              </div>

              <h4 className="font-medium mt-4">{review.title}</h4>
              <p className="mt-2 text-muted-foreground">{review.comment}</p>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm">Was this review helpful?</div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs flex items-center space-x-1 border-dark-700"
                  >
                    <ThumbsUp className="h-3 w-3" />
                    <span>Yes ({review.helpful})</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-xs flex items-center space-x-1 border-dark-700"
                  >
                    <ThumbsDown className="h-3 w-3" />
                    <span>No ({review.notHelpful})</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-dark-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button 
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-plant-500 text-dark-900" : "border-dark-700"}
                >
                  {page}
                </Button>
              ))}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-dark-700"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
