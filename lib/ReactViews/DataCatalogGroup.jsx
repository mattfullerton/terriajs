'use strict';
var React = require('react');
var DataCatalogItem = require('./DataCatalogItem.jsx');
var Loader = require('./Loader.jsx');
var when = require('terriajs-cesium/Source/ThirdParty/when');

var DataCatalogGroup = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func,
    group: React.PropTypes.object,
    items: React.PropTypes.array
  },

  getInitialState: function() {
    // This is to make state update
    return {
      openId: ''
    };
  },

    handleClick: function(e) {
        var that = this;
        if (that.props.group.isOpen === false) {
            that.setState({
                openId: new Date()
            });

            when(that.props.group.load()).then(function() {
                that.setState({
                    openId: new Date()
                });
            });
        } else {
            that.setState({
                openId: new Date()
            });
        }
        //Should not change prop here
        that.props.group.isOpen = !that.props.group.isOpen;
    },

    render: function() {
        var group = this.props.group;
        var members = this.props.group.items;
        var content = null;

        if (this.props.group.isOpen === true) {
            if (members && members.length > 0) {
                content = members.map(function(member, i) {
                    if (member.isGroup){
                        return (<DataCatalogGroup group={member} key={i} />);
                    }else {
                        return (<DataCatalogItem item={member} key={i}/>);
                    }
                });
            } else {
                content = <Loader/>;
            }
        }

        return (
            <li>
              <button className ={'btn btn-catalogue ' + (this.props.group.isOpen ? 'is-open' : '')} onClick={this.handleClick} >{group.name} <i className={'icon ' + (this.props.group.isOpen ? 'icon-chevron-down' : 'icon-chevron-right')}></i></button>
              <ul className="data-catalog-group list-reset">
                {content}
              </ul>
            </li>
        );
    }
});

module.exports = DataCatalogGroup;
