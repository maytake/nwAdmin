import * as actionTypes from '../constants/centerinfo.js'
import { post } from '../fetch/post.js'
import { CURFIRSTMENU } from '../config/localStoreKey.js'

import base from '../util/base'
import localStore from '../util/localStore.js'

export function menu(data) {
    return {
        type: actionTypes.MEMU_DATA,
        data
    }
}

export function menuChange(data) {
    return {
        type: actionTypes.MENU_CHANGE,
        data
    }
}

//获取导航数据
export function getMenuData(session) {
    return dispatch => {
        return post('/home/index/getmenu').then(data => {
            base.handleResult(data, function(data) {
                let _data = data.resultData.data;
                let _firstMenu = [];
                let _secondMenu = {};
                let nowSecondMenu = [];
                _data.map((item, index) => {
                    if (item.index == localStore.getItem(CURFIRSTMENU)) {
                        nowSecondMenu = item.child;
                    }
                    _secondMenu[item.index] = item.child;
                })

                _firstMenu = _data;
                dispatch(menu({
                    firstMenu: _firstMenu,
                    storeMenu: _secondMenu,
                    secondMenu: nowSecondMenu
                }))
            })
        })
    }
}