const JobManage = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../../containers/Center/JobManage').default)
	}, 'JobManage')
}

export default {
	JobManage
}
