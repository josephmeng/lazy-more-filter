import * as _ from 'lodash';

export class LazyMoreFilter {
    private printIndent: number;
    private data: any[];
    private filters: Filter[] = [];

    constructor(data: any[], printIndent?: number) {
        this.setData(data);
        this.printIndent = printIndent || 4;
    }

    public resetData(data: any[]) {
        this.setData(data);
        return this;
    }

    public addFilter(newFilter: Filter) {
        if(this.isValidFilter(newFilter)) this.replaceOrInsert(newFilter);
        return this;
    }

    public removeFilter(name: string) {
        _.remove(this.filters, (filter) => { return filter.name == name });
        return this;
    }

    public removeAllFilters() {
        this.filters = [];
        return this;
    }

    public getFilteredData() {
        return this.filter().value();
    }

    private setData(data: any[]) {
        if(_.isNil(data)) { data = []; }
        this.data = data;
    }

    private isValidFilter(filter: Filter) {
        if(_.isNil(filter.name) || _.isNil(filter.fields)) return false;
        if(!filter.name || !filter.fields || !filter.fields.length) return false;

        let _c1 = _.isNil(filter.matchFun);
        let _c2 = _.isNil(filter.caseSensitive);
        let _c3 = _.isNil(filter.wholeMatch);
        let _c4 = _.isNil(filter.allFiledsMatch);
        if((!_c1) && (!_c2 || !_c3 || !_c4)) return false;
        if(_c1 && _c2 && _c3 && _c4) return false;
        
        return true;
    }

    private replaceOrInsert(newFilter: Filter) {
        newFilter.priority = newFilter.priority || 0;
        let existentFilter = _.find(this.filters, ['name', newFilter.name]);
        if(existentFilter) { // replace
            existentFilter = newFilter;
        } else { // insert
            this.filters.push(newFilter);
            this.filters = _.orderBy(this.filters, ['priority'], ['desc']);
        }
    }

    private filter() {
        let filterProcess = _.chain(this.data);
        _.forEach(this.filters, (filter) => {
            filterProcess = filterProcess.filter((data) => {
                let fieldValues = filter.fields.map(field => data[field]);
                if(!_.isNil(filter.matchFun)) {
                    return filter.matchFun(fieldValues, filter.key);
                } else {
                    return this.match(filter, fieldValues);
                }
            });
            let sortFields = filter.sortFields;
            let sortOrders = filter.sortOrders || [];
            if(this.isValidSortParms(sortFields, sortOrders)) {
                filterProcess = filterProcess.orderBy<string>(sortFields, sortOrders);
            }
        });
        return filterProcess;
    }

    private match(filter: Filter, fieldValues: any[]) {
        let fieldValuesStrs = _.map(fieldValues, this.caseToString);
        let keyStr = this.caseToString(filter.key);
        if(filter.caseSensitive) {
            fieldValuesStrs = _.map(fieldValuesStrs, (field) => { return field.toUpperCase() });
            keyStr = keyStr.toUpperCase();
        }
        let results = [];
        _.forEach(fieldValuesStrs, (fieldValueStr) => {
            if(filter.wholeMatch) {
                results.push(fieldValueStr == keyStr);
            } else {
                results.push(fieldValueStr.trim().indexOf(keyStr.trim()) != -1 ? true : false);
            }
        });
        if(filter.allFiledsMatch) {
            return results.reduce((r1, r2) => { return r1 && r2 } )
        }
        return results.reduce((r1, r2) => { return r1 || r2 });
    }

    private isValidSortParms(sortFields: string[], sortOrders: string[]) {
        if(_.isNil(sortFields) || !sortFields.length || (sortOrders.length > sortFields.length)) {
            return false;
        }
        return true;
    }

    public printFilteredData() {
        this.print('FilteredData', this.getFilteredData());
        return this;
    }

    public printFilters() {
        this.print('Filters', this.filters);
        return this;
    }

    public printInfo(){
        this.printFilteredData().printFilters();
        return this;
    }

    private print(type: string, data2Print: any[]) {
        console.log(type);
        console.log(JSON.stringify(data2Print, null, this.printIndent));
        console.log('result: ' + data2Print.length + ' records.');
    }

    private caseToString(value: any) {
        if(_.isNil(value)) {
            return '';
        }
        return '' + value;
    }
}

export interface Filter {
    priority?: number;
    name: string;
    fields: string[];
    key: any;
    sortFields?: string[]; // e.g. ['name', 'age]
    sortOrders?: string[]; // e.g. ['asc', 'desc']
    // basic type filter conditions
    allFiledsMatch? :boolean;
    caseSensitive?: boolean;
    wholeMatch?: boolean;
    // custom type filter condition
    matchFun?: (fieldValues: any[], key: any) => boolean;
    // sort data
}