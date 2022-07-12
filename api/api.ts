import {CheckVerifyQuery,
LoginQuery,
PublishedQuery,
RemoveQuery,
SaveQuery,
UpdateQuery,
AccessQuery,
RecoverQuery,
RCheckVO,
RVerifyVO,
RTokenVO,
R,
RPageEduUserVO,
RListEduUserVO,
RListAccessMenuVO,
RUpdateVO,
RPageAccessRoleVO,
RPageSystemVO} from "./interface";
import client from "./client";
 export function postAuthLoginCheckVerify(body: CheckVerifyQuery):Promise<RCheckVO> {

        return client.post('/auth/login/check-verify', body)
      }
 export function getAuthLoginGetVerify():Promise<RVerifyVO> {

        return client.get('/auth/login/get-verify', )
      }
 export function postAuthLoginLogin(body: LoginQuery):Promise<RTokenVO> {

        return client.post('/auth/login/login', body)
      }
 export function postAuthLoginLogout():Promise<R> {

        return client.post('/auth/login/logout', )
      }
interface GetBaseAdminUserListParams {
condition?:string,current?:number,endTime?:number,keyword?:string,roleId?:number,size?:number,startTime?:number,status?:number}
 export function getBaseAdminUserList(params: GetBaseAdminUserListParams):Promise<RPageEduUserVO> {

        return client.get('/base/admin-user/list', params)
      }
 export function postBaseAdminUserPublished(body: PublishedQuery):Promise<R> {

        return client.post('/base/admin-user/published', body)
      }
 export function postBaseAdminUserRemove(body: RemoveQuery):Promise<R> {

        return client.post('/base/admin-user/remove', body)
      }
 export function postBaseAdminUserSave(body: SaveQuery):Promise<R> {

        return client.post('/base/admin-user/save', body)
      }
 export function postBaseAdminUserUpdate(body: UpdateQuery):Promise<R> {

        return client.post('/base/admin-user/update', body)
      }
 export function getBaseLockAdminUserList():Promise<RListEduUserVO> {

        return client.get('/base/lock-admin-user/list', )
      }
 export function getBaseLockAdminUserRemove():Promise<R> {

        return client.get('/base/lock-admin-user/remove', )
      }
interface GetBaseMenuListParams {
systemId?:number}
 export function getBaseMenuList(params: GetBaseMenuListParams):Promise<RListAccessMenuVO> {

        return client.get('/base/menu/list', params)
      }
 export function postBaseMenuRemove(body: RemoveQuery):Promise<R> {

        return client.post('/base/menu/remove', body)
      }
 export function postBaseMenuSave(body: SaveQuery):Promise<R> {

        return client.post('/base/menu/save', body)
      }
 export function postBaseMenuUpdate(body: UpdateQuery):Promise<R> {

        return client.post('/base/menu/update', body)
      }
 export function postBaseRoleAccess(body: AccessQuery):Promise<RUpdateVO> {

        return client.post('/base/role/access', body)
      }
interface GetBaseRoleFrozenListParams {
condition?:string,current?:number,endTime?:number,keyword?:string,size?:number,startTime?:number,systemId?:number}
 export function getBaseRoleFrozenList(params: GetBaseRoleFrozenListParams):Promise<RPageAccessRoleVO> {

        return client.get('/base/role/frozen-list', params)
      }
interface GetBaseRoleListParams {
condition?:string,current?:number,endTime?:number,keyword?:string,size?:number,startTime?:number,status?:number,systemId?:number}
 export function getBaseRoleList(params: GetBaseRoleListParams):Promise<RPageAccessRoleVO> {

        return client.get('/base/role/list', params)
      }
 export function postBaseRolePublished(body: PublishedQuery):Promise<R> {

        return client.post('/base/role/published', body)
      }
 export function postBaseRoleSave(body: SaveQuery):Promise<R> {

        return client.post('/base/role/save', body)
      }
 export function postBaseRoleUpdate(body: UpdateQuery):Promise<R> {

        return client.post('/base/role/update', body)
      }
interface GetBaseSystemListParams {
condition?:string,current?:number,keyword?:string,size?:number,status?:number}
 export function getBaseSystemList(params: GetBaseSystemListParams):Promise<RPageSystemVO> {

        return client.get('/base/system/list', params)
      }
 export function postBaseSystemPublished(body: PublishedQuery):Promise<RUpdateVO> {

        return client.post('/base/system/published', body)
      }
 export function postBaseSystemSave(body: SaveQuery):Promise<R> {

        return client.post('/base/system/save', body)
      }
 export function postBaseSystemUpdate(body: UpdateQuery):Promise<R> {

        return client.post('/base/system/update', body)
      }
 export function postBaseUserDeptRecover(body: RecoverQuery):Promise<R> {

        return client.post('/base/user-dept/recover', body)
      }
 export function postBaseUserDeptRemove(body: RemoveQuery):Promise<R> {

        return client.post('/base/user-dept/remove', body)
      }
 export function postBaseUserDeptSave(body: SaveQuery):Promise<R> {

        return client.post('/base/user-dept/save', body)
      }
 export function postBaseUserDeptUpdate(body: UpdateQuery):Promise<R> {

        return client.post('/base/user-dept/update', body)
      }
export default {
 postAuthLoginCheckVerify,
getAuthLoginGetVerify,
postAuthLoginLogin,
postAuthLoginLogout,
getBaseAdminUserList,
postBaseAdminUserPublished,
postBaseAdminUserRemove,
postBaseAdminUserSave,
postBaseAdminUserUpdate,
getBaseLockAdminUserList,
getBaseLockAdminUserRemove,
getBaseMenuList,
postBaseMenuRemove,
postBaseMenuSave,
postBaseMenuUpdate,
postBaseRoleAccess,
getBaseRoleFrozenList,
getBaseRoleList,
postBaseRolePublished,
postBaseRoleSave,
postBaseRoleUpdate,
getBaseSystemList,
postBaseSystemPublished,
postBaseSystemSave,
postBaseSystemUpdate,
postBaseUserDeptRecover,
postBaseUserDeptRemove,
postBaseUserDeptSave,
postBaseUserDeptUpdate}
;