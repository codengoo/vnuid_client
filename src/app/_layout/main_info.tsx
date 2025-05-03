interface MainContentInfoProps {
  children: React.ReactNode | React.ReactNode[];
}

export function MainContentInfo({ children }: MainContentInfoProps) {
  return (
    <div className="space-y-8 h-full overflow-y-scroll overflow-x-hidden scroll">
      {children}
    </div>
  );
}
