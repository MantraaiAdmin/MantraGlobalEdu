import { Card, CardContent } from '@/components/ui/card';
import { Users, FileText, Calendar, CheckSquare } from 'lucide-react';

export default function CounselorDashboardPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-6">Counselor Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Assigned Students', value: '24', icon: Users },
          { label: 'Pending Reviews', value: '8', icon: FileText },
          { label: 'Today\'s Appointments', value: '3', icon: Calendar },
          { label: 'Open Tasks', value: '5', icon: CheckSquare },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-primary mb-4">Today&apos;s Schedule</h3>
          <div className="space-y-3">
            {[
              { time: '10:00 AM', student: 'Rahul Sharma', type: 'Application Review' },
              { time: '2:00 PM', student: 'Priya Patel', type: 'Counseling Session' },
              { time: '4:30 PM', student: 'Amit Kumar', type: 'Document Verification' },
            ].map((appt) => (
              <div key={appt.time} className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                <div className="text-sm font-medium text-primary w-20">{appt.time}</div>
                <div>
                  <div className="font-medium">{appt.student}</div>
                  <div className="text-sm text-muted-foreground">{appt.type}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
