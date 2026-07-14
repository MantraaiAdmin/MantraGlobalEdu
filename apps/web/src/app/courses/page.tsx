import { redirect } from 'next/navigation';
import { ROUTES } from '@mge/config';

export default function CoursesPage() {
  redirect(ROUTES.findACourse);
}
