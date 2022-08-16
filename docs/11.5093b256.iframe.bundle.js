(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"./src/services/FullAPI.ts":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__);__webpack_require__("./node_modules/core-js/modules/es.array.map.js"),__webpack_require__("./node_modules/core-js/modules/es.array.includes.js"),__webpack_require__("./node_modules/core-js/modules/es.string.includes.js"),__webpack_require__("./node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("./node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("./node_modules/core-js/modules/es.function.name.js"),__webpack_require__("./node_modules/core-js/modules/es.object.define-property.js");var _utils_createCoords__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./src/utils/createCoords.ts");function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}var FullAPI=function(){function FullAPI(map,_ref){var _ref$defaultLayer=_ref.defaultLayer,defaultLayer=void 0===_ref$defaultLayer?"BASE":_ref$defaultLayer,_ref$sync=_ref.sync,sync=void 0===_ref$sync?{isEnabled:!1}:_ref$sync,controls=_ref.controls,markers=_ref.markers;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,FullAPI),this.map=void 0,this.markersLayers={},this.type="full",this.map=map,this.addLayer(defaultLayer).enable(),sync.isEnabled&&this.addSync(sync.bottom),controls&&this.addControls(controls),markers&&this.addMarkers(markers)}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(FullAPI,[{key:"addLayer",value:function addLayer(layer){return this.map.addDefaultLayer(window.SMap["DEF_"+layer])}},{key:"addSync",value:function addSync(bottomMargin){this.map.addControl(new window.SMap.Control.Sync({bottomSpace:bottomMargin}))}},{key:"addControls",value:function addControls(_ref2){var hasDefault=_ref2.hasDefault,compass=_ref2.compass,mouse=_ref2.mouse,keyboard=_ref2.keyboard;hasDefault&&this.map.addDefaultControls(),compass&&this.map.addControl(new window.SMap.Control.Compass(compass)),mouse&&this.map.addControl(new window.SMap.Control.Mouse((mouse.includes("pan")?window.SMap.MOUSE_PAN:0)+(mouse.includes("wheel")?window.SMap.MOUSE_WHEEL:0)+(mouse.includes("zoom")?window.SMap.MOUSE_ZOOM:0)+(mouse.includes("zoom-in")?window.SMap.MOUSE_ZOOM_IN:0)+(mouse.includes("zoom-out")?window.SMap.MOUSE_ZOOM_OUT:0))),keyboard&&this.map.addControl(new window.SMap.Control.Keyboard((keyboard.includes("pan")?window.SMap.KB_PAN:0)+(keyboard.includes("zoom")?window.SMap.KB_ZOOM:0)))}},{key:"getMarkersLayer",value:function getMarkersLayer(layerName){if(void 0===this.markersLayers[layerName]){var layer=new window.SMap.Layer.Marker;this.map.addLayer(layer),layer.enable(),this.markersLayers[layerName]=layer}return this.markersLayers[layerName]}},{key:"addMarkers",value:function addMarkers(markers){var _this=this,layerName=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",layer=this.getMarkersLayer(layerName);markers.forEach((function(props){return _this.addMarker(props,layerName,layer)}))}},{key:"addMarker",value:function addMarker(_ref3){var center=_ref3.center,name=_ref3.name,options=_ref3.options,layerName=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"default",layer=arguments.length>2?arguments[2]:void 0,markersLayer=layer;void 0===markersLayer&&(markersLayer=this.getMarkersLayer(layerName)),markersLayer.addMarker(new window.SMap.Marker(Object(_utils_createCoords__WEBPACK_IMPORTED_MODULE_7__.a)(center),name,options))}}]),FullAPI}();__webpack_exports__.default=FullAPI}}]);