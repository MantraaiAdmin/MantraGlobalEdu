import { CityLandingPage, cityMetadata } from '@/components/content/city-landing';

export const metadata = cityMetadata('chennai');

export default function Page() {
  return <CityLandingPage slug="chennai" />;
}
