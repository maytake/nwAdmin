const JobManage = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../../containers/Center/JobManage').default)
	}, 'JobManage')
}
const TableManage = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../../containers/Center/TableManage').default)
	}, 'TableManage')
}
export default {
	JobManage,
	TableManage
}