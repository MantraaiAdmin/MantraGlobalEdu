import { CityLandingPage, cityMetadata } from '@/components/content/city-landing';

export const metadata = cityMetadata('coimbatore');

export default function Page() {
  return <CityLandingPage slug="coimbatore" />;
}
