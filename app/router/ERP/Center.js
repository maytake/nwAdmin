
const AreaManage = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../../containers/ERP/AreaManage').default)
	}, 'AreaManage')
}
export default {
	AreaManage
}