'use strict';

var React = require('react'),
    ReactDOM = require('react-dom'),
    ModalWindow = require('./ModalWindow.jsx'),
    SidePanel = require('./SidePanel.jsx'),
    CesiumEvent = require('terriajs-cesium/Source/Core/Event'),
    FeatureInfoPanel = require('./FeatureInfoPanel.jsx'),
    Chart = require('./Chart.jsx'),
    MapNavigation = require('./MapNavigation.jsx');


var UiWrapper = function(terria) {
    /**
     * Gets or sets an event that is raised when the nowViewing is updated.
     * @type {CesiumEvent}
     */
    this.nowViewingUpdate = new CesiumEvent();

    /**
     * Gets or sets an event that is raised when the preview is updated.
     * @type {CesiumEvent}
     */
    this.previewUpdate = new CesiumEvent();

    this.openModalWindow = new CesiumEvent();

    this.terriaViewerUpdate = new CesiumEvent();

    this.onFeatureSelect = new CesiumEvent();

    this.terria = terria;

    //temp
    window.nowViewingUpdate = this.nowViewingUpdate;
    window.previewUpdate = this.previewUpdate;
    window.openModalWindow = this.openModalWindow;
    window.terriaViewerUpdate = this.terriaViewerUpdate;
    window.onFeatureSelect = this.onFeatureSelect;
};

UiWrapper.prototype.init = function(main, nav, aside, mapNav, chart, allBaseMaps, terriaViewer) {
    var terria = this.terria;
    ReactDOM.render(<ModalWindow terria={terria} />, main);
    ReactDOM.render(<SidePanel terria={terria} />, nav);
    ReactDOM.render(<Chart terria={terria} />, chart);
    ReactDOM.render(<MapNavigation terria= {terria} allBaseMaps = {allBaseMaps} terriaViewer={terriaViewer} />, mapNav);


    this.onFeatureSelect.addEventListener(function() {
        if (terria.nowViewing.hasItems) {
            ReactDOM.render(<FeatureInfoPanel terria={terria} />, aside);
        }
    });

    this.nowViewingUpdate.addEventListener(function() {
        ReactDOM.render(<SidePanel terria={terria} />, nav);
        ReactDOM.render(<ModalWindow terria={terria}/>, main);
    });

    this.terriaViewerUpdate.addEventListener(function() {
        ReactDOM.render(<MapNavigation terria= {terria} allBaseMaps = {allBaseMaps} terriaViewer={terriaViewer} />, mapNav);
    });

};

module.exports = UiWrapper;