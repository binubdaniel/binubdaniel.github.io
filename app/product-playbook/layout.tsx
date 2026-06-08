import { metadata } from './metadata';
import { SiteHeader } from '@/components/site/SiteHeader';

export default function ProductPlaybookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  );
}

export { metadata };
