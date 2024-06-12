import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";

export default function DashboardCard({ className, hrefLabel, title, href, subtitle }: {
  className: string,
  title: string,
  subtitle: string, hrefLabel: string, href: string
}) {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="max-w-lg leading-relaxed">
          {subtitle}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-end align-bottom">
        <Link to={href}>
          <Button>{hrefLabel}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
