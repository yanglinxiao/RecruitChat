/**
 *
 * @param type:用户类型
 * @param avatar:用户头像
 * @returns {string}:下一个要跳转到的页面地址
 */
export function getRedirectPath({type,avatar}){
    let url = (type === "boss") ? '/boss' : '/genius';
    if(!avatar){
        url += 'info';
    }
    return url;
}

/**
 *
 * @param userid:自身id
 * @param targetid:对方id
 * @returns {string}:聊天id
 */
export function getChatId(userid,targetid) {
    return [userid,targetid].sort().join('_');
}
