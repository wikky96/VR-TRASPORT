import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, Phone, Package, Calendar, User, CheckCircle2, Clock, CreditCard, ShoppingBag, Box } from 'lucide-react';
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
  const { t } = useLanguage();
  const [mobileNo, setMobileNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Booking[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!mobileNo || mobileNo.length < 10) {
      toast.error(t('order.search.validation_error'));
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
      toast.error(t('order.error.fetch_failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Professional Header - Fully Responsive */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient">{t('order.header.title')}</h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:hidden">{t('order.header.subtitle_mobile')}</p>
              </div>
            </div>
          </div>
          <p className="hidden sm:block text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3">
            {t('order.header.subtitle_desktop')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Search Section - Matching BookingModal Design */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6 sm:mb-8">
          <div className="glass-effect bg-gradient-to-br from-primary/5 to-accent/5 px-4 sm:px-6 py-3 sm:py-4 border-b border-primary/20">
            <h2 className="text-base sm:text-lg font-bold text-gradient flex items-center gap-2">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              {t('order.search.title')}
            </h2>
          </div>
          
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-3xl mx-auto space-y-2">
              <div className="space-y-0.5">
                <Label htmlFor="mobile" className="text-xs sm:text-sm font-semibold text-gray-700">
                  {t('order.search.mobile_label')} *
                </Label>
                
                <div className="flex gap-2 sm:gap-3">
                  <div className="flex-1 relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder={t('order.search.mobile_placeholder')}
                      value={mobileNo}
                      onChange={(e) => setMobileNo(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-9 sm:pl-12 h-10 sm:h-11 border border-gray-300 focus:border-gray-600 rounded-lg transition-colors duration-150 w-full text-sm"
                      maxLength={15}
                      inputMode="numeric"
                    />
                  </div>
                  
                  <Button
                    onClick={handleSearch}
                    disabled={loading || !mobileNo || mobileNo.length < 10}
                    className="h-10 sm:h-11 px-4 sm:px-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 rounded-lg shadow-lg hover:shadow-xl transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">{t('order.search.button_searching')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <Search className="w-4 h-4" />
                        <span className="hidden sm:inline">{t('order.search.button_search')}</span>
                        <span className="sm:hidden">{t('order.search.button_search_mobile')}</span>
                      </div>
                    )}
                  </Button>
                </div>
                
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  {t('order.search.mobile_hint')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section - Fully Responsive */}
        {searched && !loading && (
          <div>
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 sm:p-12 lg:p-16 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {t('order.results.no_orders_title')}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                  {t('order.results.no_orders_message')}
                </p>
              </div>
            ) : (
              <>
                {/* Results Header */}
                <div className="mb-4 sm:mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                     {orders.length} {t(orders.length === 1 ? 'order.results.orders_found' : 'order.results.orders_found_plural')}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {t('order.results.showing_all')}
                    </p>
                  </div>
                </div>
                
                {/* Order Cards - Responsive Grid */}
                <div className="space-y-6">
                  {orders.map((order, index) => (
                    <div
                      key={order.booking_number}
                      className="group bg-white rounded-2xl border-2 border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                      style={{ 
                        animation: `slideIn 0.4s ease-out ${index * 0.1}s both`,
                      }}
                    >
                      {/* Premium Order Header with Gradient Accent */}
                      <div className="relative bg-gradient-to-br from-slate-50 via-white to-primary/5 px-6 py-5 border-b-2 border-gray-100">
                        {/* Decorative Corner Element */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full opacity-50"></div>
                        
                        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                          {/* Left: Order Identity */}
                          <div className="flex items-start gap-4">
                            {/* Order Number Badge */}
                            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                              <Package className="w-7 h-7 text-white" />
                            </div>
                            
                            <div className="space-y-2">
                              <div>
                                <div className="text-xs font-medium text-gray-500 mb-1">{t('order.order_card.order_number')}</div>
                                <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                  #{order.booking_number}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-primary" />
                                <span className="font-medium">
                                  {new Date(order.created_at).toLocaleDateString('en-SG', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right: Status Badges */}
                          <div className="flex flex-wrap items-center gap-3">
                            {/* Delivery Status */}
                            <div className={`relative overflow-hidden px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all duration-300 ${
                              order.delivery_status === 'delivered' 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                                : 'bg-gradient-to-r from-amber-400 to-orange-400 text-white'
                            }`}>
                              <div className="relative flex items-center gap-2 z-10">
                                {order.delivery_status === 'delivered' ? (
                                  <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    <span>{t('order.order_card.status_delivered')}</span>
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-5 h-5" />
                                    <span>{t('order.order_card.status_pending')}</span>
                                  </>
                                )}
                              </div>
                              {/* Shimmer Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                            
                            {/* Payment Status */}
                            <div className={`relative overflow-hidden px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md transition-all duration-300 ${
                              order.payment_status === 'paid' 
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white' 
                                : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                            }`}>
                              <div className="relative flex items-center gap-2 z-10">
                                <CreditCard className="w-5 h-5" />
                                <span>{t(order.payment_status === 'paid' ? 'order.order_card.status_paid' : 'order.order_card.status_unpaid')}</span>
                              </div>
                              {/* Shimmer Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Content Body */}
                      <div className="p-6 lg:p-8 bg-gradient-to-br from-white to-gray-50/30">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Customer Information Panel */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                <User className="w-5 h-5 text-primary" />
                              </div>
                              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                {t('order.order_card.customer_info')}
                              </h3>
                            </div>
                            
                            <div className="space-y-3">
                              {/* Customer Name */}
                              <div className="group/item bg-white rounded-xl p-4 border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-4">
                                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                    <User className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium text-gray-500 mb-1">{t('order.order_card.customer_name')}</div>
                                    <div className="text-base font-bold text-gray-900 truncate">
                                      {order.user_name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Customer Phone */}
                              <div className="group/item bg-white rounded-xl p-4 border border-gray-200 hover:border-accent/50 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-4">
                                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
                                    <Phone className="w-6 h-6 text-accent" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium text-gray-500 mb-1">{t('order.order_card.customer_phone')}</div>
                                    <div className="text-base font-bold text-gray-900">
                                      {order.phone_number}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Items Panel */}
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                                <Box className="w-5 h-5 text-accent" />
                              </div>
                              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                                {t('order.order_card.order_items_count')} {order.products.length}
                              </h3>
                            </div>
                            
                            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                              {order.products.map((item, i) => (
                                <div 
                                  key={i} 
                                  className="group/item bg-white rounded-xl p-4 border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-300"
                                  style={{ 
                                    animation: `slideIn 0.3s ease-out ${i * 0.05}s both`,
                                  }}
                                >
                                  <div className="flex items-center gap-4">
                                    {/* Item Number Badge */}
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center font-bold text-white text-sm shadow-md group-hover/item:scale-110 transition-transform duration-300">
                                      {i + 1}
                                    </div>
                                    
                                    {/* Item Details */}
                                    <div className="flex-1 min-w-0">
                                      <div className="text-base font-bold text-gray-900 mb-1 truncate">
                                        {item.name}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-500">{t('order.order_card.quantity')}:</span>
                                        <span className="px-2 py-1 bg-primary/10 rounded-md text-xs font-bold text-primary">
                                          {item.quantity} {item.unit}
                                        </span>
                                      </div>
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8B5CF6, #EC4899);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7C3AED, #DB2777);
        }
      `}</style>
    </div>
  );
};

export default Orders;