export function applyFilters<T extends Object>(input: Array<T>, ...filters: Array<string | number>): Array<T> {
    return input.filter(it => {
        const keys = Object.keys(it);
        for(const key of keys) {
            if(filters.every(filter => !filter)) return true;
            // @ts-expect-error
            const propValue = it[key];
            if (propValue !== undefined && propValue !== null && filters.some(filter => !!filter)) {
                for(const filter of filters) {
                    if(
                        !filter ||
                        filter.toString().toUpperCase().includes(propValue.toString().toUpperCase()) ||
                        propValue.toString().toUpperCase().includes(filter.toString().toUpperCase())
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    });
}