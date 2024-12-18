
export const grouper = (data, groupingParam) => (data ?? {}).reduce((groups, item) => {
    const group = (groups[item[groupingParam]] || []);
    group.push(item);
    groups[item[groupingParam]] = group;

    return groups;
}, {});