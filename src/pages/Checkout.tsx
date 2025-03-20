
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Building, 
  Wallet, 
  Truck, 
  Gift, 
  ChevronRight, 
  ChevronLeft,
  Check
} from "lucide-react";
import { toast } from "sonner";
import LeafBackground from "@/components/LeafBackground";

// Checkout steps
type CheckoutStep = "details" | "gift" | "payment" | "confirmation";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("details");
  const [includeGift, setIncludeGift] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    saveInfo: false,
  });
  
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleNextStep = () => {
    if (currentStep === "details") {
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.phone || !formData.address || !formData.city || 
          !formData.state || !formData.pincode) {
        toast.error("Please fill in all required fields");
        return;
      }
      setCurrentStep("gift");
    } else if (currentStep === "gift") {
      setCurrentStep("payment");
    } else if (currentStep === "payment") {
      if (!paymentMethod) {
        toast.error("Please select a payment method");
        return;
      }
      // Process payment and order
      toast.success("Payment processed successfully!");
      setCurrentStep("confirmation");
    }
  };
  
  const handlePreviousStep = () => {
    if (currentStep === "gift") {
      setCurrentStep("details");
    } else if (currentStep === "payment") {
      setCurrentStep("gift");
    }
  };
  
  const handleCompleteOrder = () => {
    clearCart();
    navigate("/");
    toast.success("Thank you for your order!");
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const giftCost = includeGift ? 30 : 0;
    const shipping = 0; // Free shipping
    return subtotal + giftCost + shipping;
  };
  
  return (
    <LeafBackground>
      <div className="container mx-auto py-8 px-4 min-h-screen">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-8 text-gradient">Checkout</h1>
          
          {/* Progress indicator */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center">
              <div className={`flex flex-col items-center ${currentStep === "details" || currentStep === "gift" || currentStep === "payment" || currentStep === "confirmation" ? "text-plant-400" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "details" || currentStep === "gift" || currentStep === "payment" || currentStep === "confirmation" ? "bg-plant-500 text-black" : "bg-muted"}`}>
                  1
                </div>
                <span className="text-xs">Details</span>
              </div>
              
              <div className="flex-1 h-1 mx-2 bg-muted">
                <div className={`h-full ${currentStep === "gift" || currentStep === "payment" || currentStep === "confirmation" ? "bg-plant-500" : "bg-transparent"}`}></div>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep === "gift" || currentStep === "payment" || currentStep === "confirmation" ? "text-plant-400" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "gift" || currentStep === "payment" || currentStep === "confirmation" ? "bg-plant-500 text-black" : "bg-muted"}`}>
                  2
                </div>
                <span className="text-xs">Gift</span>
              </div>
              
              <div className="flex-1 h-1 mx-2 bg-muted">
                <div className={`h-full ${currentStep === "payment" || currentStep === "confirmation" ? "bg-plant-500" : "bg-transparent"}`}></div>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep === "payment" || currentStep === "confirmation" ? "text-plant-400" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "payment" || currentStep === "confirmation" ? "bg-plant-500 text-black" : "bg-muted"}`}>
                  3
                </div>
                <span className="text-xs">Payment</span>
              </div>
              
              <div className="flex-1 h-1 mx-2 bg-muted">
                <div className={`h-full ${currentStep === "confirmation" ? "bg-plant-500" : "bg-transparent"}`}></div>
              </div>
              
              <div className={`flex flex-col items-center ${currentStep === "confirmation" ? "text-plant-400" : "text-muted-foreground"}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${currentStep === "confirmation" ? "bg-plant-500 text-black" : "bg-muted"}`}>
                  4
                </div>
                <span className="text-xs">Confirmation</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main checkout content */}
            <div className="md:col-span-2">
              {/* Step 1: Customer Details */}
              {currentStep === "details" && (
                <motion.div 
                  className="glass-card p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-6">
                    <Checkbox 
                      id="saveInfo" 
                      checked={formData.saveInfo}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange("saveInfo", checked as boolean)
                      }
                    />
                    <Label htmlFor="saveInfo" className="text-sm">
                      Save this information for next time
                    </Label>
                  </div>
                </motion.div>
              )}
              
              {/* Step 2: Gift options */}
              {currentStep === "gift" && (
                <motion.div 
                  className="glass-card p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-6">Gift Options</h2>
                  
                  <div className="mb-6">
                    <div 
                      className={`border p-4 rounded-lg mb-4 cursor-pointer transition-colors ${includeGift ? 'border-plant-500 bg-plant-500/10' : 'border-border'}`}
                      onClick={() => setIncludeGift(true)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${includeGift ? 'border-plant-500 bg-plant-500' : 'border-muted-foreground'}`}>
                          {includeGift && <Check className="h-3 w-3 text-black" />}
                        </div>
                        <div className="ml-3 flex-1">
                          <h3 className="font-medium">Include Gift Package</h3>
                          <p className="text-sm text-muted-foreground">Add a beautiful eco-friendly gift box with decorative elements</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹30</p>
                        </div>
                      </div>
                    </div>
                    
                    <div 
                      className={`border p-4 rounded-lg cursor-pointer transition-colors ${!includeGift ? 'border-plant-500 bg-plant-500/10' : 'border-border'}`}
                      onClick={() => setIncludeGift(false)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${!includeGift ? 'border-plant-500 bg-plant-500' : 'border-muted-foreground'}`}>
                          {!includeGift && <Check className="h-3 w-3 text-black" />}
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium">No Gift Package</h3>
                          <p className="text-sm text-muted-foreground">Standard eco-friendly packaging</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">Free</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {includeGift && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-6"
                    >
                      <Label htmlFor="giftMessage" className="block mb-2">Gift Message (Optional)</Label>
                      <Textarea
                        id="giftMessage"
                        placeholder="Add a personal message for the recipient"
                        className="w-full"
                      />
                    </motion.div>
                  )}
                  
                  <div className="flex items-center justify-center p-4 bg-plant-500/10 rounded-lg">
                    <Gift className="h-5 w-5 text-plant-400 mr-2" />
                    <p className="text-sm">Our gift packaging is made from recycled materials and is 100% biodegradable</p>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Payment options */}
              {currentStep === "payment" && (
                <motion.div 
                  className="glass-card p-6 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div 
                      className={`border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-plant-500 bg-plant-500/10' : 'border-border'}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-plant-500 bg-plant-500' : 'border-muted-foreground'}`}>
                          {paymentMethod === 'card' && <Check className="h-3 w-3 text-black" />}
                        </div>
                        <div className="ml-3">
                          <CreditCard className="h-5 w-5 inline-block mr-2" />
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pl-8"
                        >
                          <div className="grid gap-4">
                            <div>
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                className="mt-1"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input
                                  id="expiry"
                                  placeholder="MM/YY"
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input
                                  id="cvv"
                                  placeholder="123"
                                  className="mt-1"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                    
                    <div 
                      className={`border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'netbanking' ? 'border-plant-500 bg-plant-500/10' : 'border-border'}`}
                      onClick={() => setPaymentMethod('netbanking')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'netbanking' ? 'border-plant-500 bg-plant-500' : 'border-muted-foreground'}`}>
                          {paymentMethod === 'netbanking' && <Check className="h-3 w-3 text-black" />}
                        </div>
                        <div className="ml-3">
                          <Building className="h-5 w-5 inline-block mr-2" />
                          <span className="font-medium">Net Banking</span>
                        </div>
                      </div>
                      
                      {paymentMethod === 'netbanking' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pl-8"
                        >
                          <Label htmlFor="bank">Select Bank</Label>
                          <select 
                            id="bank" 
                            className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                          >
                            <option value="">Select your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                          </select>
                        </motion.div>
                      )}
                    </div>
                    
                    <div 
                      className={`border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'upi' ? 'border-plant-500 bg-plant-500/10' : 'border-border'}`}
                      onClick={() => setPaymentMethod('upi')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-plant-500 bg-plant-500' : 'border-muted-foreground'}`}>
                          {paymentMethod === 'upi' && <Check className="h-3 w-3 text-black" />}
                        </div>
                        <div className="ml-3">
                          <Wallet className="h-5 w-5 inline-block mr-2" />
                          <span className="font-medium">UPI</span>
                        </div>
                      </div>
                      
                      {paymentMethod === 'upi' && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-4 pl-8"
                        >
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input
                            id="upiId"
                            placeholder="yourname@bankname"
                            className="mt-1"
                          />
                        </motion.div>
                      )}
                    </div>
                    
                    <div 
                      className={`border p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-plant-500 bg-plant-500/10' : 'border-border'}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-plant-500 bg-plant-500' : 'border-muted-foreground'}`}>
                          {paymentMethod === 'cod' && <Check className="h-3 w-3 text-black" />}
                        </div>
                        <div className="ml-3">
                          <Truck className="h-5 w-5 inline-block mr-2" />
                          <span className="font-medium">Cash on Delivery</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h3 className="font-semibold mb-2">Order Summary</h3>
                    <div className="flex justify-between mb-1">
                      <span>Subtotal</span>
                      <span>₹{getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Gift Package</span>
                      <span>{includeGift ? '₹30' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-border">
                      <span>Total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Step 4: Confirmation */}
              {currentStep === "confirmation" && (
                <motion.div 
                  className="glass-card p-6 rounded-xl text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="my-8">
                    <div className="mx-auto w-16 h-16 rounded-full bg-plant-500 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-dark-900" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
                    <p className="text-muted-foreground mb-4">Your order has been placed successfully</p>
                    
                    <div className="bg-plant-500/10 p-4 rounded-lg inline-block">
                      <p className="font-semibold">Order #HG{Math.floor(100000 + Math.random() * 900000)}</p>
                      <p className="text-sm text-muted-foreground">A confirmation email has been sent to {formData.email}</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold mb-4">Shipping Details</h3>
                    <div className="text-sm text-left max-w-md mx-auto">
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.pincode}</p>
                      <p>{formData.phone}</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full max-w-xs bg-plant-500 hover:bg-plant-600 text-dark-900"
                    onClick={handleCompleteOrder}
                  >
                    Continue Shopping
                  </Button>
                </motion.div>
              )}
              
              {/* Navigation buttons */}
              {currentStep !== "confirmation" && (
                <div className="mt-6 flex justify-between">
                  {currentStep !== "details" ? (
                    <Button 
                      variant="outline" 
                      onClick={handlePreviousStep}
                      className="border-plant-500 text-plant-400 hover:bg-plant-500/10"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                  ) : (
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/")}
                      className="border-plant-500 text-plant-400 hover:bg-plant-500/10"
                    >
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back to Cart
                    </Button>
                  )}
                  
                  <Button 
                    onClick={handleNextStep}
                    className="bg-plant-500 hover:bg-plant-600 text-dark-900"
                  >
                    {currentStep === "payment" ? "Place Order" : "Continue"}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
            
            {/* Order summary */}
            {currentStep !== "confirmation" && (
              <div className="md:col-span-1">
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  {cartItems.length > 0 ? (
                    <>
                      <div className="max-h-80 overflow-y-auto mb-4">
                        {cartItems.map(item => (
                          <div key={item.product.id} className="flex items-start py-3 border-b border-border last:border-0">
                            <div className="h-16 w-16 rounded-md bg-gradient-to-br from-plant-800 to-plant-600 flex items-center justify-center shrink-0">
                              <span className="text-xs text-plant-200 text-center px-1">{item.product.name}</span>
                            </div>
                            <div className="ml-3 flex-1">
                              <h4 className="font-medium text-sm">{item.product.name}</h4>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                                <span className="text-sm">₹{item.product.price * item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>₹{getCartTotal()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gift Package</span>
                          <span>{includeGift ? '₹30' : 'Free'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-border">
                          <span>Total</span>
                          <span>₹{calculateTotal()}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>Your cart is empty</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </LeafBackground>
  );
};

export default Checkout;
