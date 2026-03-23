import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Building,
  Truck,
  Lock,
  Check,
  ChevronLeft,
} from "lucide-react";

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card", icon: <CreditCard size={24} /> },
  { id: "bank", label: "Bank Transfer", icon: <Building size={24} /> },
  { id: "cash", label: "Cash on Delivery", icon: <Truck size={24} /> },
];

const packageData = {
  basic: { name: "Basic Package", price: 0 },
  standard: { name: "Standard Package", price: 1500 },
  premium: { name: "Premium Package", price: 3500 },
};

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [method, setMethod] = useState("card");
  const [manualRef, setManualRef] = useState("");
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    email: "",
    phone: "",
  });

  // Get booking data from location state or use defaults
  const bookingData = location.state?.bookingData || {
    eventType: "Wedding",
    eventDate: "",
    eventTime: "",
    venue: "Five Palm Jumeirah",
    guestCount: 50,
    invitationType: "digital",
    package: "standard",
  };

  const currentPackage =
    packageData[bookingData.package] || packageData.standard;
  const guestFee =
    bookingData.guestCount > 50 ? (bookingData.guestCount - 50) * 10 : 0;
  const subtotal = currentPackage.price + guestFee;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/booking/login");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Grant Access after payment
  const storeAccess = (paymentMethod = "card") => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    localStorage.setItem(
      "booking",
      JSON.stringify({
        registered: true,
        paid: true,
        method: paymentMethod,
        email: user.email,
        expiresAt: expiresAt.toISOString(),
      }),
    );

    setSuccess(true);

    setTimeout(() => {
      navigate("/booking/dashboard");
    }, 1500);
  };

  const handlePayment = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store access and complete payment
    storeAccess(method);

    setIsProcessing(false);
  };

  const handleFlutterPayment = () => {
    if (!window.FluttewaveCheckout) {
      console.log("Flutterwave not available");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-pink-500 mb-6 transition-colors"
        >
          <ChevronLeft size={20} /> Back
        </button>

        <h1 className="text-3xl font-bold text-slate-800 mb-8 text-center">
          Complete Your Payment
        </h1>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-12 shadow-xl text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-green-500" size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Payment Successful!
              </h2>
              <p className="text-slate-600">Redirecting to dashboard...</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Payment Form - Left */}
              <div className="lg:col-span-2 space-y-6">
                {/* Booking Details Summary */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Booking Details
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Event Type</p>
                      <p className="font-semibold text-slate-800">
                        {bookingData.eventType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Package</p>
                      <p className="font-semibold text-slate-800">
                        {currentPackage.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Date</p>
                      <p className="font-semibold text-slate-800">
                        {bookingData.eventDate
                          ? new Date(bookingData.eventDate).toLocaleDateString()
                          : "Not selected"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Time</p>
                      <p className="font-semibold text-slate-800">
                        {bookingData.eventTime || "Not selected"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-slate-500">Venue</p>
                      <p className="font-semibold text-slate-800">
                        {bookingData.venue}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Guests</p>
                      <p className="font-semibold text-slate-800">
                        {bookingData.guestCount} guests
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+2348086902551"
                        className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <h2 className="text-xl font-semibold text-slate-800 mb-4">
                    Payment Method
                  </h2>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {paymentMethods.map((pm) => (
                      <button
                        key={pm.id}
                        onClick={() => setMethod(pm.id)}
                        className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${
                          method === pm.id
                            ? "border-pink-500 bg-pink-50"
                            : "border-slate-200 hover:border-pink-300"
                        }`}
                      >
                        <div
                          className={`${method === pm.id ? "text-pink-500" : "text-slate-600"}`}
                        >
                          {pm.icon}
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {pm.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Card Details (shown when card is selected) */}
                  {method === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Full Name"
                          className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-pink-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {method === "bank" && (
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-slate-800 mb-3">
                        Bank Transfer Details
                      </h3>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="text-yellow-600">
                          Bank transfer details will be provided via email after
                          booking confirmation.
                        </p>
                        <p className="mt-3 text-xs text-slate-500">
                          Please use your email as payment reference.
                        </p>
                      </div>
                    </div>
                  )}

                  {method === "cash" && (
                    <div className="bg-slate-50 rounded-xl p-6">
                      <Truck size={32} className="text-green-500 mb-3" />
                      <p className="text-slate-600">
                        Pay with cash upon arrival at the venue. A 50% advance
                        deposit is required to confirm your booking.
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 text-pink-500 rounded border-slate-300 focus:ring-pink-500"
                    />
                    <span className="text-slate-600">
                      I agree to the{" "}
                      <a href="#" className="text-pink-500 hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and
                      <a href="#" className="text-pink-500 hover:underline">
                        {" "}
                        Privacy Policy
                      </a>
                      . I understand that my booking is subject to availability
                      and cancellation policy.
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Summary - Right */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 sticky top-24">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">
                    Payment Summary
                  </h3>

                  {/* Event Info */}
                  <div className="flex gap-4 mb-6 pb-6 border-b border-slate-200">
                    <div className="w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="text-pink-500" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">
                        {bookingData.eventType}
                      </p>
                      <p className="text-sm text-slate-500">
                        {bookingData.venue}
                      </p>
                      <p className="text-sm text-slate-500">
                        {bookingData.eventDate
                          ? new Date(bookingData.eventDate).toLocaleDateString()
                          : "TBD"}
                      </p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-slate-600">
                      <span>{currentPackage.name}</span>
                      <span>${currentPackage.price.toLocaleString()}</span>
                    </div>
                    {guestFee > 0 && (
                      <div className="flex justify-between text-slate-600">
                        <span>
                          Extra Guests ({bookingData.guestCount - 50} × $10)
                        </span>
                        <span>${guestFee.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-600">
                      <span>Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <hr className="border-slate-200" />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-pink-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Note */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                    <Lock size={16} />
                    <span>Your payment is secure and encrypted</span>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing || !agreedToTerms}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                      isProcessing || !agreedToTerms
                        ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>Pay ${total.toFixed(2)}</>
                    )}
                  </button>

                  {/* Guarantees */}
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Check size={14} className="text-green-500" />
                      <span>Free cancellation up to 7 days before</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Check size={14} className="text-green-500" />
                      <span>Instant confirmation via email</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Check size={14} className="text-green-500" />
                      <span>100% Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Payment;
