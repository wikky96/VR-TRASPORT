import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Phone, Package, Calendar, MapPin, User, CreditCard } from 'lucide-react';
import { Header } from '@/components/Header';

const Orders = () => {
  const [mobileNo, setMobileNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!mobileNo || mobileNo.length < 10) {
      return;
    }

    setLoading(true);
    setSearched(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock order data
      const mockOrders = [
        {
          id: 'ORD-2024-001',
          customerName: 'John Doe',
          mobile: '8056892227',
          orderDate: '2024-11-28',
          status: 'Delivered',
          items: ['Product A', 'Product B'],
          totalAmount: 1299.99,
          shippingAddress: '123 Main St, Singapore 123456',
          paymentMethod: 'Credit Card'
        },
        {
          id: 'ORD-2024-002',
          customerName: 'John Doe',
          mobile: mobileNo,
          orderDate: '2024-11-15',
          status: 'In Transit',
          items: ['Product C'],
          totalAmount: 599.50,
          shippingAddress: '123 Main St, Singapore 123456',
          paymentMethod: 'PayNow'
        }
      ];
      
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-500/20 text-green-700 border-green-500/30',
      'In Transit': 'bg-blue-500/20 text-blue-700 border-blue-500/30',
      'Processing': 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30',
      'Cancelled': 'bg-red-500/20 text-red-700 border-red-500/30'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-700 border-gray-500/30';
  };

  return (
     <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
       <Header />
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4 md:p-8">
     
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="glass-effect border-primary/20 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gradient flex items-center gap-2">
              <Search className="w-6 h-6" />
              Order Search
            </CardTitle>
            <CardDescription>
              Enter mobile number to search for order details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter mobile number (e.g., 91234567)"
                  value={mobileNo}
                  onChange={(e) => setMobileNo(e.target.value)}
                  className="border-2 border-primary/20 focus:border-primary"
                  maxLength={15}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  disabled={loading}
                >
                  {loading ? (
                    'Searching...'
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {searched && !loading && (
          <div className="space-y-4 animate-fade-in">
            {orders.length === 0 ? (
              <Card className="glass-effect border-primary/20">
                <CardContent className="py-12 text-center">
                  <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-lg text-muted-foreground">
                    No orders found for this mobile number
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    Found {orders.length} order{orders.length !== 1 ? 's' : ''}
                  </h2>
                </div>
                
                {orders.map((order, index) => (
                  <Card 
                    key={order.id} 
                    className="glass-effect border-primary/20 hover:border-primary/40 transition-all"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl font-bold">
                            Order #{order.id}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(order.orderDate).toLocaleDateString('en-SG', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </CardDescription>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <User className="w-4 h-4 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Customer</p>
                              <p className="font-medium">{order.customerName}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Mobile</p>
                              <p className="font-medium">{order.mobile}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <CreditCard className="w-4 h-4 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Payment</p>
                              <p className="font-medium">{order.paymentMethod}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <Package className="w-4 h-4 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Items</p>
                              <ul className="font-medium space-y-1">
                                {order.items.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">Shipping Address</p>
                              <p className="font-medium">{order.shippingAddress}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-primary/20">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total Amount</span>
                          <span className="text-2xl font-bold text-gradient">
                            ${order.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Orders;