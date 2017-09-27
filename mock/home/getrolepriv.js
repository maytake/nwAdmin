module.exports = {
	"resultId": 1,
	"resultMsg": "请求成功",
	"resultData": {
		"fixed": {
			"p": 1,
			"pagesize": 20
		},
		"data": [{
			"id": "65", //id
			"title": "", //标题
			"m": "home",
			"c": "",
			"index": "",
			"a": "",
			"parent_id": "0", //父节点id
			"sort_order": "0",
			"status": "1",
			"create_time": "0",
			"update_time": "0",
			"child": [ //子节点列表

			],
			"is_select": 0 //是否选中
		}, {
			"id": "3",
			"title": "CRM",
			"m": "home",
			"c": "crm_c",
			"index": "",
			"a": "crm_a",
			"parent_id": "0",
			"sort_order": "0",
			"status": "1",
			"create_time": "0",
			"update_time": "0",
			"child": [

			],
			"is_select": 0
		}, {
			"id": "2",
			"title": "ERP",
			"m": "home",
			"c": "erp_c",
			"index": "",
			"a": "erp_a",
			"parent_id": "0",
			"sort_order": "0",
			"status": "1",
			"create_time": "0",
			"update_time": "0",
			"child": [

			],
			"is_select": 1
		}, {
			"id": "1",
			"title": "OA",
			"m": "home",
			"c": "oa_c",
			"index": "",
			"a": "oa_a",
			"parent_id": "0",
			"sort_order": "0",
			"status": "1",
			"create_time": "0",
			"update_time": "0",
			"child": [{
					"id": "6",
					"title": "人事管理",
					"m": "home",
					"c": "human_c",
					"index": "",
					"a": "human_a",
					"parent_id": "1",
					"sort_order": "0",
					"status": "1",
					"create_time": "0",
					"update_time": "0",
					"child": [{
						"id": "60",
						"title": "我的薪资",
						"m": "home",
						"c": "salary",
						"index": "",
						"a": "getselfsalaryinfo",
						"parent_id": "6",
						"sort_order": "0",
						"status": "1",
						"create_time": "0",
						"update_time": "0",
						"child": [

						],
						"is_select": 0
					}, {
						"id": "59",
						"title": "薪资管理",
						"m": "home",
						"c": "salary",
						"index": "",
						"a": "getsalarylist",
						"parent_id": "6",
						"sort_order": "0",
						"status": "1",
						"create_time": "0",
						"update_time": "0",
						"child": [{
							"id": "64",
							"title": "编辑薪资信息",
							"m": "home",
							"c": "salary",
							"index": "",
							"a": "editsalary",
							"parent_id": "59",
							"sort_order": "0",
							"status": "1",
							"create_time": "0",
							"update_time": "0",
							"child": [

							],
							"is_select": 0
						}, {
							"id": "63",
							"title": "查看薪资信息",
							"m": "home",
							"c": "salary",
							"index": "",
							"a": "getsalaryinfo",
							"parent_id": "59",
							"sort_order": "0",
							"status": "1",
							"create_time": "0",
							"update_time": "0",
							"child": [

							],
							"is_select": 0
						}, {
							"id": "62",
							"title": "导出薪资",
							"m": "home",
							"c": "salary",
							"index": "",
							"a": "export",
							"parent_id": "59",
							"sort_order": "0",
							"status": "1",
							"create_time": "0",
							"update_time": "0",
							"child": [

							],
							"is_select": 0
						}, {
							"id": "61",
							"title": "导入薪资",
							"m": "home",
							"c": "salary",
							"index": "",
							"a": "import",
							"parent_id": "59",
							"sort_order": "0",
							"status": "1",
							"create_time": "0",
							"update_time": "0",
							"child": [

							],
							"is_select": 0
						}],
						"is_select": 0
					}],
					"is_select": 0
				}

			],
			"is_select": 1
		}]
	}
}