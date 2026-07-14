import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Calendar, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '1,247', change: '+12%', icon: Users },
  { label: 'Active Applications', value: '384', change: '+8%', icon: FileText },
  { label: 'Appointments Today', value: '18', change: '', icon: Calendar },
  { label: 'Conversion Rate', value: '34%', change: '+3%', icon: TrendingUp },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                {stat.change && (
                  <span className="text-xs font-medium text-success">{stat.change}</span>
                )}
              </div>
              <div className="mt-4 text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-4">Recent Leads</h3>
            <div className="space-y-3">
              {['Amit Sharma - USA Interest', 'Neha Gupta - UK Interest', 'Vikram Reddy - Canada Interest'].map((lead) => (
                <div key={lead} className="flex justify-between items-center p-3 rounded-lg bg-muted text-sm">
                  <span>{lead}</span>
                  <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">New</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-primary mb-4">Application Pipeline</h3>
            <div className="space-y-3">
              {[
                { status: 'Submitted', count: 45 },
                { status: 'Under Review', count: 32 },
                { status: 'Offer Received', count: 18 },
                { status: 'Accepted', count: 12 },
              ].map((item) => (
                <div key={item.status} className="flex justify-between items-center text-sm">
                  <span>{item.status}</span>
                  <span className="font-semibold text-primary">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
