
export interface AccessMenuVO {
  childMenu: AccessMenuVO[], // 下级菜单 
  createTime: number, // 创建时间 
  createUserId: number, // 添加人 
  menuId: number, // 菜单ID 
  name: string, // 菜单名字 
  parentId: number, // 父菜单id 
  row: number, // 权限组：每组设计30个权限 
  sign: string, // 权限标识：do|m|method|action 
  sort: number, // 排序规则 
  status: number, // 是否在菜单显示 
  systemId: number, // 系统id 
  target: number, // 打开方式 0不跳转，1新页面打开，2在框架中打开 
  type: number, // 菜单类型(0顶级菜单，1二级菜单，2操作项) 
  val: number, // 权限值 
}
export interface AccessQuery {
  menuIds: any[], // 菜单ID列表 
  roleId: number, // 角色ID 
}
export interface AccessRoleVO {
  create_time: number, // 创建时间 
  create_user_id: number, // 创建人id 
  description: string, // 角色描述 
  name: string, // 角色名称 
  role_id: number, // 主键ID 
  status: number, // 角色状态0禁用 1正常 
  system_id: number, // 系统id 系统id为0代表不单独属于任何一个子系统，可以共用 
  type: number, // 角色类型(99总系统管理员，拥有所有公司旗下的管理员权限，1子系统管理员，2混合管理员可能几个系统的权限集合为一身) 
  update_time: number, // 更新时间 
  vals: string, // 管理组权限:多组16进制数据用|分割 
}
export interface CheckVO {
  check: boolean, // 检查状态 
}
export interface CheckVerifyQuery {
  code: string, // 验证码 
  verifyid: string, // 验证id 
}
export interface EduUserVO {
  auth_key: string, // 密码加密用 
  create_time: number, // 创建时间 
  create_user_id: number, // 添加人 
  email: string, // 邮箱 
  full_name: string, // 真实姓名 
  groupid: number, // 用户组 
  islecturer: number, // 是否为讲师(0不是1是) 
  login_ip: string, // 最后登录ip 
  login_time: number, // 最后登录时间 
  mobile: string, // 手机号 
  mobile_zone: number, // 手机国际编码 
  orig: number, // 来源，0--网站，1--ipad端，2--iphone，3--安卓pad，4--安卓手机 
  password: string, // 用户密码 
  status: number, // 用户状态 
  study_coon: number, // 学习币 
  ucenter_id: number, // ucenter_id 
  ud_id: number, // 部门ID 
  ud_name: string, // 部门名称 
  user_id: number, // 用户id 
  username: string, // 用户名 
}
export interface LoginQuery {
  password: string, // 密码 
  username: string, // 用户名 
  verifyCode: string, // 图形验证码 
  verifyid: string, // 图形验证码id 
}
export interface OrderItem {
  asc: boolean,
  column: string,
}
export interface PageAccessRoleVO {
  countId: string,
  current: number,
  hitCount: boolean,
  maxLimit: number,
  optimizeCountSql: boolean,
  orders: OrderItem[],
  pages: number,
  records: AccessRoleVO[],
  searchCount: boolean,
  size: number,
  total: number,
}
export interface PageEduUserVO {
  countId: string,
  current: number,
  hitCount: boolean,
  maxLimit: number,
  optimizeCountSql: boolean,
  orders: OrderItem[],
  pages: number,
  records: EduUserVO[],
  searchCount: boolean,
  size: number,
  total: number,
}
export interface PageSystemVO {
  countId: string,
  current: number,
  hitCount: boolean,
  maxLimit: number,
  optimizeCountSql: boolean,
  orders: OrderItem[],
  pages: number,
  records: SystemVO[],
  searchCount: boolean,
  size: number,
  total: number,
}
export interface PublishedQuery {
  roleId: number, // 角色ID 
  status: number, // 状态 0 禁用 1 启用 
}
export interface R {
  code: number,
  data: undefined,
  msg: string,
  success: boolean,
}
export interface RecoverQuery {
  id: number, // ID 
}
export interface RemoveQuery {
  id: number, // id 
}
export interface RCheckVO {
  code: number,
  data: CheckVO,
  msg: string,
  success: boolean,
}
export interface RListAccessMenuVO {
  code: number,
  data: AccessMenuVO[],
  msg: string,
  success: boolean,
}
export interface RListEduUserVO {
  code: number,
  data: EduUserVO[],
  msg: string,
  success: boolean,
}
export interface RPageAccessRoleVO {
  code: number,
  data: PageAccessRoleVO,
  msg: string,
  success: boolean,
}
export interface RPageEduUserVO {
  code: number,
  data: PageEduUserVO,
  msg: string,
  success: boolean,
}
export interface RPageSystemVO {
  code: number,
  data: PageSystemVO,
  msg: string,
  success: boolean,
}
export interface RTokenVO {
  code: number,
  data: TokenVO,
  msg: string,
  success: boolean,
}
export interface RUpdateVO {
  code: number,
  data: UpdateVO,
  msg: string,
  success: boolean,
}
export interface RVerifyVO {
  code: number,
  data: VerifyVO,
  msg: string,
  success: boolean,
}
export interface SaveQuery {
  udDesc: string, // 部门介绍 
  udName: string, // 部门名称 
  udUids: string, // 部门经理逗号分隔 
}
export interface SystemVO {
  app_type: string, // app站点统计的类型，','分割 
  create_time: number, // 创建时间 
  create_user_id: number, // 创建人 
  describe: string, // 系统描述 
  domain: string, // 域名 
  edit_time: number, // 编辑时间 
  is_app_statistics: number, // 是否开通app站点统计 
  is_statistics: number, // 是否开通站点统计 
  key: string, // 系统key值 
  name: string, // 系统名称 
  status: number, // 系统状态 
  system_id: number, // 主键ID 
  url_change_rule: number, // url转换规则 
}
export interface TokenVO {
  token: string, // 凭证 
}
export interface UpdateQuery {
  id: number, // id 
  udDesc: string, // 部门介绍 
  udName: string, // 部门名称 
  udUids: string, // 部门经理逗号分隔 
}
export interface UpdateVO {
  update: boolean, // 更新状态 
}
export interface VerifyVO {
  image: string, // 验证码图片 
  imgCode: string, // 验证码code 
  verifyid: string, // 验证码ID 
}