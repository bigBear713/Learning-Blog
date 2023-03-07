## Pick
- 从源类型中选取部分属性，得到一个新的类型
- 和`Omit`相反
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

type MyFilterDropdownProps = Pick<FilterDropdownProps, 'selectedKeys' | 'setSelectedKeys'>
// 等价于
interface MyFilterDropdownProps {
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedKeys: React.Key[];
}
```