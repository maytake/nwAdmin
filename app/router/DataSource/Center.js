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
const tableA = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../../containers/Center/CommonTable/tableA.jsx').default)
	}, 'tableA')
}
export default {
	JobManage,
	TableManage,
	tableA
}