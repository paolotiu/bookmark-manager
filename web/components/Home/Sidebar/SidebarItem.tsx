interface SidebarItemProps {
    icon?: any;
    label: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export type SidebarItemType = 'folder' | 'account';
const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => {
    return (
        <button
            className="grid items-center justify-center px-2 py-1 pl-4 text-sm hover:bg-hoverColor"
            style={{ gridTemplateColumns: '20px 1fr' }}
            onClick={onClick}
            type="button"
        >
            <div className="flex items-center justify-center text-inactiveSidebar"> {icon}</div>
            <div className="ml-[10px] font-normal pt-[3px] text-inactiveSidebar">{label}</div>
        </button>
    );
};

export default SidebarItem;
