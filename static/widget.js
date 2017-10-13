(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var React$2=Serverboards.React;
var Heatmap=React$2.createClass({displayName:"Heatmap",propTypes:{data:React$2.PropTypes.object.isRequired,xaxis:React$2.PropTypes.array.isRequired,yaxis:React$2.PropTypes.array.isRequired,xshow:React$2.PropTypes.func,yshow:React$2.PropTypes.func},render:function render(){function a(){var l=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;return Math.round(g*Math.log(l))}var b=this.props,c=Math.max.apply(null,Object.values(b.data)),e=Object.keys(b.data);e.sort();var f=b.data;console.log("Max val is %o",c);var g=4/Math.log(c),h=b.xshow||function(l){return l},j=b.yshow||function(l){return l};return React$2.createElement("div",{className:"ui heatmap"},React$2.createElement("table",null,React$2.createElement("tbody",null,React$2.createElement("tr",null,React$2.createElement("td",null),b.xaxis.map(function(l,m){return React$2.createElement("td",{className:"column header",key:l},h(l,m))})),b.yaxis.map(function(l,m){return React$2.createElement("tr",{key:l},React$2.createElement("td",{className:"row header"},j(l,m)),b.xaxis.map(function(n){return[n,l]}).map(function(n){return React$2.createElement("td",{key:n},React$2.createElement("span",{className:"cell color"+a(f[n]),title:n[0]+" "+n[1]+":\n "+(f[n]||0)}))}))}))))}});

var _Serverboards=Serverboards;
var React$1=_Serverboards.React;
var rpc=_Serverboards.rpc;
var moment=_Serverboards.moment;
var store=_Serverboards.store;
var LogMap=React$1.createClass({displayName:"LogMap",getInitialState:function getInitialState(){moment().subtract(1,"months");var a=store.getState().project.daterange;return{data:{},maxv:0,start:a.start,end:a.end}},load_more:function load_more(_ref){var a=_ref.start,b=this;rpc.call("logs.list",{start:a,count:10000}).then(b.update_heatmap)},update_heatmap:function update_heatmap(_ref2){var _this=this,a=_ref2.lines,b=void 0;0<a.length?function(){var f=a[a.length-1];moment(f.timestamp)>_this.state.start?(_this.load_more({start:f.id}),b=!1):(a=a.filter(function(g){return moment(f.timestamp)<_this.state.start}),b=!0)}():b=!0;var _state=this.state,c=_state.maxv,e=_state.data,_iteratorNormalCompletion=!0,_didIteratorError=!1,_iteratorError=void 0;try{for(var _step,_iterator=a[Symbol.iterator]();!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=!0){var _f=_step.value,g=[_f.timestamp.slice(0,10),_f.timestamp.slice(11,13)+":00"],h=(e[g]||0)+1;e[g]=h,h>g&&(c=h)}}catch(err){_didIteratorError=!0,_iteratorError=err}finally{try{!_iteratorNormalCompletion&&_iterator.return&&_iterator.return()}finally{if(_didIteratorError)throw _iteratorError}}console.log("Update heatmap",c,e),this.setState({maxv:c,data:e}),b&&console.log(e)},reload_heatmap:function reload_heatmap(){console.log("Reload heatmap: %o - %o",this.state.start,this.state.end);var a=this;this.setState({data:{},maxv:0}),rpc.call("logs.list",{count:10000}).then(a.update_heatmap)},componentDidMount:function componentDidMount(){var a=this;store.on("project.daterange",function(_ref3){var b=_ref3.start,c=_ref3.end;b.isSame(a.state.start)&&b.isSame(a.state.end)||(a.setState({start:b,end:c}),a.reload_heatmap())}),this.reload_heatmap()},xaxis:function xaxis(){var a=[];var _iteratorNormalCompletion2=!0,_didIteratorError2=!1,_iteratorError2=void 0;try{for(var _step2,_iterator2=moment.range(this.state.start,this.state.end).by("days")[Symbol.iterator]();!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=!0){var b=_step2.value;a.push(b.format("YYYY-MM-DD"))}}catch(err){_didIteratorError2=!0,_iteratorError2=err}finally{try{!_iteratorNormalCompletion2&&_iterator2.return&&_iterator2.return()}finally{if(_didIteratorError2)throw _iteratorError2}}return 0==a.length?[moment(this.state.start).format("YYYY-MM-DD")]:a},yaxis:function yaxis(){var a=void 0,b=[];for(a=8;21>a;a++)b.push(("0"+a).slice(-2)+":00");return b},render:function render(){return React$1.createElement("div",null,React$1.createElement(Heatmap,{xaxis:this.xaxis(),xshow:function xshow(a,b){return 0==b%7?a:""},yaxis:this.yaxis(),yshow:function yshow(a,b){return 0==b%3?a:""},data:this.state.data}))}});

var React=Serverboards.React;function main(a,b){return console.log(a,b),Serverboards.ReactDOM.render(React.createElement(LogMap,null),a),function(){Serverboards.ReactDOM.unmountComponentAtNode(a)}}Serverboards.add_widget("serverboards.logmap/widget",main);

})));