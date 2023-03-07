## Omit 
- 从源类型中，移除某些属性，得到一个新的类型
```ts
interface FilterDropdownProps {
    prefixCls: string;
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedKeys: React.Key[];
    confirm: () => void;
    clearFilters?: () => void;
    filters?: ColumnFilterItem[];
    visible: boolean;
}

type MyFilterDropdownProps = Omit<FilterDropdownProps, 'selectedKeys' | 'setSelectedKeys'>
```