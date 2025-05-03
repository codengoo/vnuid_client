interface HeaderInfoProps {
  children: React.ReactNode | React.ReactNode[];
}

export function HeaderContentInfo({ children }: HeaderInfoProps) {
  return (
    <div className="bg-gray-100 border border-gray-300 p-4 rounded-xl space-y-4">
      {children}
    </div>
  );
}
