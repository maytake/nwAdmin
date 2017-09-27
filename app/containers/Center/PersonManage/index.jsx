import React from 'react'

import {
  Link
} from 'react-router'
import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'
import {
  is,
  fromJS
} from 'immutable';
import {
  Modal,
  Icon,
  Button,
  Table,
  message,
  Tooltip,
} from 'antd';
import {
  USER_TOKEN,
  PAGECONF
} from '../../../config/localStoreKey.js'
import Base from '../../../util/base.js'

import * as AllDataAction from '../../../actions/centerinfo'
import * as Request from '../../../fetch/center/index.js'

import SearchWrap from './subPage/PersonSearch'
import PersonAdd from './subPage/PersonAdd'
import PersonFile from './subPage/PersonFile'
import PersonBat from './subPage/PersonBat'



class PersonManage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      oriUrl: '/home/member/export',
      downUrl: '/home/member/export?token=' + Base.getItem(USER_TOKEN),
      role_id: '',
      department_id: '',
      keyword: "",
      data: [],
      pagination: PAGECONF,
      loading: false,
      isVisible: false, //控制编辑窗口的现实隐藏
      actionType: "add",
      isPowerName: '0', //是否有编辑名字的权限
      selectedData: [], //获取勾选的数据
      record: {} //单行当数据
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
  }

  //显示指定的容器并且存值
  editUsrInfo(type, record) {
    var that = this;
    if (type == "add") {

      this.setState({
        actionType: type,
        record: {},
        isVisible: true
      })
    } else {
      this.setState({
        actionType: type,
        record,
        isVisible: true
      })
    }
  }



  componentDidMount() {
    //设置高度
    this.props.getTreeData();
    this.props.getGWData();
    this.getPersonListData();
  }



  //重置密码
  resetPwd(str) {
    Modal.confirm({
      title: '系统提示',
      content: '确定重置该员工的密码吗？确认之后密码将为初始密码:HExin888',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        Request.resetPwd({
          "member_uuid": str
        }).then(data => {
          Base.handleResult(data, function(data) {})
        })
      }
    });
  }

  //设置用户状态
  restUserPower(status, uuid) {
    let _str = status == "0" ? "确定启用该员工的账号吗？ 确认之后员工将可以登录到系统。" : "确定禁用该员工的账号吗？确认之后员工将无法再登录到系统。";
    var that = this;
    Modal.confirm({
      title: '系统提示',
      content: _str,
      okText: '确定',
      cancelText: '取消',
      onOk() {
        Request.setMemeberStatus({
          "member_uuid": uuid
        }).then(data => {
          Base.handleResult(data, function(data) {
            that.getPersonListSearch();
          })
        })
      }
    });
  }

  //每次修改的时候 都会把查询的状态值 以及 下载链接 重新更新
  onChangeSearch(values) {
    let arr = ['?token=' + Base.getItem(USER_TOKEN)];
    let downUrl = this.state.oriUrl;
    let dep = values.department_id ? values.department_id : "0";
    let role = values.role_id ? values.role_id : "";
    let key = values.keyword ? values.keyword : "";
    let isDim = values.is_dim ? "0" : "1";

    arr.push('is_dim=' + isDim);
    if (dep)
      arr.push('department_id=' + dep);
    if (role)
      arr.push('role_id=' + role);
    if (key)
      arr.push('keyword=' + key);
    if (arr.length > 0)
      downUrl = downUrl.concat(arr.join("&"))


    let pager = Object.assign({}, this.state.pagination, {
      current: 1,
    });

    this.setState({
      department_id: dep,
      role_id: role,
      keyword: key,
      is_dim: isDim,
      downUrl: downUrl,
      pagination: pager
    }, () => {
      this.getPersonListSearch()
    })
  }

  //页面切换的时候 修改完分页之后 在进行查询
  handleTableChange(pagination) {

    let pager = Object.assign({}, this.state.pagination, {
      current: pagination.current,
      pageSize: pagination.pageSize
    });

    this.setState({
      pagination: pager
    }, () => {
      this.getPersonListSearch();
    });

  }

  closeUsrInfo() {
    this.setState({
      isVisible: false,
    })
  }

  //点击查询的时候调用的  每次查询 都会执行一次 onChangeSearch  会改变当前state的值
  getPersonListSearch() {
    const {
      pagination,
      department_id,
      is_dim,
      role_id,
      keyword
    } = this.state;

    this.getPersonListData({
      pagesize: pagination.pageSize,
      p: pagination.current,
      department_id: department_id,
      is_dim: is_dim,
      role_id: role_id,
      keyword: keyword
    });
  }

  //获取用户列表  第一次使用的时候 什么都不传
  getPersonListData(params = {}) {
    var that = this;
    this.setState({
      loading: true,
    });
    Request.getMemberList(params).then(data => {
      Base.handleResult(data, function(data) {
        let Global = data.resultData;
        let pager = Object.assign({}, that.state.pagination, {
          total: parseInt(Global.data.count)
        })
        that.setState({
          loading: false,
          data: Global.data.list,
          isPowerName: Global.data.button_control.edit_name,
          pagination: pager
        });
      })
    })
  }
  render() {
    const columns = [{
      title: '工号',
      width: 100,
      dataIndex: 'job_id',
      key: 'job_id',
    }, {
      title: '姓名',
      width: 100,
      dataIndex: 'member_name',
      key: 'member_name',
    }, {
      title: '部门',
      dataIndex: 'department_name',
      key: 'department_name',
      width: 150
    }, {
      title: '岗位',
      dataIndex: 'role_name',
      key: 'role_name',
      width: 150
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 150
    }, {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
      width: 150
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        return (
          text == "1" ? "启用" : "禁用"
        )
      },
      width: 150
    }, {
      title: '操作',
      key: 'uuid',
      width: 100,
      render: (text, record, index) => {
        const status_tip = record.status == "0" ? "启用" : "禁用";
        const status_str = record.status == "0" ? "play-circle" : 'pause-circle';
        let _url = "/JobPower/person/" + record.uuid;
        return (
          <div>
             <Tooltip placement="top" title='重置密码'>
               <Icon type="retweet" onClick={this.resetPwd.bind(this,record.uuid)} size="large" style={{ fontSize: 16 ,marginRight:5}}/>
             </Tooltip>
             <Tooltip placement="top" title='编辑'>
                 <Icon type="edit" onClick={this.editUsrInfo.bind(this,"edit",record)}   style={{ fontSize: 16 ,marginRight:5}}/>
             </Tooltip>
             <Tooltip placement="top" title={status_tip}>
               <Icon type={status_str} onClick={this.restUserPower.bind(this,record.status,record.uuid)} style={{ fontSize: 16 ,marginRight:5}}/>
             </Tooltip>
             <Tooltip placement="top" title='设置权限'>
               <Link to={_url} style={{ "color" : "rgba(0, 0, 0, 0.65)"}}><Icon type="link" style={{ fontSize: 16 ,marginRight:5}}/></Link>
             </Tooltip>
           </div>
        );
      }
    }];
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        let arr = [];
        selectedRows.map(item => {
          arr.push(item.uuid);
        })
        this.setState({
          selectedData: arr.join(",")
        })
      }
    };
    return (
      <div>
          <SearchWrap 
             onChangeSearch={this.onChangeSearch.bind(this)} 
          />

         <div style={{marginBottom:10}}>
            <PersonAdd 
              getDataList = {this.getPersonListSearch.bind(this)}    
              visible = {this.state.isVisible}
              closeWin = {this.closeUsrInfo.bind(this)}
              showWin = {this.editUsrInfo.bind(this)}
              record = {this.state.record}
              actionType = {this.state.actionType}
              isPowerName = {this.state.isPowerName}
            />
            <PersonFile 
              downUrl = {this.state.downUrl}
            />
            <PersonBat
              rowData = {this.state.selectedData}
              getDataList = {this.getPersonListSearch.bind(this)}   
            />
         </div>
         <Table 
              bordered
              columns={columns}  
              rowKey={record => record.uuid}
              rowSelection={rowSelection}
              dataSource={this.state.data}
              pagination={this.state.pagination} 
              loading={this.state.loading}
              onChange={this.handleTableChange.bind(this)}
              scroll={{ x: '100%', y: '100%' }}    
          />
      </div>
    )
  }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    getTreeData: bindActionCreators(AllDataAction.getTreeData, dispatch),
    getGWData: bindActionCreators(AllDataAction.getGWData, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonManage)