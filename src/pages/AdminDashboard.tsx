import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Package, Clock, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Booking {
  id: string;
  user_name: string;
  phone_number: string;
  products: Array<{ id: string; name: string; quantity: number; unit: string }>;
  payment_status: 'paid' | 'unpaid';
  delivery_status: 'delivered' | 'undelivered';
  view_status: 'seen' | 'unseen';
  created_at: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid' | 'delivered' | 'undelivered' | 'seen' | 'unseen'>('all');

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/login');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchBookings();
    }
  }, [user, isAdmin]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings((data as unknown) as Booking[] || []);
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id);

      if (error) throw error;
      toast.success('Booking updated successfully');
      fetchBookings();
    } catch (error: any) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'paid' || filter === 'unpaid') return booking.payment_status === filter;
    if (filter === 'delivered' || filter === 'undelivered') return booking.delivery_status === filter;
    if (filter === 'seen' || filter === 'unseen') return booking.view_status === filter;
    return true;
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gradient">Admin Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Bookings Overview</h2>
          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as typeof filter)}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="undelivered">Undelivered</TabsTrigger>
              <TabsTrigger value="seen">Seen</TabsTrigger>
              <TabsTrigger value="unseen">Unseen</TabsTrigger>
            </TabsList>
            <TabsContent value={filter} className="mt-6">
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
                {filteredBookings.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center text-muted-foreground">
                      No bookings found
                    </CardContent>
                  </Card>
                ) : (
                  filteredBookings.map((booking) => (
                    <Card key={booking.id} className="glass-effect border-primary/20">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{booking.user_name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{booking.phone_number}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(booking.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge variant={booking.payment_status === 'paid' ? 'default' : 'secondary'}>
                              {booking.payment_status}
                            </Badge>
                            <Badge variant={booking.delivery_status === 'delivered' ? 'default' : 'secondary'}>
                              {booking.delivery_status}
                            </Badge>
                            <Badge variant={booking.view_status === 'seen' ? 'outline' : 'destructive'}>
                              {booking.view_status}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 mb-4">
                          <p className="font-semibold text-sm flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            Products:
                          </p>
                          <ul className="space-y-1 ml-6">
                            {booking.products.map((product, idx) => (
                              <li key={idx} className="text-sm">
                                {product.name}: <strong>{product.quantity}</strong> {product.unit}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBooking(booking.id, {
                              payment_status: booking.payment_status === 'paid' ? 'unpaid' : 'paid'
                            })}
                          >
                            {booking.payment_status === 'paid' ? <XCircle className="w-4 h-4 mr-1" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                            Mark {booking.payment_status === 'paid' ? 'Unpaid' : 'Paid'}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBooking(booking.id, {
                              delivery_status: booking.delivery_status === 'delivered' ? 'undelivered' : 'delivered'
                            })}
                          >
                            {booking.delivery_status === 'delivered' ? <Clock className="w-4 h-4 mr-1" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                            Mark {booking.delivery_status === 'delivered' ? 'Undelivered' : 'Delivered'}
                          </Button>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBooking(booking.id, {
                              view_status: booking.view_status === 'seen' ? 'unseen' : 'seen'
                            })}
                          >
                            {booking.view_status === 'seen' ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
                            Mark {booking.view_status === 'seen' ? 'Unseen' : 'Seen'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
