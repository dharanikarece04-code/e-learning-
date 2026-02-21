import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, CheckCircle, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleCheckout = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call to payment gateway
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);

            // Redirect to course player after success
            setTimeout(() => navigate('/learn/1'), 3000);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="checkout-page animate-fade-in flex-center">
                <div className="success-panel glass-panel text-center">
                    <div className="success-icon-wrapper pulse-animation">
                        <CheckCircle size={48} color="white" />
                    </div>
                    <h2>Payment Successful!</h2>
                    <p className="text-secondary mt-1 mb-2">You are now enrolled in Advanced React Patterns.</p>
                    <div className="receipt-box text-left">
                        <div className="flex-between mb-1"><span className="text-muted">Amount Paid</span><span className="font-medium">$89.99</span></div>
                        <div className="flex-between"><span className="text-muted">Transaction ID</span><span className="font-medium">txn_89x8f93...</span></div>
                    </div>
                    <p className="text-sm text-muted mt-2">Redirecting to your course library...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page animate-fade-in">
            <div className="checkout-container">

                <div className="checkout-header mb-3">
                    <Link to="/courses" className="btn-back"><ArrowLeft size={20} /> Back to Catalog</Link>
                    <div className="secure-badge">
                        <Lock size={14} /> Secure Checkout
                    </div>
                </div>

                <div className="checkout-grid cols-2">

                    {/* Payment Form */}
                    <div className="payment-section glass-panel">
                        <h2 className="mb-2">Enter Payment Details</h2>
                        <form onSubmit={handleCheckout}>

                            <div className="form-group mb-2">
                                <label>Email Address</label>
                                <input type="email" className="form-input" placeholder="you@example.com" defaultValue="student@demo.com" required />
                            </div>

                            <div className="form-group mb-3">
                                <label>Card Information</label>
                                <div className="card-input-wrapper">
                                    <CreditCard className="input-icon" size={18} />
                                    <input type="text" className="form-input card-number" placeholder="0000 0000 0000 0000" required maxLength={19} />
                                    <input type="text" className="form-input card-expiry" placeholder="MM/YY" required maxLength={5} />
                                    <input type="text" className="form-input card-cvc" placeholder="CVC" required maxLength={4} />
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <label>Name on Card</label>
                                <input type="text" className="form-input" placeholder="Jane Doe" required />
                            </div>

                            <button
                                type="submit"
                                className={`btn btn-primary btn-full ${isProcessing ? 'processing' : ''}`}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing Payment...' : 'Pay $89.99'}
                            </button>

                            <div className="trust-badges mt-2 flex-center text-muted gap-2 text-sm">
                                <Shield size={16} /> 256-bit SSL Encryption
                            </div>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="summary-section">
                        <div className="glass-panel summary-panel">
                            <h3 className="mb-2 border-bottom pb-1">Order Summary</h3>

                            <div className="order-item flex-between mb-2">
                                <div className="item-details row">
                                    <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Course Thumbnail" className="item-thumb" />
                                    <div className="col">
                                        <h4 className="font-medium text-sm">Advanced React Patterns</h4>
                                        <span className="text-xs text-muted">By Sarah Drasner</span>
                                    </div>
                                </div>
                                <div className="item-price font-medium">$89.99</div>
                            </div>

                            <div className="summary-totals mt-3 border-top pt-2">
                                <div className="flex-between mb-1 text-sm text-secondary">
                                    <span>Subtotal</span>
                                    <span>$89.99</span>
                                </div>
                                <div className="flex-between mb-1 text-sm text-secondary">
                                    <span>Tax (Calculated at checkout)</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex-between mt-2 pt-1 border-top font-medium text-lg">
                                    <span>Total</span>
                                    <span>$89.99</span>
                                </div>
                            </div>

                        </div>

                        <div className="guarantee-box mt-2 glass-panel p-2 flex-center flex-col text-center">
                            <Shield size={24} color="var(--accent-primary)" className="mb-1" />
                            <h4 className="text-sm font-medium">30-Day Money-Back Guarantee</h4>
                            <p className="text-xs text-muted mt-1">If you aren't completely satisfied, we'll refund your entire purchase.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
