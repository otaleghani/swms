interface HeaderWrapperProps {
  Left: React.FunctionComponent;
  Right: React.FunctionComponent
}

export default function HeaderWrapper({
  Left,
  Right,
}: HeaderWrapperProps) {
  return (
    <header className="border-b p-4 h-[57px] flex items-center justify-between bg-background z-10">
      <Left />
      <Right />
    </header>
  );
}
