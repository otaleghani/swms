import { SidebarTrigger } from "../../components/sidebar";

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
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center border-r mr-3">
          <SidebarTrigger className="mr-3" />
        </div>
        <Left />
      </div>
      <Right />
    </header>
  );
}
