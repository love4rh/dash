import React from 'react';
import PropTypes from 'prop-types';

import MonacoEditor from 'react-monaco-editor';

import { isvalid, makeid } from '../common/tool.js';

import './Editor.css';



function getCode() {
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '',
    '<fetchMethod name="GranceNote_DGS">',
    '  <type>HTTP</type>',
    '  <path><![CDATA[https://c9609216.ipg.web.cddbp.net/webapi/xml/1.0/]]></path>',
    '  <parsingType>XML</parsingType>',
    '  <ignoreError>false</ignoreError>',
    '  <params>',
    '    <param name="backupAndRead"><![CDATA[true]]></param>',
    '    <param name="message"><![CDATA[<QUERIES>',
    '        <AUTH>',
    '          <CLIENT>7060480-83FA5ADA4D9439C4244D45BEC4FBC48B</CLIENT>',
    '          <USER>266924749544357922-55EE46C3E237FB4FF849158289A3E72A</USER>',
    '        </AUTH>',
    '        <QUERY CMD="TVGRIDBATCH_UPDATE">',
    '          <STATE_INFO>',
    '            <STATE_TYPE>TVPROVIDER_REGION-EU</STATE_TYPE>     ',
    '            <STAMP>0</STAMP>        ',
    '          </STATE_INFO>',
    '        </QUERY>',
    '      </QUERIES>]]></param>',
    '    <param name="requestMethod"><![CDATA[POST]]></param>',
    '  </params>',
    '  <ui>',
    '    <position x="398" y="13" />',
    '    <description><![CDATA[]]></description>',
    '  </ui>',
    '</fetchMethod>'
  ].join('\n');;
}


class AttributeEditor extends React.Component {
	static propTypes = {
    handleValueChange: PropTypes.func.isRequired,
    node: PropTypes.object,
    // height: PropTypes.number.isRequired,
    // width: PropTypes.number.isRequired,
  }

  constructor (props) {
    super(props);

    this.state = {
      code: getCode()
    }
  }

  onValueChange = (id, data) => {
    // console.log('onInputChange', idx, ev, data);
    this.props.handleValueChange(id, data);
  }

  editorDidMount = (editor, monaco) => {
    editor.focus();
  }

  editorWillMount = (monaco) => {
    // console.log(monaco, monaco.languages.getLanguages());

    // Register a new language
    monaco.languages.register({ id: 'mySpecialLanguage' });

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider('mySpecialLanguage', {
      tokenizer: {
        root: [
          [/\[error.*/, "custom-error"],
          [/\[notice.*/, "custom-notice"],
          [/\[info.*/, "custom-info"],
          [/\[[a-zA-Z 0-9:]+\]/, "custom-date"],
        ]
      }
    });

    // Define a new theme that contains only rules that match this language
    monaco.editor.defineTheme('myCoolTheme', {
      base: 'vs-dark',
      inherit: false,
      rules: [
        { token: '', foreground: 'D4D4D4' }, // <- default
        { token: 'custom-info', foreground: '808080' },
        { token: 'custom-error', foreground: 'ff0000', fontStyle: 'bold' },
        { token: 'custom-notice', foreground: 'FFA500' },
        { token: 'custom-date', foreground: '008800' },
      ]
    });

    // Register a completion item provider for the new language
    monaco.languages.registerCompletionItemProvider('mySpecialLanguage', {
      provideCompletionItems: () => {
        let suggestions = [{
          label: 'simpleText',
          kind: monaco.languages.CompletionItemKind.Text,
          documentation: 'description here',
          insertText: 'simpleText'
        }, {
          label: 'testing',
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: 'testing(${1:condition})'
        }, {
          label: 'ifelse',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: [
            'if (${1:condition}) {',
            '\t$0',
            '} else {',
            '\t',
            '}'
          ].join('\n'),
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'If-Else Statement'
        }];

        return { suggestions: suggestions };
      }
    });
  }

  onChange = (newValue, e) => {
    // console.log('onChange', newValue, e);
  }

  render () {
    const { node, height, width } = this.props;
    const attributes = [];

    if( isvalid(node) ) {
      attributes.push({ type:'text', value:node.name });
    }

    /*
    const tagList = [];

    for(let i = 0; i < attributes.length; ++i) {
      const a = attributes[i];
      tagList.push(<TextEditor key={makeid(6)} compId={'' + i} handleValueChange={this.onValueChange} value={a.value} />);
    } // */

  	/* return (
      <div className="attributeEditor" style={{ width:'100%', height:'100%' }}>
        <Form>
          { tagList.map((elem) => (elem)) }
        </Form>
      </div>
    ); // */

    const { code } = this.state;

    const options = {
      selectOnLineNumbers: true,
      minimap: {enabled: false},
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
      // suggestOnTriggerCharacters: true,
      // suggestSelection: 'recentlyUsedByPrefix'
    };

    // javascript vs-dark
    // language="mySpecialLanguage"
    // theme="myCoolTheme"

    return (
      <MonacoEditor
        width={'100%'}
        height={height - 30}
        language="xml"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
        editorWillMount={this.editorWillMount}
      />
    );
  }
}

export default AttributeEditor;
export { AttributeEditor };
