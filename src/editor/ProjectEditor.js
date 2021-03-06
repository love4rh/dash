import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import { isvalid } from '../common/tool.js';

import { LayoutDivider, DividerDirection} from './LayoutDivider.js';

import { Tab } from '../component/Tab.js';

import GalleryView from './GalleryView.js';
import Workspace from './Workspace.js';

import AttributeEditor from './AttributeEditor.js';
import ScriptEditor from './ScriptEditor.js';
import ColumnViewer from './ColumnViewer.js';

import './Editor.css';



@inject('appData')
@observer
class ProjectEditor extends React.Component {
	static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      leftWidth: 250,
      rightWidth: 400,
      bottomHeight: 250,
      leftMiddle: 500,
    };

    this.handleTabClose = this.handleTabClose.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    /*
    const { appData } = nextProps;
    console.log('ProjectEditor NextProps', appData.sizeOfProject(), JSON.stringify(appData.getProject(0)));
    
    let { activeIndex } = this.state;

    const newState = {
      projectList: nextProps.projectList
    };

    if( istrue(nextProps.addingNew) ) {
      newState.activeIndex = nextProps.projectList.length - 1;
    } else if( nextProps.projectList.length === 1 || (activeIndex === -1 && nextProps.projectList.length > 0) ) {
      newState.activeIndex = 0;
    }

    this.setState(newState); // */
  }

  handleEvent = (type, param) => {
    /*
    const { appData } = this.props;
  	const { activeIndex } = this.state;

  	if( activeIndex < 0 ) {
  		console.log('ERROR: PROJECT NOT DEFINED.');
  		return;
  	}

  	if( type === C.evtSelectNode ) {
  		const prjData = appData.getProject(activeIndex);
  	} // */
  }

  handleTabChange = (tabIndex) => {
    // console.log('PE tabChange', tabIndex);

    this.props.appData.setActiveProject(tabIndex);

  	this.setState({
  		attributes: []
  	});
  }

  handleTabClose = (tabIndex) => {
    this.props.appData.removeProject(tabIndex);
  }

  handleValueChange = (propList) => {
    const { appData } = this.props;
    appData.setActiveNodePropList(propList);
  }

  // type: gallery, info
  handleLayoutChange = (type) => (f, t) => {
    console.log('Layout Change Event', f, t);

    let { leftWidth, rightWidth, bottomHeight, leftMiddle } = this.state;

    if( 'gallery' === type ) {
      leftWidth += t - f;
    } else if( 'property' === type ) {
      rightWidth -= t - f;
    } else if( 'info' === type ) {
      bottomHeight += t - f;
    } else if( 'leftMiddle' === type) {
      leftMiddle -= t - f;
    }

    this.setState({ leftWidth:leftWidth, bottomHeight:bottomHeight, rightWidth:rightWidth, leftMiddle:leftMiddle });
  }

  render () {
  	const { width, height, appData } = this.props;
  	const { leftWidth, rightWidth, bottomHeight, leftMiddle } = this.state;

    const dividerSize = 3;
    const activeIndex = appData.getActiveProjectIndex();

  	const
  		wsHeight = height - bottomHeight - 7 - dividerSize, // 22, IE에서 120정도 부족함. 원인 파악요.
  		wsWidth = width - leftWidth - rightWidth - dividerSize
  	;

    // console.log('ProjectEditor render', activeIndex, appData.sizeOfProject());

  	const workPanes = [];

    for(let i = 0; i < appData.sizeOfProject(); ++i) {
      const p = appData.getProject(i);
      workPanes.push({
        title: p.title,
        closeButton: true
      });
    }

    const activeProject = activeIndex >= 0 ? appData.getProject(activeIndex) : null;
    const activeNode = appData.getActiveNode();

  	return (
      <div className="editor" style={{ width, height }}>
        <div className="leftPane" style={{ flexBasis:`${leftWidth}px` }}>
          <div style={{ flexBasis:`${leftMiddle}px` }}>
        	  <GalleryView height={leftMiddle} />
          </div>
          <div style={{ flexBasis:`${dividerSize}px` }}>
            <LayoutDivider direction={DividerDirection.horizontal}
              size={dividerSize + 1}
              onLayoutChange={this.handleLayoutChange('leftMiddle')}
            />
          </div>
          <div style={{ flexBasis:`${height - leftMiddle - dividerSize}px` }}>
            <ColumnViewer key={'cview-' + (isvalid(activeNode) ? activeNode.id : 'null')}
              height={height - leftMiddle - dividerSize}
              node={activeNode}
            />
          </div>
        </div>
        <div style={{ flexBasis:`${dividerSize}px` }}>
          <LayoutDivider direction={DividerDirection.vertical}
            size={dividerSize}
            onLayoutChange={this.handleLayoutChange('gallery')}
          />
        </div>
        <div className="middlePane" style={{ flexBasis:`${wsWidth}px` }}>
        	<div className="mainPane" style={{ flexBasis:`${wsHeight}px` }}>
        		<Tab activeTab={activeIndex}
              onTabChange={this.handleTabChange}
              onTabClose={this.handleTabClose}
              panes={workPanes}
            />
            <div className="workspace" style={{ width:wsWidth, height:wsHeight }}>
              { isvalid(activeProject) &&
                (<Workspace
                  key={'ws-' + activeIndex + '/' + activeProject.pid}
                  pid={activeProject.pid}
                  width={wsWidth} height={wsHeight}
                />)
              }
            </div>
        	</div>
          <div style={{ flexBasis:`${dividerSize}px` }}>
            <LayoutDivider direction={DividerDirection.horizontal}
              size={dividerSize + 1}
              onLayoutChange={this.handleLayoutChange('info')}
            />
          </div>
        	<div className="bottomPane" style={{ flexBasis:`${bottomHeight}px` }}>
            <ScriptEditor
              height={bottomHeight}
              handleValueChange={this.handleValueChange}
            />
        	</div>
        </div>
        <div style={{ flexBasis:`${dividerSize}px` }}>
          <LayoutDivider direction={DividerDirection.vertical}
            size={dividerSize}
            onLayoutChange={this.handleLayoutChange('property')}
          />
        </div>
        <div className="rightPane" style={{ flexBasis:`${rightWidth}px` }}>
          <AttributeEditor
            height={height}
            width={rightWidth}
            node={activeNode}
            handleValueChange={this.handleValueChange}
          />
        </div>
      </div>
    );
  }
}

export default ProjectEditor;
export { ProjectEditor };
