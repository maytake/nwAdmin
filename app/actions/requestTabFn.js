import * as Action from '../constants/requestTabFn.js'

export function editTableFn(fn) {
    return {
        type:Action.EDITTABLE,
        data:fn
    }
}
export function delTableFn(fn) {
    return {
        type:Action.DELTABLE,
        data:fn
    }
}
