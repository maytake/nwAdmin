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
const DataManage = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../../containers/Center/DataManage').default)
	}, 'DataManage')
}
export default {
	JobManage,
	TableManage,
	DataManage
}