import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Phone, Package, Calendar, User, CheckCircle2, Clock, CreditCard, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/Header';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Booking {
  booking_number: string;
  user_name: string;
  phone_number: string;
  products: Array<{ id: string; name: string; quantity: number; unit: string }>;
  payment_status: 'paid' | 'unpaid';
  delivery_status: 'delivered' | 'undelivered';
  view_status: 'seen' | 'unseen';
  created_at: string;
}

const Orders = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Booking[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!mobileNo || mobileNo.length < 10) {
      toast.error('Please enter a valid mobile number');
      return;
    }

    setLoading(true);
    setSearched(true);
    
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('phone_number', mobileNo)
        .order('created_at', { ascending: false });
      
      console.log("ORDERS DATA:", data);
      
      if (error) throw error;
      setOrders((data as unknown) as Booking[] || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Clean Header Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Order Tracking</h1>
          </div>
          <p className="text-gray-600 ml-13">Search and track your orders using your registered mobile number</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
          <div className="max-w-2xl">
            <Label htmlFor="mobile" className="text-sm font-semibold text-gray-700 mb-2 block">
              Mobile Number
            </Label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-11 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  maxLength={15}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={loading || !mobileNo || mobileNo.length < 10}
                className="h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Searching
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Orders
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {searched && !loading &&(
          <div>
            {orders.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Orders Found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We couldn't find any orders associated with this mobile number.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {orders.length} {orders.length === 1 ? 'Order' : 'Orders'} Found
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {orders.map((order, index) => (
                    <div
                      key={order.booking_number}
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                      style={{ 
                        animation: `slideIn 0.3s ease-out ${index * 0.05}s both`,
                      }}
                    >
                      {/* Order Header */}
                      <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="text-sm text-gray-600 mb-1">Order Number</div>
                              <div className="text-lg font-bold text-gray-900">#{order.booking_number}</div>
                            </div>
                            <div className="h-10 w-px bg-gray-300"></div>
                            <div>
                              <div className="text-sm text-gray-600 mb-1">Order Date</div>
                              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                <Calendar className="w-4 h-4" />
                                {new Date(order.created_at).toLocaleDateString('en-SG', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric'
                                })}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold ${
                              order.delivery_status === 'delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.delivery_status === 'delivered' ? (
                                <>
                                  <CheckCircle2 className="w-4 h-4" />
                                  Delivered
                                </>
                              ) : (
                                <>
                                  <Clock className="w-4 h-4" />
                                  Pending
                                </>
                              )}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-semibold ${
                              order.payment_status === 'paid' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              <CreditCard className="w-4 h-4" />
                              {order.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Order Body */}
                      <div className="p-6">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Customer Details */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                              Customer Information
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-blue-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 mb-0.5">Customer Name</div>
                                  <div className="text-sm font-medium text-gray-900">{order.user_name}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Phone className="w-4 h-4 text-green-600" />
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500 mb-0.5">Phone Number</div>
                                  <div className="text-sm font-medium text-gray-900">{order.phone_number}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                              Order Items ({order.products.length})
                            </h3>
                            <div className="space-y-2">
                              {order.products.map((item, i) => (
                                <div 
                                  key={i} 
                                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                                >
                                  <div className="w-8 h-8 bg-white border border-gray-200 rounded flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-bold text-gray-600">{i + 1}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 truncate">{item.name}</div>
                                    <div className="text-xs text-gray-500">
                                      Qty: <span className="font-semibold text-gray-700">{item.quantity}</span> {item.unit}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Orders;
