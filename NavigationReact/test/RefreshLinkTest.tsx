import * as assert from 'assert';
import * as mocha from 'mocha';
import { StateNavigator } from '../../Navigation/src/Navigation';
import { RefreshLink } from '../src/NavigationReact';
import * as React from 'react';
import * as ReactTestUtils from 'react-addons-test-utils';

describe('RefreshLinkTest', function () {
    describe('Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Context Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink>
                    link text
                </RefreshLink>,
                { stateNavigator: stateNavigator }
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Invalid Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Attributes Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a'}}
                    includeCurrentData={true}
                    currentDataKeys="y"
                    activeCssClass="active"
                    disableActive={true}
                    lazy={false}
                    historyAction='replace'
                    navigating={() => false}
                    aria-label="z"
                    target="_blank"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a');
            assert.equal(link.props['children'], 'link text');
            assert.notEqual(link.props['onClick'], null);
            assert.equal(link.props['aria-label'], 'z');
            assert.equal(link.props['target'], '_blank');
            assert.equal(Object.keys(link.props).length, 5);
        })
    });

    describe('Navigation Data Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a'}}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Include Current Data Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a'}}
                    includeCurrentData={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?y=b&z=c&x=a');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Include Current Data Override Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{y: 'a'}}
                    includeCurrentData={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?y=a&z=c');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Current Data Key Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a'}}
                    currentDataKeys="y"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?y=b&x=a');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Current Data Keys Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c', w: 'd'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a'}}
                    currentDataKeys="y,z"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?y=b&z=c&x=a');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Current Data Keys Override Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {y: 'b', z: 'c', w: 'd'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{y: 'a'}}
                    currentDataKeys="y,z"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?y=a&z=c');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b', z: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', z: 'c'}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&z=c');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'b'}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=b');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b', z: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', z: 'c'}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'b'}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=b');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Null Active Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', y: null}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Undefined Active Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', y: undefined}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Empty String Inactive Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', y: ''}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Null Disable Active Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', y: null}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Undefined Disable Active Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', y: undefined}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Empty String Disable Inactive Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a', y: ''}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Number Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 1}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=1');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Number Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 2}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Boolean Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: true}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=true');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Boolean Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: false}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=false');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Date Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: new Date(2011, 1, 3)}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2011-02-03');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Date Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: new Date(2010, 1, 3)}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2010-02-03');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Number Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 1}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Number Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: 1, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 2}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Boolean Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: true}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Boolean Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'boolean'} }
            ]);
            stateNavigator.navigate('s', {x: true, y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: false}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=false');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Date Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: new Date(2011, 1, 3)}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Date Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'date'} }
            ]);
            stateNavigator.navigate('s', {x: new Date(2011, 1, 3), y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: new Date(2010, 1, 3)}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2010-02-03');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Type Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: '1', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 1}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=1');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Type Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'number'} }
            ]);
            stateNavigator.navigate('s', {x: '1', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 1}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=1');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', 'b']}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=b');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', 'd']}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=d');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Number Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [1, 2]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=1&x=2');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Number Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [1, 3]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=1&x=3');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Boolean Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [true, false]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=true&x=false');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Boolean Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [true, true]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=true&x=true');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });


    describe('Active Date Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [new Date(2011, 1, 3), new Date(2012, 2, 4)]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2011-02-03&x=2012-03-04');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Date Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [new Date(2011, 1, 3), new Date(2010, 2, 4)]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2011-02-03&x=2010-03-04');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', 'b']}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', 'd']}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=d');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Number Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [1, 2]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Number Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'numberarray'} }
            ]);
            stateNavigator.navigate('s', {x: [1, 2], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [1, 3]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=1&x=3');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Boolean Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [true, false]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Boolean Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'booleanarray'} }
            ]);
            stateNavigator.navigate('s', {x: [true, false], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [true, true]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=true&x=true');
            assert.equal(link.props['children'], 'link text');
        })
    });


    describe('Disable Active Date Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [new Date(2011, 1, 3), new Date(2012, 2, 4)]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Date Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'datearray'} }
            ]);
            stateNavigator.navigate('s', {x: [new Date(2011, 1, 3), new Date(2012, 2, 4)], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: [new Date(2011, 1, 3), new Date(2010, 2, 4)]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=2011-02-03&x=2010-03-04');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Array Length Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', 'b', 'c']}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=b&x=c');
            assert.equal(link.props['className'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Inactive Array Length Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', 'b'], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', 'b', 'c']}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=b&x=c');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Add Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'a'}}
                    activeCssClass="active"
                    className="link"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a');
            assert.equal(link.props['className'], 'link active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Inactive Add Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s', {x: 'a', y: 'b'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: 'c'}}
                    activeCssClass="active"
                    className="link"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=c');
            assert.equal(link.props['className'], 'link');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Empty String Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', '', null, undefined], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', '', '', '']}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=&x=&x=');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Null Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', '', null, undefined], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', null, null, null]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=&x=&x=');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Active Undefined Array Css Class Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', '', null, undefined], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', undefined, undefined, undefined]}}
                    activeCssClass="active"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], '#/r?x=a&x=&x=&x=');
            assert.equal(link.props['className'], 'active');
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Empty String Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', '', null, undefined], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', '', '', '']}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Null Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', '', null, undefined], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', null, null, null]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Disable Active Undefined Array Refresh Link', function () {
        it('should render', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r', defaultTypes: {x: 'stringarray'} }
            ]);
            stateNavigator.navigate('s', {x: ['a', '', null, undefined], y: 'c'});
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigationData={{x: ['a', undefined, undefined, undefined]}}
                    disableActive={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            assert.equal(link.type, 'a');
            assert.equal(link.props['href'], null);
            assert.equal(link.props['children'], 'link text');
        })
    });

    describe('Click Refresh Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s']);
        })
    });

    describe('Ctrl + Click Refresh Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ ctrlKey: true, preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, null);
        })
    });

    describe('Shift + Click Refresh Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ shiftKey: true, preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, null);
        })
    });

    describe('Meta + Click Refresh Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ metaKey: true, preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, null);
        })
    });

    describe('Alt + Click Refresh Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ altKey: true, preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, null);
        })
    });

    describe('Button + Click Refresh Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ button: true, preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, null);
        })
    });

    describe('Navigating Click Refresh Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigating={() => true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s']);
        })
    });

    describe('Not Navigating Click Refresh Link', function () {
        it('should not navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    navigating={() => false}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ preventDefault: () => {} });
            assert.equal(stateNavigator.stateContext.oldState, null);
        })
    });

    describe('Navigating Params Click Refresh Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            var navigatingEvt, navigatingLink;
            renderer.render(
                <RefreshLink
                    navigating={(e, domId, link) => {
                        navigatingEvt = e;
                        navigatingLink = link;
                    }}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            var evt = { preventDefault: () => {} };
            link.props['onClick'](evt);
            assert.strictEqual(navigatingEvt, evt);
            assert.equal(navigatingLink, '/r');
        })
    });

    describe('Lazy Click Refresh Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    includeCurrentData={true}
                    lazy={true}
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            var el = { href: null };
            link['ref'](el);
            stateNavigator.navigate('s', { x: 'a' });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            link.props['onClick']({ preventDefault: () => {} });
            assert.equal(el.href, '#/r?x=a');
            assert.equal(stateNavigator.stateContext.oldState, stateNavigator.states['s']);
            assert.equal(stateNavigator.stateContext.data.x, 'a');
        })
    });

    describe('History Click Refresh Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            var addHistory;
            stateNavigator.historyManager.addHistory = (url, replace) => { addHistory = !replace };
            link.props['onClick']({ preventDefault: () => {} });
            assert.strictEqual(addHistory, true);
        })
    });

    describe('Replace History Click Refresh Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    historyAction="replace"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            var replaceHistory;
            stateNavigator.historyManager.addHistory = (url, replace) => { replaceHistory = replace };
            link.props['onClick']({ preventDefault: () => {} });
            assert.strictEqual(replaceHistory, true);
        })
    });

    describe('None History Click Refresh Link', function () {
        it('should navigate', function(){
            var stateNavigator = new StateNavigator([
                { key: 's', route: 'r' }
            ]);
            stateNavigator.navigate('s');
            var renderer = ReactTestUtils.createRenderer();
            renderer.render(
                <RefreshLink
                    historyAction="none"
                    stateNavigator={stateNavigator}>
                    link text
                </RefreshLink>
            );
            var link = renderer.getRenderOutput();
            link['ref']({ href: link.props['href'] });
            stateNavigator.historyManager.getUrl = (el) => el.href.substring(1);
            var noneHistory = true;
            stateNavigator.historyManager.addHistory = () => { noneHistory = false };
            link.props['onClick']({ preventDefault: () => {} });
            assert.strictEqual(noneHistory, true);
        })
    });
});
