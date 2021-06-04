interface SidebarItemProps {
    icon?: any;
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type SidebarItemType = 'folder' | 'account';
const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => {
    return (
        <button className="flex w-full px-2 py-1 pl-4 hover:bg-hoverColor no-outline" onClick={onClick} type="button">
            <div
                className="grid items-center justify-center text-sm "
                style={{ gridTemplateColumns: '20px minmax(0px,1fr)' }}
            >
                <div className="flex items-center justify-center text-inactiveSidebar"> {icon}</div>
                <div className="ml-[10px] font-normal  text-inactiveSidebar">{label}</div>
            </div>
        </button>
    );
};

export default SidebarItem;
