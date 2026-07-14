interface PortalPageProps {
  title: string;
  description: string;
}

export function PortalPage({ title, description }: PortalPageProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="premium-card p-8 text-center">
        <p className="text-muted-foreground text-sm">
          This module is scaffolded for Phase 1. Full CRUD functionality will be available in the next sprint.
        </p>
      </div>
    </div>
  );
}
