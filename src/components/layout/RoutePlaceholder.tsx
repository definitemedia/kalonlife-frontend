type RoutePlaceholderProps = {
  title: string;
};

export function RoutePlaceholder({ title }: RoutePlaceholderProps) {
  return (
    <div className="container page-shell">
      <h1>{title}</h1>
    </div>
  );
}
