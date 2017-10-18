import React from 'react'
import { Button, Row, Col,  } from 'antd';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import AddForm from '../../../components/Form/TableForm.jsx'
class AreaManage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        	<div>
           
		  <AddForm/>
		   <Row type="flex" justify="end" gutter={16}>
		  	<Col span={3}>
		  		<Button type="primary">提交</Button>
		  		<Button 
		  			style={{
                                marginRight: 6,
                                marginLeft: 6
                            }} >取消</Button>
		  	</Col>
		  </Row>
		  </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export 
// export default NotFound
export default AreaManage