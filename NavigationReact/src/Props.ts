import { StateNavigator } from 'navigation';
import { HTMLProps } from 'react';

interface LinkProps extends HTMLProps<HTMLAnchorElement> {
    lazy?: boolean;
    historyAction?: 'add' | 'replace' | 'none';
    navigating?: (e: MouseEvent, domId: string, link: string) => boolean;
    stateNavigator?: StateNavigator;
}

interface RefreshLinkProps extends LinkProps {
    navigationData?: any;
    includeCurrentData?: boolean;
    currentDataKeys?: string;
    activeCssClass?: string;
    disableActive?: boolean;
}

interface NavigationLinkProps extends RefreshLinkProps {
    stateKey: string;
}

interface NavigationBackLinkProps extends RefreshLinkProps {
    distance: number;
}
export { LinkProps, RefreshLinkProps, NavigationLinkProps, NavigationBackLinkProps }
