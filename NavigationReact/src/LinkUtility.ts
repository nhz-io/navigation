﻿import Navigation = require('navigation');
import React = require('react');

class LinkUtility {
    static getLink(linkAccessor: () => string): string {
        try {
            return Navigation.settings.historyManager.getHref(linkAccessor());
        } catch (e) {
            return null;
        }
    }

    static getData(toData, includeCurrentData: boolean, currentDataKeys: string): any {
        if (currentDataKeys)
            toData = Navigation.StateContext.includeCurrentData(toData, currentDataKeys.trim().split(/\s*,\s*/));
        if (includeCurrentData)
            toData = Navigation.StateContext.includeCurrentData(toData);
        return toData;
    }

    static isActive(key: string, val: any): boolean {
        if (!Navigation.StateContext.state)
            return false;
        if (val != null && val.toString()) {
            var trackTypes = Navigation.StateContext.state.trackTypes;
            var currentVal = Navigation.StateContext.data[key];
            return currentVal != null && (trackTypes ? val === currentVal : val.toString() == currentVal.toString());
        }
        return true;
    }

    static setActive(props: any, active: boolean, activeCssClass: string, disableActive: boolean) {
        if (activeCssClass)
            props.className += (props.className ? ' ' : '') + activeCssClass;
        if (active && disableActive)
            props.href = null;        
    }
    
    static addListeners(component: React.Component<any, any>, props: any, getLink: () => string, lazy: boolean) {
        props.onClick = (e: MouseEvent) => {
            var element = <HTMLAnchorElement> React.findDOMNode(component);
            if (lazy)
                element.href = getLink();
            if (!e.ctrlKey && !e.shiftKey && !e.metaKey && !e.altKey && !e.button) {
                if (element.href) {
                    e.preventDefault();
                    Navigation.StateController.navigateLink(Navigation.settings.historyManager.getUrl(element));
                }
            }
        };
        if (lazy)
            props.onMouseDown = (e: MouseEvent) => component.forceUpdate();
    }
}
export = LinkUtility;