import React from 'react'
import {
	connect
} from 'react-redux'
import {
	is,
	fromJS
} from 'immutable';

import {
	Form,
	Row,
	Col,
	Input,
	Modal,
	Button,
	TreeSelect,
	Select,
	Checkbox
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;



class SearchWrap extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			is_dim: false
		}

	}
	handleSearch(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			values.is_dim = this.state.is_dim;
			this.props.onChangeSearch(values); //改变搜索值给父组件用
		});
	}

	onChangeCheck(e) {
		this.setState({
			is_dim: e.target.checked
		})
	}

	restSearchForm() {
		this.setState({
			is_dim: false,
		});
		this.props.form.setFieldsValue({
			role_id: "",
			department_id: "",
			keyword: ""
		});

		this.props.onChangeSearch({
			role_id: "",
			department_id: "",
			keyword: "",
			is_dim: false,
		}); //改变搜索值给父组件用
	}
	render() {
		const treeData = this.props.tree_data;
		const gwData = this.props.gw_data;
		let ontreeDate = [],
			ongwData = [];
		if (!treeData || !gwData)
			return false;
		//给头部家全部选项
		if (gwData.zhiWeiData.length > 0) {
			ongwData = [{
				title: "全部",
				value: "0"
			}].concat(gwData.zhiWeiData);
		}
		let newTreeData = Object.assign({}, treeData);
		if (newTreeData.treeData.length > 0) {
			newTreeData.treeData[0].disabled = false;
			ontreeDate = [{
				label: "全部",
				value: "0",
				key: 0
			}].concat(newTreeData.treeData)
		}

		const {
			getFieldDecorator
		} = this.props.form;
		const formItemLayout = {
			labelCol: {
				span: 5
			},
			wrapperCol: {
				span: 19
			},
		};

		return (
			<Form className="ant-advanced-search-form" onSubmit={this.handleSearch.bind(this)} >
                <Row gutter={24} type="flex" justify="end">
                  <Col span={6} key="bumen">
                    <FormItem {...formItemLayout} label="部门">
                    {getFieldDecorator('department_id',{
                    	rules: [],
                    })(<TreeSelect
                    	  showSearch
                    	  treeNodeFilterProp = 'label'
                          style={{ width: '100%' }}
                          dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                          treeData={ontreeDate}
                          placeholder="选择部门"
                        />)
		        	}
                    </FormItem>
                  </Col>
                  <Col span={6} key="gangwei">
                    <FormItem {...formItemLayout} label="岗位">
                     {getFieldDecorator('role_id',{
                    	rules: [],
                    })(<Select 
                    	showSearch
						optionFilterProp="children"
                    	style={{ width: '100%' }}   
                    	placeholder="选择岗位"

                    	>
                    	{
                    		ongwData.map(item =>{
                    			return (
                    				<Option key={item.value} value={item.value}>{item.title}</Option>
                    			)
                    		})
                    	}
					    </Select>)}
                     </FormItem>
                  </Col>
                  <Col span={8} key="name">
                    <FormItem {...formItemLayout} >
                    <Row gutter={8}>
						<Col span={12}>
							  {getFieldDecorator('keyword',{
		                    	rules: [],
		                       })(<Input size="large" placeholder="请输入工号或者姓名" style={{height:"32px"}} /> 
		                      )} 
						</Col>
						<Col span={12}>
							<Checkbox checked ={this.state.is_dim} onChange={this.onChangeCheck.bind(this)}>工号精确查找</Checkbox>
						</Col>
                    </Row>
                   
                    </FormItem>
                  </Col>
                  <Col span={4} key="search" >
                  <div className="searchButton">
                  	<Button type="primary" htmlType="submit" style={{marginRight:4,marginLeft:4}} >查找</Button><Button onClick={this.restSearchForm.bind(this)} style={{marginRight:4,marginLeft:4}} >重置</Button>
                  	</div>
                  </Col>
                </Row>
             </Form>
		)
	}
}
const SearchWrapForm = Form.create()(SearchWrap);

function mapStateToProps(state) {
	let gwData = state.centerinfo.zhiwei_data;
	let treeData = state.centerinfo.tree_data;
	return {
		tree_data: treeData,
		gw_data: gwData
	}
}

function mapDispatchToProps(dispatch) {
	return {

	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchWrapForm)