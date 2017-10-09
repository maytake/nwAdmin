//store 变量名称
export const USER_TOKEN = 'USER_TOKEN'
export const DEFAULTPARENT = 'DEFAULTPARENT'
export const DEFAULTCURRENT = 'DEFAULTCURRENT'

//登录的时候 用到的两个变量
export const INITPARENT = '4'
export const INITCURRENT = 'Organize'
export const CURMENU = 'CURMENU'




//保存当前选中的一级导航位置
export const CURFIRSTMENU = 'CURFIRSTMENU'

//分页配置
export const PAGECONF = {
	showTotal: function(total) {
		return `总计 ${total} 条记录`
	},
	defaultPageSize: 25,
	showQuickJumper: true,//快速跳转至
	showSizeChanger: true,
	pageSizeOptions: ['10', '25', '50', '100']
}