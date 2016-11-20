import * as _ from 'lodash';

import { LazyMoreFilter, Filter } from './lazy-more-filter';

// test data type
export interface User {
    name: string;
    age: number;
    sex: boolean;
    address?: string;
}

// test data
let data: User[] = [
    { name: 'Jack', age: 10, sex: true,  address: 'Luoyuan, Fuzhou, China'   },
    { name: 'Lomo', age: 11, sex: null,  address: 'Minhou, Fuzhou, China'    },
    { name: 'Neil', age: 13, sex: true,  address: 'Lianjian, Fuzhou, China'  },
    { name: 'Rive', age: 14, sex: false, address: 'Sibei, Xiamen, China'     },
    { name: 'Aice', age: 15, sex: true,  address: 'Tongan, Xiamen, China'    },
    { name: 'Fran', age: 16, sex: null,  address: 'Pudong, Shanghai, China'  },
    { name: 'Opet', age: 17, sex: false, address: 'Huinan, Shanghai, China'  },
    { name: 'Afff', age: 20, sex: true,  address: 'New York, US, America'    },
    { name: 'Hsda', age: 21, sex: false, address: 'Shaba, Jilongpo, Malaxiya'},
    { name: 'Sssa', age: 22, sex: true  },
    { name: 'Mary', age: 12, sex: true  },
    { name: 'Adds', age: 18, sex: true  },
    { name: 'Edds', age: 19, sex: null  },
    { name: 'Bsss', age: 23, sex: false },
    { name: 'Twsa', age: 24, sex: null  },
    { name: 'Asss', age: 25, sex: false },
    { name: 'Dsdf', age: 26, sex: false }
];

let filter1: Filter = { name: 'filter1', fields: ['name'], key: 'A', caseSensitive: false, wholeMatch: false }

let ageMatchFun =  (fieldValues, key) => {
    if(fieldValues[0] > key.min && fieldValues[0] < key.max) {
        return true;
    }
    return false;
}

let filter2: Filter = { name: 'filter2', fields: ['age'], key: { max: 25, min: 10 }, matchFun: ageMatchFun }

let filter3: Filter = { name: 'filter3', fields: ['name', 'address'], key: 'u', allFiledsMatch: false, priority: 1 }

let filter4: Filter = { name: 'filter4', fields: ['sex'], key: true, allFiledsMatch: true, priority: -1}

let filter5: Filter = { name: 'filter5', fields: ['address'], key: 'Tongan, Xiamen, China', wholeMatch: true, caseSensitive: true, allFiledsMatch: true }

let filter6: Filter = { name: 'filter6' , fields: [], key: null }

let filter7: Filter = { name: 'filter7', fields: ['sex'], key: 'true', wholeMatch: true, matchFun: ageMatchFun}

let filter8: Filter = { name: 'filter4', fields: ['sex'], key: null, allFiledsMatch: false, priority: 1}

let addressMatchFun =  (fieldValues, key) => {
    let address: string = fieldValues[0];
    if(!address) {
        return false;
    }
    let keyItems: string = key.split(' ');
    let result = true;
    _.forEach(keyItems, (keyItem) => {
        if(address.indexOf(keyItem) == -1) {
            result = false;
            return;
        }
    });
    return result;
}

let filter9: Filter = { name: 'filter9', fields: ['address'], key: 'Luoyuan China', matchFun: addressMatchFun }

// ...

function test() {

    // example
    let lazyMoreFilter = new LazyMoreFilter(data);
    lazyMoreFilter.addFilter(filter1)
                  .addFilter(filter2)
                  .removeFilter('filter1')
                  .addFilter(filter3)
                  .addFilter(filter4)
                  .removeFilter('filter5')
                  .removeFilter('filter3')
                  .addFilter(filter5)
                  .removeAllFilters()
                  .addFilter(filter6)
                  .addFilter(filter7)
                  .addFilter(filter4).addFilter(filter8)
                  .removeAllFilters()
                  .addFilter(filter2)
                  .removeAllFilters()
                  .addFilter(filter9)
                  .removeAllFilters().printInfo();
}

test();
