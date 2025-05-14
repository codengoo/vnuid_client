interface ISimpleSelectItemProps {
  title: string;
  description: string;
  onClick: () => void;
}

export function SimpleSuggestItem({
  description,
  onClick,
  title,
}: ISimpleSelectItemProps) {
  return (
    <div className="p-2 border border-transparent hover:border-gray-300 hover:bg-gray-100 cursor-pointer rounded-lg w-64">
      <div onClick={onClick}>
        <h3 className="text-gray-800 font-semibold">{title}</h3>
        <p className="text-gray-500 font-medium">{description}</p>
      </div>
    </div>
  );
}
